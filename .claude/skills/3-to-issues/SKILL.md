---
name: to-issues
description: Break a PRD into vertical slice implementation tasks and create GitHub Issues. Run after /to-prd is complete.
---

# Skill: to-issues

Break the PRD into small, vertical slice implementation tasks. Each task
must deliver something visible and testable at the end — not a layer with
nothing to look at. Then create GitHub Issues automatically.

## Rules
- Only run after /to-prd is complete
- Read the PRD from `docs/prd/<feature-name>.md` before generating issues
- Each issue must be a vertical slice — never horizontal
- Each issue must be independently completable
- Each issue must have a clear definition of done
- Issues should be small enough to complete in one Claude Code session
- Save issues to `docs/issues/<feature-name>/`
- After saving all markdown files, create GitHub Issues using the gh CLI

## What is a Vertical Slice

```
❌ Horizontal (wrong):
  Issue 1: Build all the SCSS/tokens
  Issue 2: Build all the components with no styling
  Issue 3: Wire up all the tests

✅ Vertical (correct):
  Issue 1: Visitor sees a working hero section with a working CTA
  Issue 2: Visitor sees a projects section with real case-study content
  Issue 3: Visitor can submit the contact form and see confirmation
```

## Issue Structure

Save each issue as `docs/issues/<feature-name>/<number>-<slug>.md`:

```markdown
# Issue <number>: <Title>

## What
One sentence description of what this issue delivers.

## Why
Why does this matter to the user?

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Layers Touched
- [ ] Components — <what's new/changed>
- [ ] Styles/tokens — <what design-system changes>
- [ ] Tests/a11y — <what jest-axe / RTL coverage is added>

## Edge Cases
- Edge case → expected behavior

## Blocked By
List any issues that must be completed first. None if independent.

## Definition of Done
- [ ] Tests written and passing
- [ ] Red-green verified
- [ ] jest-axe passing on every new render state
- [ ] Manually tested in browser
```

## GitHub Issues — Auto Creation

After saving all markdown files, create GitHub Issues using the gh CLI.

For each issue run:

```bash
gh issue create \
  --title "<issue title>" \
  --body "$(cat docs/issues/<feature-name>/<number>-<slug>.md)" \
  --label "vertical-slice"
```

If the `vertical-slice` label doesn't exist yet, create it first:

```bash
gh label create "vertical-slice" --color "#0075ca" --description "Vertical slice feature ticket"
```

## Blocking Relationships

After generating all issues output a dependency graph:

```
Issue 1 → blocks nothing
Issue 2 → blocked by Issue 1
Issue 3 → blocked by Issue 1
Issue 4 → blocked by Issue 2, Issue 3
```

## Confidence Gate
Before producing the ISSUES COMPLETE summary, run
`.claude/skills/shared/confidence-gate.md`. The question it's gating: is
there enough here that each issue is a true vertical slice and
independently completable?

## When Done

Output exactly this:

```
ISSUES COMPLETE

Generated <n> issues saved to docs/issues/<feature-name>/
GitHub Issues created: <links to each issue>

Dependency order:
1. <Issue 1 title>
2. <Issue 2 title>
...

Ready to run /tdd on Issue 1
```
