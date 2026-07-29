---
name: tdd
description: Implement a single issue using TDD. Component-first with red-green verification. Run on one issue at a time.
---

# Skill: tdd

Implement one vertical slice issue at a time. Never move to the next
issue until the current one has passing tests and, if visual verification
was run, developer sign-off.

## Before Starting
0. Enter plan mode before writing any code. Read the issue file from
   `docs/issues/<feature-name>/` and cross-reference it against the
   *actual current code* it touches — not just the issue's prose — and
   against the mockup/design reference if the issue points to one. Run
   `shared/confidence-gate.md`: ask questions until 95% confident on what
   "done" looks like for this specific issue. Only exit plan mode once
   aligned with the developer. This exists because skipping it once
   (Issue 10) meant several real problems — a layout bug, a wrong button
   treatment, an inconsistent CTA style — only surfaced after the build,
   in the developer's own review, instead of before a line of code was
   written
1. Confirm the current branch is specific to this issue (e.g.
   `<issue-number>-<slug>`) — if on `main`, or on a branch for a
   different issue, create/switch to the correct branch before writing
   any code. Never implement an issue directly on `main`. Create the
   branch with `gh issue develop <issue-number> --name <issue-number>-<slug>
   --base <base-branch> --checkout` (not plain `git checkout -b`) so
   GitHub actually links the branch to the issue in its Development
   panel — a name matching the issue number is not the same as a linked
   branch, and an unlinked branch means the issue won't auto-close on
   merge unless the PR merges to the repo's default branch (`main`),
   which won't be true for issues on an integration branch like
   `redesign/mockup-i1`. Confirmed missing on Issue 10: the branch was
   never linked, so the PR's `Closes #10` never fired and the issue had
   to be closed manually after merge
2. Read `fe-standards.md` in this directory before writing any component
3. If committing — run through `pre-commit.md` in this directory

## Rules
- ONE issue per session
- **Never run `git commit` (or stage/commit anything) in this skill, period.**
  Passing tests and a completed pre-commit checklist mean the change is
  *ready* to commit, not that it should be committed. Only commit if the
  developer explicitly says so in this session — always end the completion
  report with a "ready for commit" status instead of committing
- Never commit without running pre-commit.md checklist (once the developer
  does ask for a commit)
- Act as UI/UX engineer — produce modern, accessible, polished UI
  - When no visual direction is specified beyond
    `docs/reference/design-direction.md`, default to a modern, accessible
    execution of the existing tokens — don't ask permission to apply the
    established design system
  - If a genuinely distinctive idea occurs to you (an interaction, layout,
    or animation flourish not implied by fe-standards.md or the design
    tokens), pause and describe it to the developer as a proposal before
    building it — don't silently build it, and don't silently skip it either
- Developer is product manager — flag design decisions for approval
- The full completion report in "When Issue is Complete" below is posted
  **once per issue** — when the developer is satisfied and the issue is
  actually done. A bug found mid-stream (during the developer's own visual
  check, a follow-up fix, a scope change) does not get its own report —
  keep working, then fold everything (original criteria, what got added,
  what got fixed) into the one final report. Outside of that final report,
  just say what you did in a sentence or two and move on

---

## Frontend Flow — Component First

```
1. READ    — read fe-standards.md before writing any component
2. BUILD   — create component following fe-standards.md
3. A11Y    — run through a11y-checklist.md before writing tests
4. TEST    — write test against the real component
5. FORCE RED — break something to confirm test can fail
6. RESTORE — fix back to correct
7. VERIFY GREEN — confirm test passes
8. VISUAL VERIFY (ask first) — see below, this step is opt-in
9. PRE-COMMIT — run pre-commit.md checklist
10. CONFIDENCE GATE — shared/confidence-gate.md: confident the implementation
    matches the issue's acceptance criteria?
11. REPORT — output the completion report below and stop. Do not run
    `git commit` — that only happens if the developer explicitly asks.
```

### Frontend Commands
```bash
npm run dev
npm test
npm test -- src/components/<component>.test.tsx
```

### Frontend Test Pattern
```tsx
it('<behavior>', async () => {
    // Arrange
    render(<Component />)

    // Act
    await userEvent.click(screen.getByRole('button', { name: /search/i }))

    // Assert
    expect(await screen.findByText(/results/i)).toBeInTheDocument()
})
```

---

## Visual Verification — Opt In, Ask First

Playwright MCP screenshot verification is token-heavy. Unlike the rest of
this flow, **do not run it automatically.** At step 8, ask the developer:

> Want me to run visual verification via Playwright now? It's a heavier
> token cost than the rest of this step.

- If yes — read and follow `.claude/skills/visual-check/SKILL.md`, then
  continue to step 9.
- If no, or no response — skip it, note in the completion report that
  visual verification was not run this session, and fall back to the
  manual keyboard/behavior checklist below instead:

```
MANUAL CHECK SUGGESTED (visual verification skipped)

URL: http://localhost:5173/<path>

Expected behavior:
- [ ] <what user sees>
- [ ] <what happens on interaction>
- [ ] <edge case behavior>

Keyboard test:
- Tab through the change — all interactive elements reachable
- Enter/Space activates buttons
```

The developer can also invoke `/visual-check` standalone at any time,
outside of this flow.

---

## Suggested Commit Message Format

This is a suggestion to include in the completion report, not something to
execute — commits happen only when the developer explicitly asks.
```
feat: <what was implemented>

- A11y: <accessibility features added>
- Tests: <what tests verify>
```

## When Issue is Complete

Post this once, when the issue is actually done — not after every
intermediate fix along the way. If the developer finds a bug or asks for a
change mid-stream, just fix it and briefly say what changed; save the full
report for the end.

Before reporting, reconcile scope: if any acceptance criteria were added,
changed, or dropped mid-build (developer feedback, a bug found during
testing, a design decision that expanded scope, etc.), update the issue's
markdown file (`docs/issues/<feature>/<n>-<slug>.md`) *and* the
corresponding GitHub issue (`gh issue edit`) so the source of truth matches
what was actually built — never let the report describe scope the issue
file doesn't reflect.

Then output:
```
ISSUE COMPLETE

Issue: <title>
Built: ✅
A11y checked: ✅
Tests: <n> added, all passing ✅
Red-green verified: ✅
Visual verification: <confirmed / skipped by developer choice>

Acceptance criteria — original (from the issue as first read):
- [x] <criterion that was met>
- [ ] <criterion NOT met — say why, don't drop it silently>

Acceptance criteria — added during this build:
- <criterion that emerged mid-build, wasn't in the original issue>
  — why: <one-line reason — developer feedback, bug found, scope
  discovered during implementation, etc.>
(state "None — stayed within original scope" if nothing changed)

QA / Product verification checklist:
- [ ] <concrete, testable thing a non-engineer can check in the browser —
  one line per meaningfully distinct behavior or state this issue changed>

Suggested commit message:
<message>

Status: ready for commit — I have not committed anything.
Let me know when to commit, or commit it yourself.
Next issue: <title or NONE>
```
