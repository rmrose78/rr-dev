# Issue 3: About consolidation

## What
Fold Skills into About's right column as a "Stack" panel, cut Experience
entirely, rebalance About into equal-height columns, and remove hover
affordance from tech-stack tags.

## Why
Moves away from resume-style sections toward project depth, per the
handoff's core goal ("not a resume") and the PRD's structural decisions.
See `docs/prd/mockup-i1-adoption.md`.

## Acceptance Criteria
- [x] `Skills.tsx` content (skill groups/tags) becomes About's right-column
      "Stack" panel; Skills.tsx removed as a standalone section and
      removed from `App.tsx`
- [x] `Experience.tsx` and its section removed entirely from `App.tsx`;
      file deleted
- [x] "Currently scanning" focus-note sits *above* the Dispatch bio, first
      in the left column — revised from "beneath the bio" after
      cross-referencing the actual `mockup-i1-project-blocks.html`, which
      places it first (developer-confirmed)
- [x] Both About columns are visually balanced: left column carries the
      focus-note + Dispatch bio + two compact stat cards (Education,
      Service); right column carries the Stack panel. Production
      Experience (4 Years) and Prior Clearance (TS/SCI) are dropped as
      separate stat tiles — that info is folded into the Dispatch bio
      prose instead, per the mockup's explicit design comment ("no
      invented stats... those live in the narrative copy") — developer
      confirmed
- [x] Tech-stack tags have no hover state implying clickability (no
      pointer cursor, no hover color shift) — the mockup's own CSS has a
      leftover hover rule on these tags that contradicts this; treated as
      stale per developer confirmation, PRD's stated decision wins
- [x] Existing scroll-reveal-on-view behavior (Framer Motion
      `whileInView` + `useReducedMotion`) preserved throughout
- [x] Nav's `NAV_LINKS` no longer reference `#skills` or `#experience`
      (already done in Issue #10 — confirmed, no action needed)

## Scope note
The original acceptance criteria above (as first written) described a
lighter restyle than what the canonical mockup actually shows for this
section: a new "log-panel" console-card treatment (status-dot header bar,
`Dispatch`/`Stack` labels, `STATUS: TRANSMITTING` footer) for both the bio
and the skills chart, plus rewritten bio/section-header copy. Built to
match the mockup exactly (developer-confirmed via AskUserQuestion before
implementation) rather than the issue's original lighter-restyle
prose — see the two new criteria below.

## Acceptance Criteria — added during this build
- [x] New reusable `LogPanel` component (`src/components/ui/LogPanel.tsx`)
      — console-card primitive with a status-dot header bar, body slot,
      optional footer — used for both the Dispatch bio card and the Stack
      skills card
- [x] Section-head copy replaced to match the mockup: eyebrow
      "Background", title "The signal so far.", intro paragraph "The path
      here, the credentials behind it, and the toolkit that comes with
      both." Bio copy rewritten to the mockup's "Dispatch" text verbatim
- [x] `StatCard` gets a `compact` variant (smaller padding/font) for the
      two side-by-side Education/Service cards

## Layers Touched
- [x] Components — `About.tsx` restructured (Dispatch/Stack log-panels,
      focus-note, compact stat cards), new `LogPanel.tsx` primitive,
      `StatCard.tsx` gets a `compact` prop, `Skills.tsx` and
      `Experience.tsx` deleted, `App.tsx` updated to remove their
      imports/JSX
- [x] Styles/tokens — `About.module.scss` rewritten for the new two-column
      layout; new `LogPanel.module.scss`; `StatCard.module.scss` compact
      variant; `$border-med`/`$blue-glow` tokens added to
      `_variables.scss`; static (non-hover) tag styling
- [x] Tests/a11y — `About.test.tsx` rewritten for new content/structure;
      new `LogPanel.test.tsx`; `StatCard.test.tsx` covers the compact
      variant; `App.test.tsx` heading assertion updated; jest-axe passing
      throughout; new `navy-800` contrast pairings added to
      `design-tokens.contrast.test.ts` (LogPanel's gradient background is
      a new bg/text pairing per CLAUDE.md's contrast rule)

## Edge Cases
- Small viewport → columns stack vertically as before; equal-height
  concern only applies at the desktop breakpoint
- Long tag lists (Tools & Workflow has 6 tags) → wrapping behavior must
  not break the equal-height layout

## Blocked By
None — independent, but shares `App.tsx` edits with Issue 4 (Projects
section). Coordinate merge order to avoid conflicts (rebase whichever
merges second).

## Definition of Done
- [ ] Tests written and passing
- [ ] Red-green verified
- [ ] jest-axe passing on every new render state
- [ ] Manually tested in browser
- [ ] Equal-height column approach shown to Ryan for confirmation before
      merge (explicit checkpoint per PRD)
