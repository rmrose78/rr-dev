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
- [ ] `Skills.tsx` content (skill groups/tags) becomes About's right-column
      "Stack" panel; Skills.tsx removed as a standalone section and
      removed from `App.tsx`
- [ ] `Experience.tsx` and its section removed entirely from `App.tsx`;
      file deleted
- [ ] "Currently Scanning" focus-note moved to sit beneath the Dispatch
      bio (not above it)
- [ ] Both About columns are equal height (try moving Education/Service
      spec cards into the right column above the Stack panel; use
      judgment for whatever reads cleanest)
- [ ] Tech-stack tags have no hover state implying clickability (no
      pointer cursor, no hover color shift)
- [ ] Existing scroll-reveal-on-view behavior (Framer Motion
      `whileInView` + `useReducedMotion`) preserved throughout
- [ ] Nav's `NAV_LINKS` no longer reference `#skills` or `#experience`
      (coordinate with Issue 2 if not already updated there)

## Layers Touched
- [ ] Components — `About.tsx` restructured (adds Stack panel),
      `Skills.tsx` and `Experience.tsx` deleted, `App.tsx` updated to
      remove their imports/JSX
- [ ] Styles/tokens — `About.module.scss` updated for two-column
      equal-height layout and Stack panel; static (non-hover) tag styling
- [ ] Tests/a11y — `About.test.tsx` updated for new content/structure;
      jest-axe passing on the consolidated section

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
