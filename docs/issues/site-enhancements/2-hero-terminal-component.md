# Issue 2: Build Interactive Hero Terminal Component

## What
Create a dark-mode interactive engineering terminal component (`HeroTerminal.tsx`) in the Hero section featuring 3 tab views: `dispatch.ts`, `ai-workflow.ts`, and `metrics.json`.

## Why
Showcases advanced frontend interactive state management, code presentation aesthetics, and AI workflow discipline directly in the hero section.

## Acceptance Criteria
- [ ] Render `HeroTerminal` inside `Hero.tsx` with tabs: `dispatch.ts`, `ai-workflow.ts`, and `metrics.json`.
- [ ] Clicking tabs switches displayed terminal view with active tab highlighting and syntax-colored lines.
- [ ] Keyboard accessible (`Tab` navigation across tabs, `Enter`/`Space` selection, `aria-selected` and `role="tablist"`/`role="tab"` attributes).
- [ ] `useReducedMotion()` handles animation gating.
- [ ] `HeroTerminal.test.tsx` includes jest-axe accessibility assertions and tab click state unit tests.

## Layers Touched
- [ ] Frontend — `src/components/ui/HeroTerminal.tsx`, `src/components/ui/HeroTerminal.module.scss`, `src/components/sections/Hero.tsx`
- [ ] Tests/a11y — `src/components/ui/HeroTerminal.test.tsx`

## Edge Cases
- Mobile screen: Tabs wrap gracefully or scroll horizontally; terminal text scales cleanly without overflow.

## Blocked By
- None.

## Definition of Done
- [ ] Implementation complete per AGY.md
- [ ] Unit tests passing (`npm test`)
- [ ] Red-green TDD verified
- [ ] jest-axe passing on every distinct render state
