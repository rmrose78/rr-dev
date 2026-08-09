# Issue 3: Build Project Demo Lightbox Modal & 3D Card Tilt

## What
Enhance project cards with 3D mouse-hover tilt physics and an interactive full-screen image demo Lightbox Modal (`ImageLightboxModal.tsx`).

## Why
Delivers a flashy, responsive micro-interaction on hover while providing a high-impact demo preview for project showcase media.

## Acceptance Criteria
- [ ] `ProjectCard.tsx` implements subtle mouse-position spring physics tilt on hover (bypassed when `reducedMotion` is true).
- [ ] Clicking project media opens `ImageLightboxModal` displaying the enlarged media gif/image, title, and caption.
- [ ] Modal is fully accessible: focus trapped, closes on `Esc` key press or backdrop click, restores focus on close.
- [ ] `ImageLightboxModal.test.tsx` and `ProjectCard.test.tsx` pass all unit and `jest-axe` assertions.

## Layers Touched
- [ ] Frontend — `src/components/ui/ProjectCard.tsx`, `src/components/ui/ProjectCard.module.scss`, `src/components/ui/ImageLightboxModal.tsx`, `src/components/ui/ImageLightboxModal.module.scss`
- [ ] Tests/a11y — `src/components/ui/ProjectCard.test.tsx`, `src/components/ui/ImageLightboxModal.test.tsx`

## Edge Cases
- ESC key pressed when lightbox modal open -> modal closes immediately.
- Reduced motion enabled -> 3D tilt disabled, modal opens instantly.

## Blocked By
- None.

## Definition of Done
- [ ] Implementation complete per AGY.md
- [ ] Unit tests passing (`npm test`)
- [ ] Red-green TDD verified
- [ ] jest-axe passing on every distinct render state
