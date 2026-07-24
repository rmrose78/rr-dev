# Tech Stack

- React 19 + TypeScript + Vite 8
- SCSS modules — one `.module.scss` per component, no exceptions
- NO Tailwind — removed; was imported but had zero utility-class usage
  anywhere in the codebase. SCSS modules + `_variables.scss` tokens is the
  one settled design system for this project
- Radix UI for accessible primitives (Dialog, VisuallyHidden)
- Framer Motion for animations
- Jest + React Testing Library + jest-axe for tests and accessibility checks
  (runs under jsdom — no real paint/layout, so color contrast isn't
  reliably checked here)
- ESLint (flat config) + typescript-eslint + eslint-plugin-jsx-a11y for
  lint-time accessibility checks
- Playwright + `@axe-core/playwright` (`e2e/a11y.spec.ts`, `npm run
  test:a11y`) for real-browser accessibility checks — catches color
  contrast for real (reads painted pixels, not jsdom) and whole-page
  composition issues jest-axe's per-component isolation can't (duplicate
  ids, landmark conflicts, heading hierarchy across sections). Uses the
  system Chrome via Playwright's `channel: 'chrome'`, not Playwright's own
  bundled Chromium build (unsupported on macOS 13 as of Playwright 1.62)
- Lighthouse (`npm run lighthouse:a11y`) as a supplementary accessibility
  check — its a11y category is itself axe-core-based, so treat it as
  occasional/trend tracking (numeric score, tap-target size, viewport meta),
  not the primary mechanism
- web3forms for contact form submission (`ContactModal.tsx`, direct fetch —
  only consumer, so it stays inline per `fe-standards.md`'s external-service
  rule; extract to `src/utils/` if a second consumer appears)

### Hosting
- Static SPA — no backend. Deploy target: check current `README.md` /
  hosting provider for the live deploy config.
