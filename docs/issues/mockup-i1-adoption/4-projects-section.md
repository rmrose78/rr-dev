# Issue 4: Projects section (new)

## What
Add a new Projects/case-study section between About and Testimonials
showcasing 2 real client/personal projects (researchpulse, elpa-website),
plus a short meta-intro explaining that this portfolio itself is one of
the projects — not a third card, since treating rr-dev as a peer to real
client work read oddly in review.

## Why
This is the strongest evidence against "this looks AI-generated" and the
core of the project-portfolio repositioning. See
`docs/prd/mockup-i1-adoption.md`.

## Acceptance Criteria
- [x] New `Projects.tsx` section component created, inserted into
      `App.tsx` between About and Testimonials
- [x] 2 project cards: researchpulse, elpa-website (reversed media/text
      layout), plus a meta-intro paragraph above the grid explaining rr-dev
      is itself one of the projects, with a link to its GitHub repo
      — **changed from the original 3-card plan** (rr-dev dropped as a
      card) per developer review, see Definition of Done
- [x] ResearchPulse card uses `researchpulse/docs/media/demo.gif` as its
      media (copied into `public/projects/researchpulse-demo.gif`)
- [x] elpa-website card uses a real Playwright-captured GIF of the live
      site (`https://eaglelakepreservationalliance.netlify.app/`),
      converted via ffmpeg — **changed from the original placeholder-box
      plan**, see Definition of Done
- [x] Each card includes problem/approach copy, tags, an outcome line, and
      links to both the live site and the GitHub repo (a primary "View
      live site" media caption plus a compact secondary "Source" link) —
      copy ported from the mockup, then substantially rewritten per
      developer review (see Definition of Done), reviewed and approved
      before merge
- [x] Nav's "Projects" link (added in Issue 2) anchors correctly to this
      section's id
- [x] Hero's "Jump to Projects" CTA (added in Issue 2) anchors correctly
      to this section's id
- [x] Existing scroll-reveal-on-view behavior applied consistently with
      other sections

## Layers Touched
- [x] Components — new `Projects.tsx` + `ProjectCard.tsx` (reusable card,
      warranted by repetition), `App.tsx` updated to include it
- [x] Styles/tokens — new `Projects.module.scss` / `ProjectCard.module.scss`
      matching site surface/card tokens; card redesigned around the site's
      established "mission log" motif (status-dot + mono eyebrow bar,
      terminal-prompt media caption) for visual consistency with
      `LogPanel`/About
- [x] Tests/a11y — jest-axe tests for the section and card (default
      render, image/placeholder media variants); RTL tests confirming
      each card's GitHub link href, the meta-intro's GitHub link, and the
      reversed-layout modifier

## Edge Cases
- Missing/broken media path → `ProjectCard` still supports a `placeholder`
  media variant (bordered/labeled box, no image) for any future project
  without real media yet; not currently used since both cards now have
  real captures
- Long case-study copy → cards do not visually break at small viewport
  widths (verified at 375px and 1440px)
- elpa-website's real-world state (client went unresponsive before final
  gallery content/donations integration landed) is disclosed directly in
  the outcome copy rather than hidden or glossed over

## Blocked By
None — independent, but shared `App.tsx` edits with Issue 3 (About
consolidation), already merged.

## Definition of Done
- [x] Tests written and passing
- [x] Red-green verified
- [x] jest-axe passing on every new render state
- [x] Manually tested in browser (Playwright, both by the implementing
      agent and independently re-verified)
- [x] Ryan has reviewed/approved the ported case-study copy before merge

### Scope changes from developer review (round 2)
- **rr-dev dropped as a third card**: read oddly for the site to showcase
  itself as a peer to real client work. Replaced with a short meta-intro
  paragraph above the card grid ("You're already looking at one of
  them...") linking to `https://github.com/rmrose78/rr-dev`.
- **elpa-website copy is direct about the project's real state**: the
  client (a personal contact) went unresponsive before final gallery
  content and the donations API integration landed. The outcome copy
  states this plainly rather than presenting the site as a finished
  product — consistent with the project's no-overclaiming stance (the
  same principle behind not showing an a11y compliance badge on the
  site).
- **elpa-website gets real media**: a short Playwright-recorded
  scroll-through of the live site (hero → credentials → accomplishments,
  stopping before the empty buildings-saved gallery and non-functional
  donation form), converted to GIF via ffmpeg. Not part of the original
  plan, which had it as a placeholder box.
- **Section head restyled**: eyebrow "Casework" + title "Proof, not a
  template." (no subhead paragraph), matching the pattern established by
  About's section head in Issue #11, rather than the mockup's plain
  "Projects" heading.
- **Card visual redesign**: full pass via a Fable-model agent to fix two
  bugs found in the first build (dead space/elongation from mismatched
  media/body heights; GIF cropping from an undeliberate `object-fit`
  crop point) and to bring the card in line with the site's established
  "mission log" motif (status-dot bar, terminal-prompt media caption).
- **Media caption/GitHub link consolidated**: both a media-panel caption
  link and a separate body "View on GitHub" link pointed at the same repo
  URL for any card without a live site, which read as a redundant pair.
  Replaced with one pattern per card: the media caption always links to
  the live site ("View live site"), with a compact secondary "Source"
  link beneath it for the repo. Surfaced that researchpulse also has a
  live deployment (`researchpulsehq.com`) that had been left out of the
  original data, so both cards now use the same live+source treatment
  consistently.
- **elpa-website outcome copy**: dropped the "pro bono, first freelance
  engagement" framing per developer preference — the "Nonprofit" tag and
  "donated rebuild" title already establish it wasn't a paid engagement,
  so the callout was redundant.
