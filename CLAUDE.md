# CLAUDE.md — rr-dev

Personal portfolio site for Ryan Rose, frontend developer. Read this
before writing any code or making any decisions.

---

## Stack Declaration

**This project is frontend-only. It has no backend, and none is
planned.** Skills in `.claude/skills/` that have a backend-specific flow
or file (`4-tdd/SKILL.md`'s backend flow, `4-tdd/be-standards.md`) exist
so this repo stays consistent with sibling projects — they do not apply
here. Don't read them, don't ask backend discovery questions, don't
expect a `backend/` directory to exist.

## Skill Shortcuts
- "write tests for <file>" → read `.claude/skills/4-tdd/fe-standards.md`
  and `.claude/skills/4-tdd/a11y-checklist.md`, then write Jest + RTL +
  jest-axe tests for that component
- "run visual check" / "run playwright" → read
  `.claude/skills/visual-check/SKILL.md`. Never run this without being
  asked — it's a heavier token cost than everything else in this repo's
  workflow
- "run a11y sweep" / "check accessibility violations" → read
  `.claude/skills/a11y-sweep/SKILL.md`. Never run this without being
  asked — same rule as visual check

## Commands
- Start dev server: `npm run dev`
- Run tests: `npm test`
- Run tests (watch): `npm run test:watch`
- Lint: `npm run lint`
- Build: `npm run build`
- Format: `npm run format`
- Full pre-commit gate (build + lint + test): `npm run precommit`
- Real-browser accessibility sweep: `npm run test:a11y`
- Lighthouse accessibility check (dev server must be running): `npm run lighthouse:a11y`

## Critical Rules
- Never commit `.env` or `.env.local`
- SCSS modules only — no Tailwind, no inline styles. This is the settled
  design-system decision for this repo, not a default; see
  `docs/reference/design-direction.md` for why
- Frontend conventions (component structure, SCSS modules, TypeScript
  rules, folder layout) are canonical in
  `.claude/skills/4-tdd/fe-standards.md` — read that before writing any
  component, don't duplicate it here
- Every new component with rendered markup gets a jest-axe test, one
  assertion per meaningfully distinct render state — not just default
  render (see `.claude/skills/4-tdd/pre-commit.md`)
- Any new text/background color pairing gets checked against
  `src/utils/contrast-ratio.ts` before shipping — 4.5:1 normal text, 3:1
  large text/interactive elements. Don't eyeball contrast
- Testability is a design constraint, not just a test-writing habit: keep
  decision logic separate from I/O and side effects (fetch calls,
  animation/timer calls) so the core logic can be unit-tested without
  heavy mocking. This doesn't restrict what can be built — but if an
  implementation choice would make a feature only testable via expensive
  or brittle means (or not testable at all), flag that to the developer
  before building it that way, don't silently skip the test. See
  `fe-standards.md`'s Framer Motion section for a concrete pattern
- Run tests before every commit
- Never run Playwright visual verification automatically — always ask
  first, or wait to be explicitly told to run it
- No accessibility compliance score or badge (e.g. "100% Lighthouse") on
  the live site — it's a snapshot claim that can go stale or overstate
  what automated tools actually catch. Showcase the testing practice
  instead; see "Current Priority" for why
- All AI-assisted feature work goes through the pipeline: `/1-grill-me` →
  `/2-to-prd` → `/3-to-issues` → `/4-tdd`. Every issue gets its own GitHub
  issue and its own branch (`<issue-number>-<slug>`) before any code is
  written — never implement directly on `main`. `/4-tdd` never commits or
  opens the PR automatically on its own initiative; the developer triggers
  both explicitly. Once triggered, committing (including multiple commits
  to structure a solution into a logical sequence) and opening the PR do
  not need per-step permission — the review gate is the PR itself, which
  the developer reviews as a whole before merging, not each individual
  commit inside it. Never merge without the developer's explicit go-ahead
  after they've reviewed the PR
- Multi-issue initiative with a temporary integration branch (e.g. a
  full-site revamp spanning several issues, like `redesign/mockup-i1`):
  every issue's branch forks off that integration branch and its PR
  targets that branch, not `main`. `main` stays untouched — and its
  deploy stays safe — until the whole initiative is reviewed together and
  merged to `main` in one final PR. Check CLAUDE.md's "Current Priority"
  for whether one is currently active before branching
- Batch issue check-in (distinct from `/4-tdd` above): when checking in a
  set of already-decided changes as multiple issues at once (housekeeping,
  chores, tooling additions the developer has already scoped, not a
  feature being built fresh), create every GitHub issue up front, then for
  each one create its branch, commit, push, and open the PR without asking
  permission per git step. Never merge without the developer's explicit
  go-ahead after they've verified the branch/PR themselves — that
  verification step is the gate, not each individual commit
- No em dashes in copy, prose, or commit messages — use periods or commas

## Collaboration Style
- No conversational filler — no "Certainly!", no restating the request
- Plain, direct language, no corporate or academic jargon
- Don't explain obvious logic — only flag genuinely non-obvious decisions
- Prefer code + a one-line rationale over prose explanations
- Long or multi-section output goes in an Artifact so it's editable
  section by section

---

## What This Project Is

A personal portfolio site. Pitch: a frontend developer's site that reads
as engineered, not templated — the site itself is evidence of how the
developer builds things.

## Current Priority

The mockup-i1 site revamp (decor system, Nav + Hero, About consolidation,
Projects section, Testimonials + Footer, Contact section, misc cleanup)
is complete and merged to `main`. Resume link is deferred as a follow-up,
not yet filed as an issue.

This session set up the Claude Code workflow (skills, accessibility
tooling, contrast testing) ported from a more mature sibling project. What
that unlocked and what's still open:

- Design system decision made and enforced: SCSS modules only, Tailwind
  removed (was imported but unused).
- jest-axe wired into the test suite; every existing component now has at
  least a default-render accessibility test, more where multiple render
  states exist (e.g. modal open/closed).
- eslint-plugin-jsx-a11y catches accessibility issues at lint time, not
  just at test time.
- Automated contrast-ratio test (`src/utils/contrast-ratio.test.ts`,
  `src/utils/design-tokens.contrast.test.ts`) exists and is green — it
  caught and this session fixed one real WCAG AA failure
  ($text-muted was 3.49:1 against navy, now 5.77:1).
- Real-browser accessibility sweep added (`npm run test:a11y`, Playwright +
  axe-core, plus a supplementary `npm run lighthouse:a11y`) — closes the
  jsdom contrast blind spot jest-axe has and checks the whole composed
  page, not just isolated components. It already found and fixed a real
  bug: the mobile nav menu's content wasn't in a landmark region when open.
- Decided against showing an accessibility score/badge on the site itself
  (see the Critical Rules entry above for why) — the README's
  Accessibility section documents the testing practice instead, and the
  planned projects/case-study section is the next place to make that
  visible to visitors.
- The hero/above-the-fold rebuild and the projects/case-study showcase
  section flagged here previously are now done as part of the mockup-i1
  revamp above, not still-open items.
- Known follow-up, not yet filed as an issue: `ContactModal.tsx` calls
  `fetch` directly instead of going through `src/utils/`. Fine as-is since
  it's a single consumer (see `fe-standards.md`'s external-service rule),
  but worth a look if a second integration is ever added.

---

## Docs

- Architecture (how the pieces fit together) → `README.md`'s Architecture
  section — kept there, not in `docs/reference/`, since it's
  evaluator-facing content for a solo portfolio project (see
  `claude-md-organizer/SKILL.md`'s Scope note for why)
- Design direction (palette, typography, spacing, component feel) →
  `docs/reference/design-direction.md`
- Tech stack → `docs/reference/tech-stack.md`
- Frontend conventions, SCSS architecture, folder structure →
  `.claude/skills/4-tdd/fe-standards.md`
- Backend standards → `.claude/skills/4-tdd/be-standards.md` (inert, see
  Stack Declaration above — this repo has no backend)
- Accessibility checklist → `.claude/skills/4-tdd/a11y-checklist.md`
- Cross-project handoffs → `docs/handoff/` — check for pending handoff
  docs from sibling projects (e.g. researchpulse) before starting new work
