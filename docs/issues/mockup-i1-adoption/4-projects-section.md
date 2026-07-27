# Issue 4: Projects section (new)

## What
Add a new Projects/case-study section between About and Testimonials with
3 project cards (researchpulse, rr-dev, elpa-website).

## Why
This is the strongest evidence against "this looks AI-generated" and the
core of the project-portfolio repositioning. See
`docs/prd/mockup-i1-adoption.md`.

## Acceptance Criteria
- [ ] New `Projects.tsx` section component created, inserted into
      `App.tsx` between About and Testimonials
- [ ] 3 project cards: researchpulse, rr-dev (reversed media/text layout
      per mockup), elpa-website
- [ ] ResearchPulse card uses `researchpulse/docs/media/demo.gif` as its
      media
- [ ] rr-dev and elpa-website cards use a placeholder treatment
      (bordered/labeled box, no image) until real media exists
- [ ] Each card includes problem/approach copy, tags, an outcome line, and
      a "View on GitHub" link to its repo — copy ported from the mockup as
      a **draft**, flagged for Ryan's review before merge
- [ ] Nav's "Projects" link (added in Issue 2) anchors correctly to this
      section's id
- [ ] Hero's "Jump to Projects" CTA (added in Issue 2) anchors correctly
      to this section's id
- [ ] Existing scroll-reveal-on-view behavior applied consistently with
      other sections

## Layers Touched
- [ ] Components — new `Projects.tsx` (and a `ProjectCard.tsx` if
      warranted by repetition), `App.tsx` updated to include it
- [ ] Styles/tokens — new `Projects.module.scss` / `ProjectCard.module.scss`
      matching site surface/card tokens
- [ ] Tests/a11y — jest-axe test for the section (default render, at
      minimum); RTL test confirming each card renders its GitHub link
      with the correct href

## Edge Cases
- Missing/broken media path (rr-dev, elpa-website placeholders) → renders
  as a clearly-labeled placeholder, not a broken image icon or empty space
- Long case-study copy → cards must not visually break at small viewport
  widths

## Blocked By
None — independent, but shares `App.tsx` edits with Issue 3 (About
consolidation). Coordinate merge order to avoid conflicts.

## Definition of Done
- [ ] Tests written and passing
- [ ] Red-green verified
- [ ] jest-axe passing on every new render state
- [ ] Manually tested in browser
- [ ] Ryan has reviewed/approved the ported case-study copy before merge
