# Handoff: Adopt mockup i1, with adjustments (2026-07-27)

## Why this exists

This doc was written from a researchpulse session while iterating on
`docs/mockups/mockup-i1-project-blocks.html` as a static, no-build
sandbox. That iteration is done and `mockup-i1-project-blocks.html` is
the winning direction, but it's not a straight swap-in: the mockup was
built in isolation and doesn't know about the real, working components
already in this repo. This doc bridges the two so a session run inside
rr-dev can implement it without Ryan re-explaining any of this.

## Decision: mockup i1 is the winning direction

`docs/mockups/mockup-i1-project-blocks.html` wins over
`docs/mockups/mockup-h4-blue-shootingstars-constellation.html` — h4 is
superseded, not being pursued further. i1's project-blocks layout is
meant to become the projects/case-study showcase section this repo's
CLAUDE.md already flags as not yet built, and the hero direction in i1
supersedes the "hero not yet rebuilt" item too.

**The underlying goal driving every adjustment below:** this site is a
project portfolio, not a resume. It should not need to be updated except
to add new projects over time. Resume-grade detail (work history
specifics, clearance, etc.) lives on LinkedIn and the resume PDF, linked
from the site, not duplicated in it. Positioning is shifting from
"Frontend Developer" to "Software Developer," to leave room for future
fullstack work — people who want the frontend specifics can get that from
the resume/LinkedIn or infer it from the projects themselves.

## Decisions

For each area: what the mockup shows, what the real component currently
does, and the target adjustment.

### Hero — `src/components/sections/Hero.tsx`
- Mockup: three buttons (Get in Touch / View GitHub / Jump to Projects)
  plus a decorative pulsing-dot scroll cue.
- Live: CTA buttons are "Get in Touch" (opens `ContactModal`) + a "View
  GitHub" text link; a scroll cue already exists.
- Adjustment: drop "View GitHub" as a text button — icon-only for GitHub
  + LinkedIn instead, matching the nav/footer treatment (see below). Keep
  "Get in Touch" (already opens the modal, no change needed) and "Jump to
  Projects." Keep a scroll-down-for-more cue, but make it visually
  thematic to the site (e.g. the star/constellation motifs already used
  elsewhere) instead of a generic chevron or arrow — exact treatment is
  an open question below.

### Nav / wordmark — `src/components/layout/Nav.tsx`
- Mockup: left-aligned plain-text "Ryan Rose" wordmark, plain-text
  GitHub/LinkedIn links.
- Live: already has icon-link GitHub/LinkedIn and a "Get in touch" CTA
  that opens the modal.
- Adjustment: keep the mockup's left-aligned plain-text "Ryan Rose"
  wordmark treatment, but reuse the live site's actual icon-link and
  contact-button components as-is — don't rebuild the interaction
  pattern, just re-theme colors/type to the new direction.

### About/Background — `src/components/sections/About.tsx`, `src/components/ui/StatCard.tsx`
- Mockup: two columns — left has focus-note ("Currently Scanning") above
  the Dispatch bio, then Education/Service cards; right has the tech
  stack.
- Live: bio + `StatCard` grid, scroll-reveal via Framer Motion
  `whileInView`.
- Adjustment: move "Currently Scanning" to sit *beneath* the Dispatch bio
  (reverting the mockup's current above-Dispatch placement). Make both
  columns equal height — likely means moving Education/Service into the
  right column above the tech-stack panel, but use judgment for whatever
  reads cleanest. Preserve the existing scroll-reveal-on-view behavior
  throughout.

### Tech skills panel
- Adjustment: remove any hover state implying the tags are clickable (no
  pointer cursor, no hover color shift) — they're static, not links.

### Testimonials/referrals — `src/components/sections/Testimonials.tsx`, `src/hooks/useMarquee.ts`
- Mockup: referrals section is narrower than the rest of the page's
  content.
- Live: carousel currently bleeds wider than the content column.
- Adjustment: normalize both to one consistent width matching the rest of
  the page's content. Widen the mockup's version to match; on the live
  site, add an edge-fade (mask-image gradient) that tapers the carousel
  down to that same content width instead of a hard clip/overflow. Card
  background should match the same surface/card color token used
  elsewhere on the site.

### Contact — `src/components/sections/Contact.tsx`, `src/components/ui/ContactModal.tsx`
- Mockup: bottom "Want to connect?" section, anchor-scrolled to from
  hero/nav buttons.
- Live: `ContactModal` (Radix Dialog) already opens directly from
  Hero/Nav/Contact via `onContactClick` state in `App.tsx`.
- Adjustment: every contact trigger (hero, nav, the bottom section's own
  button) opens the modal directly — none scroll-link to the bottom
  section. The bottom "Want to connect?" section stays as a closing/
  narrative section of the page, but it's no longer a scroll destination;
  its own button also just opens the modal, same as everywhere else. No
  scroll-down-to-contact indicator is needed as a result.

### Footer — `src/components/layout/Footer.tsx`
- Adjustment: keep the icon-only GitHub/LinkedIn links (already the live
  behavior) re-themed to match the new direction's colors/type.

### Project cards / GIFs
- Adjustment: use `researchpulse/docs/media/demo.gif` for the
  ResearchPulse project card now. Other project cards (rr-dev itself,
  elpa-website) stay placeholder until their own GIFs are ready.

### Scroll-reveal-on-scroll
- Already implemented site-wide via `src/hooks/useReducedMotion.ts` +
  Framer Motion `whileInView` (seen in About, Testimonials, Contact).
  Carry this forward into whatever gets rebuilt — don't regress it.

## Open Questions

Not decided — raise these with Ryan during the next session:

- Other elements from the pre-i1 site design he wants to keep that
  haven't come up in this adjustment list.
- Whether to continue in this existing repo vs. a new one. His stated
  leaning: continue in rr-dev, no new repo.
- Exact visual treatment for the hero's "thematic" scroll-down cue —
  reuse an existing motif (e.g. the mockup's star-trail dot) or design
  something new.
- Confirm the final About-section equal-height approach once tried (e.g.
  moving Education/Service into the right column) before locking it in —
  it's a visual judgment call, show Ryan before finalizing.

## Where to look in rr-dev for the actual code

- `src/components/sections/Hero.tsx`
- `src/components/layout/Nav.tsx`
- `src/components/sections/About.tsx`
- `src/components/ui/StatCard.tsx`
- `src/components/sections/Testimonials.tsx`
- `src/hooks/useMarquee.ts`
- `src/components/layout/Footer.tsx`
- `src/components/sections/Contact.tsx`
- `src/components/ui/ContactModal.tsx`
- `src/components/ui/Modal.tsx`
- `src/components/ui/GitHubIcon.tsx`
- `src/components/ui/LinkedInIcon.tsx`
- `src/hooks/useReducedMotion.ts`
- `src/App.tsx` (owns `contactOpen` state, wires `onContactClick` through)
- `docs/mockups/mockup-i1-project-blocks.html` (the design reference)
