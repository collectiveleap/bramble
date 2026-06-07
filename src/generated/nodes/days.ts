/**
 * Days — Phoenix VCS / Bramble
 *
 * A Day is a node that stands for a single calendar day (a day-noun).
 * Its bound attribute is the calendar date it represents; the date is
 * the identity of the day, not content typed into it.
 *
 * Human-readable label rules (f-day-title.1–3):
 *   date === today      → "Today"
 *   date === yesterday  → "Yesterday"
 *   otherwise           → short-date format, e.g. "Jun 6"
 */

// ── Types ─────────────────────────────────────────────────────────────────────

/** ISO-8601 calendar date: YYYY-MM-DD */
export type CalendarDate = string;

/** A node that stands for a single calendar day. */
export interface DayNode {
  readonly id: string;
  readonly kind: 'day';
  /** The calendar date this node stands for — its bound attribute. */
  readonly date: CalendarDate;
}

/** Discriminated union returned by parsing operations. */
export type ParseResult<T> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly error: string };

// ── CalendarDate helpers ───────────────────────────────────────────────────────

const DATE_RE = /^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])$/;

/**
 * Returns true if `s` is a syntactically and calendrically valid YYYY-MM-DD date.
 * Rejects rolled-over dates such as "2024-02-30".
 */
export function isCalendarDate(s: string): s is CalendarDate {
  if (!DATE_RE.test(s)) return false;
  const d = new Date(s + 'T00:00:00Z');
  return !isNaN(d.getTime()) && d.toISOString().startsWith(s);
}

/** Parse a raw string into a CalendarDate, returning an error description on failure. */
export function parseCalendarDate(s: string): ParseResult<CalendarDate> {
  const trimmed = s.trim();
  if (!isCalendarDate(trimmed)) {
    return { ok: false, error: `"${s}" is not a valid YYYY-MM-DD date` };
  }
  return { ok: true, value: trimmed };
}

/** Return today's date as a CalendarDate using the local clock. */
export function todayDate(): CalendarDate {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Return a CalendarDate offset by `days` from `from`.
 * Positive values move forward in time; negative values move backward.
 */
export function offsetDate(from: CalendarDate, days: number): CalendarDate {
  const d = new Date(from + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() + days);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/**
 * Compare two CalendarDates lexicographically.
 * Returns a negative number, zero, or positive number (suitable for Array.sort).
 */
export function compareCalendarDates(a: CalendarDate, b: CalendarDate): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

// ── Label formatting ───────────────────────────────────────────────────────────

const MONTH_ABBR: readonly string[] = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

/**
 * Format a CalendarDate as a short human-readable date.
 * Example outputs: "Jun 6", "Dec 25", "Jan 1".
 */
export function formatShortDate(date: CalendarDate): string {
  const d = new Date(date + 'T00:00:00Z');
  const month = MONTH_ABBR[d.getUTCMonth()];
  const day = d.getUTCDate();
  return `${month} ${day}`;
}

/**
 * Return the human-readable label for a day (f-day-title.1–3).
 *
 * - "Today"     — date equals referenceDate
 * - "Yesterday" — date is one day before referenceDate
 * - Short-date  — e.g. "Jun 6" for all other dates
 *
 * @param date          The CalendarDate of the day node.
 * @param referenceDate The date treated as "today". Defaults to {@link todayDate}.
 */
export function dayLabel(date: CalendarDate, referenceDate?: CalendarDate): string {
  const today = referenceDate ?? todayDate();
  if (date === today) return 'Today';
  if (date === offsetDate(today, -1)) return 'Yesterday';
  return formatShortDate(date);
}

// ── DayNode operations ─────────────────────────────────────────────────────────

/**
 * Create a frozen DayNode for the given calendar date.
 * Throws a RangeError if `date` is not a valid YYYY-MM-DD date.
 */
export function createDayNode(id: string, date: CalendarDate): DayNode {
  if (!isCalendarDate(date)) {
    throw new RangeError(
      `createDayNode: "${date}" is not a valid YYYY-MM-DD calendar date`,
    );
  }
  return Object.freeze<DayNode>({ id, kind: 'day', date });
}

/** Type guard: returns true if `node` is a DayNode. */
export function isDayNode(node: { readonly kind: string }): node is DayNode {
  return node.kind === 'day';
}

/**
 * Find the DayNode whose `date` matches the given CalendarDate.
 * Returns `undefined` if no match exists.
 */
export function findDayByDate(
  days: ReadonlyArray<DayNode>,
  date: CalendarDate,
): DayNode | undefined {
  return days.find((d) => d.date === date);
}

/**
 * Return a new array of DayNodes sorted by date.
 * @param order 'asc' places oldest first; 'desc' places newest first. Default: 'asc'.
 */
export function sortDayNodes(
  days: ReadonlyArray<DayNode>,
  order: 'asc' | 'desc' = 'asc',
): DayNode[] {
  const sorted = [...days].sort((a, b) => compareCalendarDates(a.date, b.date));
  return order === 'desc' ? sorted.reverse() : sorted;
}

// ── DayRegistry ────────────────────────────────────────────────────────────────

/**
 * In-memory registry of DayNodes for a single Bramble space.
 *
 * Enforces the invariant that each CalendarDate is bound to at most one node.
 * Lifecycle (creation, disposal) is managed by the caller.
 */
export class DayRegistry {
  private readonly byDate = new Map<CalendarDate, DayNode>();
  private readonly byId = new Map<string, DayNode>();

  /**
   * Register a DayNode.
   * Throws if a *different* node id is already registered for the same date.
   * Re-registering the same node (same id) is a no-op.
   */
  add(node: DayNode): void {
    const existing = this.byDate.get(node.date);
    if (existing !== undefined && existing.id !== node.id) {
      throw new Error(
        `DayRegistry: date ${node.date} is already bound to node "${existing.id}"`,
      );
    }
    this.byDate.set(node.date, node);
    this.byId.set(node.id, node);
  }

  /** Remove a DayNode by id. No-op if the id is not registered. */
  remove(id: string): void {
    const node = this.byId.get(id);
    if (node === undefined) return;
    this.byId.delete(id);
    this.byDate.delete(node.date);
  }

  /** Look up a DayNode by CalendarDate. Returns `undefined` if not found. */
  getByDate(date: CalendarDate): DayNode | undefined {
    return this.byDate.get(date);
  }

  /** Look up a DayNode by node id. Returns `undefined` if not found. */
  getById(id: string): DayNode | undefined {
    return this.byId.get(id);
  }

  /**
   * Return all registered DayNodes sorted by date.
   * @param order 'asc' (oldest first) | 'desc' (newest first). Default: 'asc'.
   */
  all(order: 'asc' | 'desc' = 'asc'): DayNode[] {
    return sortDayNodes([...this.byDate.values()], order);
  }

  /** Number of registered days. */
  get size(): number {
    return this.byDate.size;
  }

  /** Remove all registered days. */
  clear(): void {
    this.byDate.clear();
    this.byId.clear();
  }
}

// ── Phoenix metadata ───────────────────────────────────────────────────────────

/** @internal Phoenix VCS traceability — do not remove. */
export const _phoenix = {
  iu_id: '476f79e0a78660e7d81fe12a9a44fbf9ff7589acae3b5d05f46948d8be704121',
  name: 'Days',
  risk_tier: 'low',
  canon_ids: [3 as const],
} as const;