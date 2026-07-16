#!/usr/bin/env bash
# Flow gate — structural PreToolUse check on `git commit` in the Bramble repo.
# Enforces FLOW.md delivery-gate clauses 6-7 at commit time (compaction-proof: it
# fires regardless of what the agent remembers). Structural only — it checks that a
# field/section EXISTS, not that a citation is valid; the semantic check is the SDD
# Pre-Flight review + CLAUDE.md recall. FAIL-OPEN: any doubt or error => allow (exit 0);
# only a confidently-detected violation in THIS repo hard-blocks (exit 2).
set -uo pipefail

input="$(cat)"
cmd="$(printf '%s' "$input" | python3 -c 'import sys,json; print(json.load(sys.stdin).get("tool_input",{}).get("command",""))' 2>/dev/null)"

# Only git commits matter.
case "$cmd" in *"git commit"*) ;; *) exit 0 ;; esac
# A command that *begins* with `cd ` targets another worktree (e.g. `cd /dxos/... && git commit`)
# that we cannot reliably inspect from here — skip it. (Bramble doc commits run without a leading cd.)
# Anchored to a leading `cd ` so a commit MESSAGE containing "cd " does not bypass the gate.
case "$cmd" in "cd "*) exit 0 ;; esac

root="${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel 2>/dev/null)}"
{ [ -n "$root" ] && cd "$root" 2>/dev/null; } || exit 0

staged="$(git diff --cached --name-only 2>/dev/null)" || exit 0
[ -z "$staged" ] && exit 0

v=""

# Clause 6 (Fix A) — a NEWLY-ADDED build-phase plan must carry a `## Traces` section.
added_plans="$(git diff --cached --diff-filter=A --name-only 2>/dev/null | grep -E '^implementations/.*/plans/.*\.md$' || true)"
while IFS= read -r f; do
  [ -z "$f" ] && continue
  if ! git show ":$f" 2>/dev/null | grep -qF '## Traces'; then
    v="${v}
  - new plan '${f}' has no '## Traces' section (FLOW gate clause 6 — each behavioural decision must cite a UP/IP/IX req)"
  fi
done <<< "$added_plans"

# Clause 7 (Fix B) — a ledger diff that ADDS a `contradicts:` must also ADD a `grounded-by:`.
for led in implementations/dxos/issues-ledger.md implementations/dxos/references-issue-ledger.md; do
  if printf '%s\n' "$staged" | grep -qxF "$led"; then
    added="$(git diff --cached -- "$led" 2>/dev/null | grep '^+' | grep -v '^+++' || true)"
    if printf '%s' "$added" | grep -qiE 'contradicts:' && ! printf '%s' "$added" | grep -qiE 'grounded-by:'; then
      v="${v}
  - ledger '${led}' adds a 'contradicts:' field with no 'grounded-by:' (FLOW gate clause 7 — a reversal needs a spec req or runnable test)"
    fi
  fi
done

if [ -n "$v" ]; then
  printf 'Flow gate blocked this commit:%s\n\nFix the plan/ticket to satisfy FLOW.md delivery-gate clauses 6-7, then re-commit.\n' "$v" >&2
  exit 2
fi
exit 0
