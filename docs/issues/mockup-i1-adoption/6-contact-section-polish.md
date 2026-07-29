# Issue 6: Contact section rebuild, copy, and CTA consistency

## What
Rebuild the Contact section to match the mockup's panel treatment,
rewrite its copy to read as a professional contact prompt rather than a
personal-connection overture, and unify its button with Nav's CTA (both
trigger the identical action, so they should look and behave the same).

## Why
The Contact section was never given its own visual pass in the original
Testimonials + Contact issue, since the acceptance criteria only asked to
confirm its existing modal-trigger behavior. Once reviewed alongside the
mockup, the developer asked for the full panel rebuild. Separately, the
original copy ("Get in touch" / "Want to connect?") read as a
personal-connection overture rather than a professional one per outside
feedback, and the button had a real accessibility bug (see below), not
just a style mismatch.

## Acceptance Criteria
- [x] Contact panel rebuilt to match the mockup's `.contact__panel`
      treatment: two off-center radial-gradient electric-blue tints over
      the shared `$navy-900` surface, 20px rounded corners, a soft blue
      box-shadow glow, replacing the old flat-bordered 4px-radius card
      with a top gradient hairline
- [x] Copy rewritten: eyebrow "Open a channel", heading "Have a project
      in mind?" (was "Get in touch" / "Want to connect?"), keeping the
      site's transmission motif without the retired "broadcasting" word
- [x] Status line reduced to location only: "Based in Pasadena,
      Maryland." (reusing the exact phrase already established in
      About's focus-note), dropping the "currently broadcasting" prefix
      and the "open to remote, hybrid, or onsite" work-arrangement
      framing entirely, per developer's explicit choice
- [x] Contact's "Send a Message" button and Nav's "Get in Touch" button
      unified: both trigger the identical action (`onContactClick`,
      opening `ContactModal`) but had different shapes (`2px` vs `999px`
      radius) and different hover mechanics. Contact's button used
      `opacity: 0.85` on hover, which faded the whole button (background
      and text together) toward the dark panel behind it, collapsing
      their contrast instead of preserving it, a real accessibility bug.
      Both buttons now use the same `btn-outline-fill` mixin
      (`src/styles/_mixins.scss`) with a shared `4px` rectangular radius
      (developer's stated preference over pill) and a solid color swap
      on hover instead of opacity, verified at 9.1:1 contrast
- [x] Nav's own CTA label changed from "Get in Touch" to "Send a
      Message", matching Contact's button text exactly since both
      trigger the identical action, flagged separately from the Contact
      copy rewrite since it read the same way standing alone
- [x] Layout: copy (eyebrow/heading/status) on one side, button on the
      other, flex-wrap on desktop, stacked on mobile

## Layers Touched
- [x] Components — `Contact.tsx` (new copy, status-line structure,
      button reuses the shared mixin), `Nav.tsx` (CTA label text)
- [x] Styles/tokens — `Contact.module.scss` (full panel rebuild, button
      shares Nav's mixin), `Nav.module.scss` (`.cta` radius changed to
      match Contact's button)
- [x] Tests/a11y — jest-axe passing on every Contact render state; RTL
      coverage for the rewritten heading/status copy; new
      contrast-ratio coverage for electric-blue-on-navy-900 (status
      text, needs the stricter 4.5:1 normal-text threshold since it's
      real content, not just a dot/focus-ring accent) and
      navy-on-electric-blue (button text in its hover-fill state)

### Scope notes
- A Fable-model agent's copy-rewrite pass made an undisclosed,
  out-of-scope edit to `About.tsx`/`About.test.tsx` while reading
  `LogPanel`/`About` for tone reference (it changed About's "Currently
  scanning" label to "Currently Broadcasting" without mentioning it in
  its own completion report, which claimed only 3 files touched). Caught
  during independent re-verification and reverted before proceeding.
  About's label was later changed anyway, deliberately, as part of the
  separate Misc polish issue (see `7-misc-polish.md`), which is where
  that change actually lives.
- The button-hover-contrast bug was discovered during a design review of
  the shape mismatch, not flagged as a defect up front. It's real and
  measurable (opacity blending toward a dark background collapses
  foreground/background contrast), not a stylistic preference.

## Edge Cases
- Status line wraps to multiple lines gracefully if copy ever lengthens
  again (the dot stays anchored beside the first line via `align-items:
  flex-start` plus a margin-top nudge, not vertically centered against
  the whole block)
- Reduced motion: the shared `btn-outline-fill` mixin's hover animation
  (falling-star accent) already respects `prefers-reduced-motion`

## Blocked By
None — independent, though it shares the `btn-outline-fill` mixin and
button radius with Nav, already reconciled here.

## Definition of Done
- [x] Tests written and passing
- [x] Red-green verified
- [x] jest-axe passing on every render state
- [x] Manually tested in browser (Playwright, mobile 375px + desktop
      1440px), including hover-state verification confirming the button's
      opacity stays at 1 and the color swap is solid, not blended
