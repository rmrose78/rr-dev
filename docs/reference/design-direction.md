# Design Direction

Tone: Technical, precise, dark-mode-first. A frontend developer's site —
should read as engineered, not templated.

Primary palette (from `src/styles/_variables.scss`, single source of truth
— never hardcode a hex value in a component, reference the SCSS variable):
- Navy `#040d1a` ($navy) — primary background
- Navy 900 `#071428` / Navy 800 `#0c2040` / Navy 700 `#0f2d57` — layered
  card/section backgrounds, darkest to lightest
- White `#ffffff` ($white) — primary text on navy
- Text secondary `#8ab4cc` ($text-secondary) — supporting text, 8.8:1 on navy
- Text muted `#6690b5` ($text-muted) — least prominent text, 5.77:1 on navy
  (corrected from #4a6b8a, which measured 3.49:1 and failed WCAG AA 4.5:1)
- Electric blue `#38bdf8` ($electric-blue) — primary accent, links, focus rings
- Teal `#64e4c8` ($teal) — secondary accent
- Gray scale `#94a3b8` / `#475569` / `#1e293b` / `#0f172a` — utility grays

Typography:
- Heading: Syne
- Mono: DM Mono
- Body: DM Sans

Spacing (from `_variables.scss`):
- Section padding — mobile `1.25rem` / desktop `3rem` (horizontal),
  mobile `4.5rem` / desktop `7rem` (vertical)
- Breakpoints — `$bp-sm: 480px`, `$bp-md: 768px`

Transitions: `$transition-base: 200ms ease`, `$transition-slow: 400ms ease`

Component feel:
- Full-viewport sections, generous vertical rhythm
- Framer Motion for entrance animation, always gated behind
  `useReducedMotion()`
- `:focus-visible` outline in `$electric-blue`

## Contrast rule

Every new text/background color pairing must be checked against
`src/utils/contrast-ratio.ts` before shipping — 4.5:1 minimum for normal
text, 3:1 for large text (18px+/bold 14px+) and interactive elements. Don't
eyeball it; the automated test in `src/utils/design-tokens.contrast.test.ts`
is the source of truth.

## Above-the-fold priority

The hero section is the first thing a hiring manager or recruiter sees.
Every element competing for that space needs to justify itself against:
does this help someone decide "worth a closer look" in the first few
seconds? Decorative flourishes that don't serve that goal are candidates
for trimming — this was flagged as a real weakness (space not selling the
developer) and should be treated as a standing constraint on new hero/
above-the-fold work, not just a one-time fix.
