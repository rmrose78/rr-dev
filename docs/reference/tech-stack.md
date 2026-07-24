# Tech Stack

- React 19 + TypeScript + Vite 8
- SCSS modules — one `.module.scss` per component, no exceptions
- NO Tailwind — removed; was imported but had zero utility-class usage
  anywhere in the codebase. SCSS modules + `_variables.scss` tokens is the
  one settled design system for this project
- Radix UI for accessible primitives (Dialog, VisuallyHidden)
- Framer Motion for animations
- Jest + React Testing Library + jest-axe for tests and accessibility checks
- ESLint (flat config) + typescript-eslint + eslint-plugin-jsx-a11y for
  lint-time accessibility checks
- web3forms for contact form submission (`ContactModal.tsx`, direct fetch —
  only consumer, so it stays inline per `fe-standards.md`'s external-service
  rule; extract to `src/utils/` if a second consumer appears)

### Hosting
- Static SPA — no backend. Deploy target: check current `README.md` /
  hosting provider for the live deploy config.
