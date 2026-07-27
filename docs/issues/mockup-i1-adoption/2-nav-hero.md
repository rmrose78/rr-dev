# Issue 2: Nav + Hero

## What
Rebuild Nav's wordmark and Hero's copy/CTAs/scroll-cue to match mockup i1,
repositioning from "Frontend Developer" to "Software Developer," and
remove Hero's bespoke molecular-canvas background.

## Why
The hero is the first thing a hiring manager sees; it needs to sell
"Software Developer" immediately and match the new visual direction. See
`docs/prd/mockup-i1-adoption.md`.

## Acceptance Criteria
- [ ] Nav wordmark changed from `rr<span>.dev</span>` to plain-text
      left-aligned "Ryan Rose"
- [ ] Nav's existing icon-link (`GitHubIcon`/`LinkedInIcon`) and CTA
      button components reused as-is, re-themed colors/type only — no
      interaction pattern rebuild
- [ ] `NAV_LINKS` updated: remove Skills and Experience entries, add
      Projects (anchor to the new Projects section id from Issue 4), keep
      About and Recommendations
- [ ] Hero copy replaced verbatim: eyebrow "Software Developer", headline
      "Make things that matter.", rewritten bio (Army veteran, BME grad,
      "a thing for space" line)
- [ ] Hero CTAs: "Get in Touch" unchanged (opens modal); "View GitHub"
      text link replaced with icon-only GitHub + LinkedIn links matching
      nav/footer treatment; "Jump to Projects" anchor added
- [ ] New bespoke scroll-cue motif designed and implemented (not a
      palette-only reskin of the current cue)
- [ ] `useMolecularCanvas.ts` and Hero's `<canvas>` element removed; hero
      now shows the shared decor system behind it like every other section

## Layers Touched
- [ ] Components — `Nav.tsx`, `Hero.tsx` rebuilt; `useMolecularCanvas.ts`
      deleted
- [ ] Styles/tokens — `Nav.module.scss`, `Hero.module.scss` updated for
      new wordmark/copy/scroll-cue treatment
- [ ] Tests/a11y — jest-axe test updates for Nav (new link set) and Hero
      (new copy/CTAs/scroll-cue); RTL test for nav link hrefs and hero CTA
      behavior (contact click, jump-to-projects anchor)

## Edge Cases
- Nav's mobile hamburger menu → same link updates (drop Skills/
  Experience, add Projects) applied to the mobile menu list too
- Reduced motion → scroll-cue's animation (if any) respects
  `useReducedMotion`, matching site convention

## Blocked By
None — independent of Issue 1 (Decor system) functionally, though
visually nicer if decor lands first since the hero's background comes
from the shared system once the molecular canvas is removed.

## Definition of Done
- [ ] Tests written and passing
- [ ] Red-green verified
- [ ] jest-axe passing on every new render state
- [ ] Manually tested in browser
