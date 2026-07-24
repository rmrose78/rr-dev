# CLAUDE.md — rr-dev

Personal portfolio site for Ryan Rose, frontend developer. Read this
before writing any code or making any decisions.

---

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
- Run tests before every commit
- Never run Playwright visual verification automatically — always ask
  first, or wait to be explicitly told to run it
- All AI-assisted feature work goes through the pipeline: `/1-grill-me` →
  `/2-to-prd` → `/3-to-issues` → `/4-tdd`. Every issue gets its own GitHub
  issue and its own branch (`<issue-number>-<slug>`) before any code is
  written — never implement directly on `main`. The skill never commits or
  opens the PR automatically; both stay explicit, developer-initiated steps
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
- Not yet done, and the next real work: the hero/above-the-fold section
  has not been rebuilt, and there is no projects/architecture showcase
  section yet. Run `/1-grill-me` to work through both — above-the-fold
  content should sell the developer immediately, not just introduce the
  site, and a projects section with real case-study depth is the strongest
  evidence against "this looks AI-generated."
- Known follow-up, not yet filed as an issue: `ContactModal.tsx` calls
  `fetch` directly instead of going through `src/utils/`. Fine as-is since
  it's a single consumer (see `fe-standards.md`'s external-service rule),
  but worth a look if a second integration is ever added.

---

## Docs

- Design direction (palette, typography, spacing, component feel) →
  `docs/reference/design-direction.md`
- Tech stack → `docs/reference/tech-stack.md`
- Frontend conventions, SCSS architecture, folder structure →
  `.claude/skills/4-tdd/fe-standards.md`
- Accessibility checklist → `.claude/skills/4-tdd/a11y-checklist.md`
