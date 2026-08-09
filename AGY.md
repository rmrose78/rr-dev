# AGY.md — rr-dev

Personal portfolio site for Ryan Rose, frontend developer. Read this before writing any code or making any decisions.

---

## Stack Declaration

**This project is frontend-only. It has no backend, and none is planned.** The site is built with React 18, TypeScript, Vite, and SCSS Modules.

## Global Workflow & Skills

Feature development follows the global AGY workflow:
`/1-grill-me` → `/2-to-prd` → `/3-to-issues` → `/4-tdd`

Global skills (`/1-grill-me`, `/2-to-prd`, `/3-to-issues`, `/4-tdd`, `/visual-check`, `/a11y-sweep`) are provided globally via `~/.gemini/config/skills` (linked to `my-agy-workflow`).

## Commands
- Start dev server: `npm run dev`
- Run unit/a11y tests: `npm test`
- Run tests (watch): `npm run test:watch`
- Lint: `npm run lint`
- Build: `npm run build`
- Format: `npm run format`
- Full pre-commit gate (build + lint + test): `npm run precommit`
- Real-browser accessibility sweep: `npm run test:a11y`
- Lighthouse accessibility check (dev server running): `npm run lighthouse:a11y`

## Critical Rules
- Never commit `.env` or `.env.local`
- **SCSS modules only** — no Tailwind, no inline styles. Design tokens defined in `src/styles/_variables.scss`.
- **Accessibility testing on every component**: Every new component with rendered markup gets a `jest-axe` test with assertions for each distinct render state.
- **Contrast enforcement**: Any text/background color pairing must be verified against `src/utils/contrast-ratio.ts` (4.5:1 for normal text, 3:1 for large text/interactive elements).
- **Testability as a design constraint**: Keep decision logic separate from I/O and animation side effects so core logic can be unit-tested without heavy mocking.
- **No em dashes** in copy, prose, or commit messages — use periods or commas.
- All AI-assisted feature work uses dedicated feature branches (`<issue-number>-<slug>`). Never implement directly on `main`.

---

## What This Project Is

A personal portfolio site for Ryan Rose showcasing frontend engineering expertise. Pitch: a frontend developer's site that reads as engineered, not templated — the site itself is evidence of how the developer builds things.

## Design & Above-The-Fold Guidelines

- Dark-mode first: Navy background (`#040d1a`), electric blue accents (`#38bdf8`), clean typography (Syne, DM Mono, DM Sans).
- The hero section is the first impression for hiring managers and recruiters. Every element must justify its presence.
