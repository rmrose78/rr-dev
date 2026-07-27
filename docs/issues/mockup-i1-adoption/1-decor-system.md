# Issue 1: Decor system

## What
Replace the site-wide decorative background with mockup i1's starfield,
shooting-stars, constellation-field, and orbit-SVG section-dividers,
including the scroll-velocity star-trail effect, fully reduced-motion
aware.

## Why
Extends the space/constellation motif site-wide (previously isolated to
Hero's molecular canvas, removed in Issue 2) and matches the approved
mockup i1 direction. See `docs/prd/mockup-i1-adoption.md`.

## Acceptance Criteria
- [ ] `PageBackground.tsx` replaced by a new component rendering the fixed
      starfield (~130 stars w/ twinkle variants) + shooting-star streaks
- [ ] Constellation-field (6 animated node/line clusters) added as a
      secondary decor layer
- [ ] Orbit-SVG section-divider component added and rendered between each
      top-level section in `App.tsx`
- [ ] Scroll-velocity star-trail effect implemented as a new hook
      (rAF-throttled scroll listener writing CSS custom properties
      consumed by the starfield's `box-shadow`), decaying to rest on
      scroll-stop
- [ ] All new animation (twinkle, shooting stars, constellation motion,
      orbit spin, star trail) fully disabled under `prefers-reduced-motion`
      via the existing `useReducedMotion` hook convention
- [ ] `$blue-pale: #7dd3fc` added to `_variables.scss`; contrast-checked if
      used on any text (not just decorative elements)
- [ ] Old `PageBackground.tsx` dot-grid/cluster system removed

## Layers Touched
- [ ] Components — new starfield/background component, new
      `SectionDivider` component; `PageBackground.tsx` removed
- [ ] Styles/tokens — new SCSS for starfield/constellation/divider,
      `$blue-pale` token added
- [ ] Tests/a11y — jest-axe test for the new background component(s)
      (`aria-hidden`, no violations); test confirming reduced-motion
      disables the animated classes/scroll listener

## Edge Cases
- `prefers-reduced-motion` enabled → no scroll listener attached at all,
  no animated classes applied, static starfield only
- Very tall or very short viewport → starfield positions are
  percentage-based, should degrade gracefully

## Blocked By
None — independent. Recommended to land first since it's foundational and
low-risk, but not a hard requirement for other issues.

## Definition of Done
- [ ] Tests written and passing
- [ ] Red-green verified
- [ ] jest-axe passing on every new render state
- [ ] Manually tested in browser (starfield/constellation renders,
      scroll-trail responds to scroll speed, reduced-motion disables all
      of it)
