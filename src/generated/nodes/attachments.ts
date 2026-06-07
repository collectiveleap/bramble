import { createHash, randomUUID } from 'node:crypto';

// ── Domain Types ──────────────────────────────────────────────────────────────

export type NodeId = string;
export type AttachmentId = string;

/**
 * Immutable file identity sealed at drop time.
 * No mutation path in this module touches this record after creation —
 * that is the system invariant: editing a file node's content never
 * changes which file the node represents.
 */
export interface AttachmentMeta {
  readonly id: AttachmentId;
  readonly nodeId: NodeId;
  readonly filename: string;
  readonly mimeType: string;
  /** SHA-256 hex digest of the original file bytes. Stable identity anchor. */
  readonly originalHash: string;
  readonly byteSize: number;
  readonly droppedAt: number; // epoch ms
}

/** Mutable content layer — editable without touching AttachmentMeta. */
export interface AttachmentContent {
  readonly attachmentId: AttachmentId;
  readonly text: string;
  readonly updatedAt: number; // epoch ms
}

/** Combined view: immutable identity + current mutable content. */
export interface Attachment {
  readonly meta: Readonly<AttachmentMeta>;
  readonly content: Readonly<AttachmentContent>;
}

/**
 * Payload delivered by a file-drop event.
 * Source: f-pdf-upload.drop-seeds-content-with-filename
 *
 * Carries both file identity (filename, bytes) and extracted text content
 * so they are seeded together atomically in a single operation.
 */
export interface DropSeed {
  readonly filename: string;
  readonly mimeType: string;
  /** Raw file bytes — used to derive the stable identity hash. */
  readonly bytes: Uint8Array;
  /** Text content extracted from the file, seeded alongside the filename. */
  readonly text: string;
}

export interface DropSeedResult {
  readonly attachmentId: AttachmentId;
  readonly filename: string;
  readonly originalHash: string;
  readonly contentLength: number;
}

/**
 * Patch applied to mutable content only.
 * Deliberately carries no filename or identity fields — this shape makes
 * it structurally impossible for a content edit to touch the identity layer.
 */
export interface ContentPatch {
  readonly text: string;
}

/**
 * Result of evaluating a node as a drop target before bytes are transferred.
 * Source: f-pdf-upload.drop-seeds-content-with-filename (evals drop targeting)
 */
export interface DropTargetEvaluation {
  readonly canAccept: boolean;
  readonly rejectionReason?: string;
}

// ── Error Types ───────────────────────────────────────────────────────────────

export type AttachmentError =
  | { readonly kind: 'not-found'; readonly attachmentId: AttachmentId }
  | { readonly kind: 'invalid-filename'; readonly filename: string; readonly reason: string }
  | { readonly kind: 'empty-bytes'; readonly filename: string };

export function isAttachmentError(
  value: DropSeedResult | Readonly<AttachmentContent> | AttachmentError,
): value is AttachmentError {
  return 'kind' in value;
}

// ── Internal Helpers ──────────────────────────────────────────────────────────

function sha256Hex(data: Uint8Array): string {
  return createHash('sha256').update(data).digest('hex');
}

function validateFilename(
  filename: string,
): { readonly kind: 'invalid-filename'; readonly filename: string; readonly reason: string } | null {
  if (filename.trim().length === 0) {
    return { kind: 'invalid-filename', filename, reason: 'filename must not be empty' };
  }
  if (filename.length > 255) {
    return { kind: 'invalid-filename', filename, reason: 'filename exceeds 255-character limit' };
  }
  if (/[/\\]/.test(filename)) {
    return {
      kind: 'invalid-filename',
      filename,
      reason: 'filename must not contain path separators',
    };
  }
  if (/[\x00-\x1f\x7f]/.test(filename)) {
    return {
      kind: 'invalid-filename',
      filename,
      reason: 'filename must not contain control characters',
    };
  }
  return null;
}

// ── Drop Target Evaluation ────────────────────────────────────────────────────

/**
 * Evaluates whether a node can accept a file drop before bytes are read.
 * Called during the drag phase using only surface-level attributes from
 * the drag event (filename, mimeType, byteSize).
 *
 * Source: f-pdf-upload.drop-seeds-content-with-filename (evals drop targeting)
 * Note: file icon and drop-target highlight are UI concerns defined in interaction.md.
 */
export function evaluateDropTarget(
  _nodeId: NodeId,
  candidate: { filename: string; mimeType: string; byteSize: number },
): DropTargetEvaluation {
  const filenameError = validateFilename(candidate.filename);
  if (filenameError !== null) {
    return { canAccept: false, rejectionReason: filenameError.reason };
  }
  if (candidate.byteSize === 0) {
    return { canAccept: false, rejectionReason: 'file is empty' };
  }
  return { canAccept: true };
}

// ── Attachment Store ──────────────────────────────────────────────────────────

export class AttachmentStore {
  private readonly metas = new Map<AttachmentId, Readonly<AttachmentMeta>>();
  private readonly contents = new Map<AttachmentId, Readonly<AttachmentContent>>();
  private readonly nodeIndex = new Map<NodeId, Set<AttachmentId>>();

  /**
   * Seeds both filename (identity) and extracted content from a file drop,
   * atomically creating the attachment record.
   *
   * Source: f-pdf-upload.drop-seeds-content-with-filename
   *
   * The filename and originalHash recorded here are NEVER overwritten by any
   * subsequent content edit. System invariant is enforced by structural
   * separation: meta and content occupy distinct maps with distinct write paths.
   */
  dropSeedsContentWithFilename(
    nodeId: NodeId,
    seed: DropSeed,
  ): DropSeedResult | AttachmentError {
    const filenameErr = validateFilename(seed.filename);
    if (filenameErr !== null) return filenameErr;

    if (seed.bytes.length === 0) {
      return { kind: 'empty-bytes', filename: seed.filename };
    }

    const id: AttachmentId = randomUUID();
    const originalHash = sha256Hex(seed.bytes);
    const now = Date.now();

    const meta: Readonly<AttachmentMeta> = Object.freeze({
      id,
      nodeId,
      filename: seed.filename,
      mimeType: seed.mimeType,
      originalHash,
      byteSize: seed.bytes.length,
      droppedAt: now,
    });

    const content: Readonly<AttachmentContent> = Object.freeze({
      attachmentId: id,
      text: seed.text,
      updatedAt: now,
    });

    this.metas.set(id, meta);
    this.contents.set(id, content);

    let ids = this.nodeIndex.get(nodeId);
    if (ids === undefined) {
      ids = new Set<AttachmentId>();
      this.nodeIndex.set(nodeId, ids);
    }
    ids.add(id);

    return {
      attachmentId: id,
      filename: seed.filename,
      originalHash,
      contentLength: seed.text.length,
    };
  }

  /**
   * Replaces the editable text content of an attachment.
   *
   * System invariant: only the content map is written.
   * The meta record (filename, originalHash, nodeId, droppedAt) is never
   * accessed or modified inside this method — the node continues to
   * represent the same file after any number of content edits.
   */
  updateContent(
    attachmentId: AttachmentId,
    patch: ContentPatch,
  ): Readonly<AttachmentContent> | AttachmentError {
    if (!this.metas.has(attachmentId)) {
      return { kind: 'not-found', attachmentId };
    }

    const updated: Readonly<AttachmentContent> = Object.freeze({
      attachmentId,
      text: patch.text,
      updatedAt: Date.now(),
    });

    // meta is intentionally not touched — system invariant preserved
    this.contents.set(attachmentId, updated);
    return updated;
  }

  /** Returns a full attachment by id, or undefined if not found. */
  get(attachmentId: AttachmentId): Attachment | undefined {
    const meta = this.metas.get(attachmentId);
    const content = this.contents.get(attachmentId);
    if (meta === undefined || content === undefined) return undefined;
    return { meta, content };
  }

  /** Returns all attachments currently associated with a node. */
  listForNode(nodeId: NodeId): readonly Attachment[] {
    const ids = this.nodeIndex.get(nodeId);
    if (ids === undefined) return [];
    const result: Attachment[] = [];
    for (const id of ids) {
      const att = this.get(id);
      if (att !== undefined) result.push(att);
    }
    return result;
  }

  /**
   * Returns only the identity record for an attachment.
   * Useful for "same file?" identity checks without loading content.
   */
  getIdentity(attachmentId: AttachmentId): Readonly<AttachmentMeta> | undefined {
    return this.metas.get(attachmentId);
  }

  /** Removes an attachment and releases its node-index slot. Returns false if not found. */
  remove(attachmentId: AttachmentId): boolean {
    const meta = this.metas.get(attachmentId);
    if (meta === undefined) return false;

    this.metas.delete(attachmentId);
    this.contents.delete(attachmentId);

    const ids = this.nodeIndex.get(meta.nodeId);
    if (ids !== undefined) {
      ids.delete(attachmentId);
      if (ids.size === 0) this.nodeIndex.delete(meta.nodeId);
    }

    return true;
  }
}

/** @internal Phoenix VCS traceability — do not remove. */
export const _phoenix = {
  iu_id: '62a47f6acaecf56b054a084e91d8f9fa1418adcc22ac06a83fec2b74c6857702',
  name: 'Attachments',
  risk_tier: 'high',
  canon_ids: [2 as const],
} as const;