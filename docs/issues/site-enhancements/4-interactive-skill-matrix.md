# Issue 4: Build Interactive Skill Filtering Matrix

## What
Make skill tags in the About section interactive, allowing users to click a skill tag (e.g. `React`, `TypeScript`, `WCAG`) to highlight matching tags and scroll/highlight relevant project cards in the Projects section.

## Why
Creates a cohesive, interactive connection between technical skills and live project case studies.

## Acceptance Criteria
- [ ] Clicking any skill tag in `About.tsx` toggles active selection state (`aria-pressed="true"`).
- [ ] Active skill tag applies active glow styling and highlights matching project tags in `Projects.tsx`.
- [ ] Clicking active tag again deselects it (resets highlight).
- [ ] Keyboard accessible (`Enter`/`Space` toggles tag selection).
- [ ] `About.test.tsx` and `Projects.test.tsx` verified green with `jest-axe`.

## Layers Touched
- [ ] Frontend — `src/components/sections/About.tsx`, `src/components/sections/About.module.scss`, `src/components/sections/Projects.tsx`, `src/components/sections/Projects.module.scss`
- [ ] Tests/a11y — `src/components/sections/About.test.tsx`, `src/components/sections/Projects.test.tsx`

## Edge Cases
- Deselecting active tag restores all projects to default state.

## Blocked By
- Issue 1.

## Definition of Done
- [ ] Implementation complete per AGY.md
- [ ] Unit tests passing (`npm test`)
- [ ] Red-green TDD verified
- [ ] jest-axe passing on every distinct render state
