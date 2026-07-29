# PRD: Mockup i1 Adoption (Full Site Revamp)

## Problem

The current site reads as resume-style and templated; it needs to read as
a project portfolio built by an engineer, for hiring managers, recruiters,
and peer developers deciding whether Ryan is worth a closer look.
`docs/mockups/mockup-i1-project-blocks.html` is the approved winning
direction (see `docs/handoff/2026-07-27-mockup-i1-adoption-adjustments.md`)
but was built in isolation from the live components and needs to be
adapted, not swapped in wholesale.

## Success Criteria

- [ ] Positioning shifts from "Frontend Developer" to "Software Developer"
      across nav, hero, and footer
- [ ] Site reads as project-portfolio-first: a new Projects/case-study
      section exists with real depth (problem/approach/outcome per project)
- [ ] Resume-grade detail (work history specifics, clearance) is removed
      from the site, not just de-emphasized
- [ ] Every contact entry point (hero, nav, bottom section) opens
      `ContactModal` directly — no scroll-anchor contact behavior remains
- [ ] Existing scroll-reveal-on-view behavior (Framer Motion `whileInView` + `useReducedMotion`) is preserved on every rebuilt section
- [ ] New decor system (starfield, shooting stars, constellation field,
      section-dividers, scroll-velocity star trail) fully respects
      `prefers-reduced-motion`
- [ ] All new/changed text-on-background color pairings pass
      `src/utils/contrast-ratio.ts` (4.5:1 normal text, 3:1 large/
      interactive)
- [ ] Every rebuilt component keeps or gains a jest-axe test per distinct
      render state

## User Stories

- As a hiring manager skimming the site in the first few seconds, I want
  the hero to immediately signal "Software Developer" and let me jump to
  real project evidence, not a resume-style bio.
- As a recruiter or peer developer, I want a Projects section with real
  case-study depth (problem, approach, outcome, tags, link) so I can judge
  engineering quality directly, not just read claims about it.
- As any visitor, I want to open the contact modal from anywhere on the
  page (hero, nav, closing section) without being scroll-jumped somewhere
  first.
- As a visitor with reduced-motion preferences, I want all the new
  starfield/constellation/scroll-trail decoration to be static, not
  animated.

## Design Direction

Color palette: existing `_variables.scss` tokens ($navy, $navy-900/800/700,
$electric-blue, $teal, $text-primary/secondary/muted) plus one new token to
add: `$blue-pale: #7dd3fc` (used in the mockup's constellation/starfield
accents — contrast-check if it ends up on any text, not just decorative
elements).

Typography: unchanged (Syne / DM Mono / DM Sans).

Visual tone: dark-mode-first, technical/precise, space/constellation motif
now extended site-wide via the decor system (previously isolated to
Hero's molecular canvas, which is being removed).

Key interactions:

- Fixed-position starfield (~130 stars, twinkle variants) + shooting-star
  streaks, replacing `PageBackground.tsx`'s dot-grid/cluster system
  entirely
- Animated constellation-field (6 node/line clusters) as a secondary decor
  layer, same fixed positioning approach
- Orbit-SVG "section-divider" (small orbiting-moon SVG) between each major
  section
- Scroll-velocity-driven star trail: a passive, rAF-throttled scroll
  listener writes velocity/direction to CSS custom properties that a
  `box-shadow` rule on `.starfield .star` consumes, decaying back to rest
  when scrolling stops. Already Ryan-approved from the source mockup
  session. Skips entirely under `prefers-reduced-motion`, same as every
  other new animation.
- Hero's existing molecular-canvas particle background (`useMolecularCanvas.ts`,
  55 desktop / 30 mobile drifting nodes with bond lines) is removed — the
  hero shows the same shared decor system as every other section, matching
  the mockup exactly
- Tech-stack tags in About lose any hover/pointer affordance — they are
  static, not links
- Testimonials carousel keeps its existing auto-scroll/drag mechanism
  (`useMarquee.ts`) unchanged; only width and edge treatment change

Mobile behavior: existing responsive patterns carry forward (hamburger nav,
stacked columns, existing breakpoints in `_variables.scss`). No new mobile-
specific behavior beyond what's already in place for nav/columns.

## UI States

| State                           | What the user sees                                                                                                                                              |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Reduced motion                  | Starfield/constellation/orbit-divider/scroll-trail are static; existing scroll-reveal sections render pre-revealed (matches current `useReducedMotion` pattern) |
| Scroll-in-view (default motion) | Sections fade/slide in via existing `whileInView` Framer Motion pattern, unchanged from current behavior                                                        |
| Project card, media ready       | ResearchPulse card shows `researchpulse/docs/media/demo.gif`                                                                                                    |
| Project card, media not ready   | rr-dev and elpa-website cards show a placeholder treatment (bordered/labeled box, no image) until real screenshots/GIFs exist                                   |
| Contact modal                   | Unchanged — existing `ContactModal.tsx` (Radix Dialog) opens from any contact trigger                                                                           |

## Scope

Grouped into 5 vertical-slice issues (confirmed grouping, feeds `/3-to-issues`):

### 1. Decor system

- Replace `PageBackground.tsx` with starfield + shooting-stars +
  constellation-field
- Add orbit-SVG section-dividers between sections
- Add scroll-velocity star-trail effect (new hook, reduced-motion gated)
- Remove `useMolecularCanvas.ts` and Hero's `<canvas>` usage
- Add `$blue-pale` token to `_variables.scss`

### 2. Nav + Hero

- Nav: wordmark changes from "rr<span>.dev</span>" to plain-text
  left-aligned "Ryan Rose" (heading font, bold); icon-link (`GitHubIcon`/
  `LinkedInIcon`) pattern kept icon+text as-is; CTA button (`.cta`)
  restyled to the same filled electric-blue pill treatment as Hero's
  primary button (was outlined/square-cornered), so the "get in touch"
  action reads as one consistent button design everywhere it appears
- Nav links: drop Skills and Experience entries (sections are being
  removed/folded), add Projects, keep About and Recommendations
- Hero: adopt mockup copy verbatim — eyebrow "Software Developer",
  headline "Builds things that matter.", rewritten bio (Army veteran, BME
  grad, "a thing for space" line); layout adopts the mockup's actual
  centered/compact scale (not the old left-aligned giant-heading layout)
- Hero CTAs, two-tier layout: primary row has "Get in Touch" and "Jump to
  Projects" as matching pill buttons, directly adjacent; a second, quieter
  row beneath has icon-only GitHub + LinkedIn links (no visible text,
  `aria-label` for the accessible name) — revised from an earlier
  icon+text draft after developer review found it looked wedged between
  the two buttons
- Pill buttons (Hero primary/ghost, Nav CTA) share a hover flourish: soft
  glow bloom + lift, plus a diagonal light-sweep streak echoing the
  shooting-star motif in the decor system (shared `btn-sweep` mixin in
  `_mixins.scss`); sweep disabled under `prefers-reduced-motion`
- Bespoke scroll-cue motif: a falling star trail (thin vertical line, a
  small glowing dot travels down it on a loop and fades), not a
  palette-only reskin of the old cue

### 3. About consolidation

- Fold `Skills.tsx`'s tag content into About's right column as a "Stack"
  panel; remove Skills as a standalone section
- Cut `Experience.tsx` entirely; remove from `App.tsx`
- Move "Currently Scanning" focus-note beneath the Dispatch bio (not
  above it)
- Make both columns equal height — try moving Education/Service spec
  cards into the right column above the Stack panel; confirm the final
  approach with Ryan before locking in (visual judgment call, carried
  over from the handoff doc)
- Remove hover/pointer affordance from tech-stack tags
- Preserve existing scroll-reveal-on-view behavior

### 4. Projects section (new)

- New section between About and Testimonials, 3 project cards:
  researchpulse, rr-dev (reversed media/text layout per mockup), elpa-website
- ResearchPulse card uses `researchpulse/docs/media/demo.gif`; rr-dev and
  elpa-website use a placeholder treatment until real media exists
- Card copy (problem/approach/tags/outcome) ported from the mockup as a
  **draft** — needs Ryan's review/edit pass before merge, not shipped
  verbatim
- Each card links out to its GitHub repo

### 5. Testimonials + Contact polish

- Normalize testimonials carousel width to match the rest of the page's
  content column (currently bleeds wider)
- Add an edge-fade (mask-image gradient) tapering to that content width,
  replacing the current hard clip/overflow
- Card background matches the same surface/card color token used
  elsewhere on the site
- Every contact trigger (hero, nav, bottom section's own button) opens
  `ContactModal` directly; remove any scroll-anchor-to-contact behavior
  and the now-unnecessary scroll-down-to-contact indicator
- Footer: re-theme; GitHub/LinkedIn link treatment decided at build time
  to match whichever of Nav (icon+text) or Hero (icon-only) it should be
  consistent with; add tagline ("Software Developer · built with React +
  TypeScript"). Quote changed 2026-07-27 from the originally-planned
  Interstellar line to: "I must not fear. Fear is the mind-killer. Fear
  is the little-death that brings total obliteration. I will face my
  fear..." — attributed "— Frank Herbert, Dune", deliberately trimmed to
  end on the turn toward courage rather than the darkest point

### Out of Scope

- `mockup-h4-blue-shootingstars-constellation.html` (superseded, not
  pursued)
- A resume PDF link anywhere on the site — filed as a known follow-up
  (parallel to the existing `ContactModal.tsx` fetch() note in CLAUDE.md),
  not built in this pass
- Any new third-party service integration
- A footer text "Contact" link duplicating the existing CTA button (see
  Open Questions)

## Data

### Inputs

None — this is presentational content only, no new form fields or user
input beyond the existing `ContactModal`.

### Outputs

Rendered static content: project case-study copy, testimonial quotes,
updated hero/footer/about copy.

### Stored / sent to third parties

No change — `ContactModal.tsx`'s existing `fetch` to web3forms is the only
external call, untouched by this revamp.

## Edge Cases

- Reduced-motion users → starfield/constellation/orbit-divider/scroll-trail
  render static; no scroll-linked JS behavior runs at all (early return,
  matching the mockup's own `matchMedia` guard)
- Project card with no real media yet (rr-dev, elpa-website) → placeholder
  box with label text, not a broken image or empty space
- About's equal-height column fix → resolve with a real layout attempt,
  then confirm visually with Ryan before finalizing (explicit checkpoint,
  not a silent judgment call)
- Small viewport → existing responsive patterns (hamburger nav, stacked
  About columns, stacked project cards) carry forward unchanged

## Open Questions

- Footer "Contact" text link: the mockup includes one alongside GitHub/
  LinkedIn, but this was never explicitly confirmed. ASSUMED: skip it,
  since the original handoff only specified re-theming the existing
  icon-only GitHub/LinkedIn links and didn't call for a new nav-style
  entry. Revisit if Ryan wants a third footer link.
- About's equal-height column approach is intentionally left as a
  build-time visual decision (see Edge Cases) — not a gap, a planned
  checkpoint.

Ready to run `/3-to-issues`
