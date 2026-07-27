# Issue 5: Testimonials + Contact polish

## What
Normalize the testimonials carousel to the page's content width with an
edge-fade, ensure every contact trigger opens the modal directly, and
update the footer's copy/theming.

## Why
Fixes a real visual inconsistency (carousel bleeding wider than content)
and removes stale scroll-anchor-to-contact behavior now that every
trigger should open the modal directly. See
`docs/prd/mockup-i1-adoption.md`.

## Acceptance Criteria
- [ ] Testimonials carousel width normalized to match the rest of the
      page's content column (currently bleeds wider)
- [ ] Hard clip/overflow replaced with an edge-fade (mask-image gradient)
      tapering to that content width
- [ ] Testimonial card background matches the same surface/card color
      token used elsewhere on the site
- [ ] Existing carousel/marquee auto-scroll + drag mechanism
      (`useMarquee.ts`) unchanged
- [ ] Contact section's own button opens `ContactModal` directly (already
      does via `onContactClick` — confirm no regression)
- [ ] No scroll-anchor-to-contact behavior remains anywhere (hero, nav,
      contact section itself)
- [ ] No scroll-down-to-contact indicator remains (removed if present)
- [ ] Footer re-themed (colors/type) with existing icon-only GitHub/
      LinkedIn links
- [ ] Footer tagline ("Software Developer · built with React + TypeScript")
      and Interstellar quote ("We will find a way. We always have.") added
      verbatim

## Layers Touched
- [ ] Components — `Testimonials.tsx`, `Contact.tsx`, `Footer.tsx` updated
- [ ] Styles/tokens — `Testimonials.module.scss` (width/edge-fade/card
      background), `Footer.module.scss` (re-theme + new tagline/quote
      layout)
- [ ] Tests/a11y — jest-axe passing on updated Testimonials/Footer; RTL
      test confirming Contact's button still triggers `onContactClick`

## Edge Cases
- Drag interaction on the carousel must still work correctly at the new
  (narrower) width
- Reduced motion → carousel's existing reduced-motion handling (if any) is
  unaffected by the width/edge-fade change

## Blocked By
None — independent.

## Definition of Done
- [ ] Tests written and passing
- [ ] Red-green verified
- [ ] jest-axe passing on every new render state
- [ ] Manually tested in browser
