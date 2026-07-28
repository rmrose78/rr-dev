# Issue 5: Testimonials + Footer polish

## What
Normalize the testimonials carousel to the page's content width with an
edge-fade, match its card background to the site's shared card token, and
re-theme the footer (icon-only links, tagline/quote, sizing).

## Why
Fixes a real visual inconsistency (carousel bleeding wider than content)
and brings the footer's copy/theming in line with the mockup-i1
direction. See `docs/prd/mockup-i1-adoption.md`.

Note: this issue originally also covered the Contact section rebuild and
a few unrelated polish items (Nav's CTA, About's focus-note label, the
favicon). Those have been split out into their own issues (see "Blocked
By" / sibling issues in `docs/issues/mockup-i1-adoption/`) so each PR's
diff matches its own title. This issue's scope below reflects only what
actually landed under it.

## Acceptance Criteria
- [x] Testimonials carousel width normalized to match the rest of the
      page's content column (currently bleeds wider)
- [x] Hard clip/overflow replaced with an edge-fade (mask-image gradient)
      tapering to that content width
- [x] Testimonial card background matches the same surface/card color
      token used elsewhere on the site ($navy-900, same as
      ProjectCard/LogPanel)
- [x] Existing carousel/marquee auto-scroll + drag mechanism
      (`useMarquee.ts`) unchanged in mechanism, though its speed constant
      was tuned twice per developer feedback (20 to 26 to 32,
      progressively slower)
- [x] Testimonial cards revisited twice on height: first made
      content-sized (`align-items: flex-start`) to kill dead space under
      shorter quotes, then reverted to equal-height (`align-items:
      stretch`) per developer preference for a uniform row, compensating
      with a smaller quote font (0.9rem/0.95rem to 0.84rem/0.88rem) and
      tighter card padding (1.75rem/2rem to 1.4rem/1.1rem desktop) so the
      shared height stays compact
- [x] Testimonials section eyebrow/heading brought in line with
      About's/Projects' plain single-word eyebrow pattern: was
      `// 04 Recommendations` in its own one-off `.sectionLabel` class
      plus a gradient `.divider` line, neither of which exist on any
      other section. Now a plain `.eyebrow` reading "Recommendations",
      divider removed
- [x] Missing `SectionDivider` between Testimonials and Contact added:
      every other section transition on the page had one, this was the
      only 0px gap on the whole page (measured, not guessed).
      Testimonials' desktop bottom padding was also still the full
      `$section-py-desktop` (7rem) instead of the `3.5rem` compact value
      every other section uses. Both fixed together; all four
      section-to-section gaps on the page now measure the same 84px
- [x] Footer re-themed: icon-only GitHub/LinkedIn links (matching Hero's
      existing icon-only pattern rather than Nav's icon+text), enlarged
      from 18px to 26px per developer feedback that the original size
      read too small, and vertically centered against the text column
      (was bottom-aligned via `align-items: flex-end`)
- [x] Footer tagline ("Software Developer · built with React +
      TypeScript") dropped after developer review, they said they didn't
      know what it added once seeing it live
- [x] Footer quote added: "I must not fear. Fear is the mind-killer. Fear
      is the little-death that brings total obliteration. I will face my
      fear...", attributed "Frank Herbert, Dune" (no em dash in the
      attribution line, per this project's no-em-dash rule, quote and
      source are two separate lines instead). Wording confirmed against
      the canonical book text after the developer initially dictated a
      slightly different phrasing from memory

## Layers Touched
- [x] Components — `Testimonials.tsx` (eyebrow markup simplified),
      `Footer.tsx` (icon-only links, no tagline, quote added), `App.tsx`
      (added the missing divider before Contact)
- [x] Styles/tokens — `Testimonials.module.scss` (width, edge-fade, card
      background/sizing, section padding), `Footer.module.scss`
      (re-theme, icon size, vertical centering), `useMarquee.ts` (speed
      constant only)
- [x] Tests/a11y — jest-axe passing on updated Testimonials/Footer; new
      RTL coverage for Footer's quote; new contrast-ratio coverage for
      the shared navy-900 card background (text-secondary/text-muted)

### Scope notes
- The GitHub issue body (fetched via `gh issue view 13` at the start of
  this work) still had the original "Interstellar" footer quote. It was
  never synced after this file was updated with the Dune quote decision
  on 2026-07-27. Caught during build by reading this file directly
  instead of relying on the GitHub body alone, built against the Dune
  quote (this file's version, the newer/authoritative one), and
  re-synced GitHub's copy to match via `gh issue edit`.
- This issue originally also covered the Contact section rebuild, Nav's
  CTA, About's focus-note label, and the favicon, all developed in the
  same working session. Once everything was ready to ship, those were
  split into their own issues/branches/PRs so each one's diff and review
  scope matches its own title, rather than shipping one large PR under
  this issue's original name. See the Contact section and Misc polish
  issues in `docs/issues/mockup-i1-adoption/` for that work.

## Edge Cases
- Drag interaction on the carousel must still work correctly at the
  normalized width
- Reduced motion: carousel's existing reduced-motion handling is
  unaffected by the width/edge-fade change

## Blocked By
None — independent.

## Definition of Done
- [x] Tests written and passing
- [x] Red-green verified
- [x] jest-axe passing on every new render state
- [x] Manually tested in browser (Playwright, mobile 375px + desktop
      1440px, plus computed-style checks confirming the Testimonials
      content column exactly matches Projects' 1100px width/offset, and
      that all four section-to-section gaps on the page measure the
      same 84px)
