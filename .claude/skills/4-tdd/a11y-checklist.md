# Accessibility Checklist — WCAG 2.1 AA

Run through this before writing any frontend tests.
Every item must pass before committing.

IMPORTANT: this site publicly claims WCAG 2.1 AA compliance in its README —
treat every item here as a real commitment, not a nice-to-have.

## Semantic HTML
- [ ] Correct elements used — `nav`, `main`, `section`, `button`, `input`
- [ ] No `div` used where a semantic element exists
- [ ] Heading hierarchy is logical — h1 → h2 → h3, never skipped

## Landmarks
- [ ] `<nav>` wraps navigation
- [ ] `<main>` wraps primary content — only one per page
- [ ] Every `<section>` has `aria-labelledby` pointing to its heading id
- [ ] Skip to content link is first focusable element on page

## Interactive Elements
- [ ] Every icon-only button has `aria-label`
- [ ] Every form input has explicit `<label>` with matching `htmlFor`/`id`
- [ ] All interactive elements reachable by Tab key
- [ ] Tab order is logical — follows visual reading order
- [ ] Enter and Space activate buttons
- [ ] Escape closes modals and dropdowns
- [ ] `<nav>` is wrapped in `<header>` landmark
- [ ] Brand/logo links to home with aria-label
- [ ] Skip link is visually hidden until focused — not display:none
- [ ] `<html lang="en">` present in index.html

## Focus
- [ ] `:focus-visible` styles defined and visible
- [ ] Focus never trapped outside a modal
- [ ] Modal returns focus to trigger element on close

## Dynamic Content
- [ ] Loading states announced — use `aria-live="polite"` or `role="status"`
- [ ] Error messages use `role="alert"` for immediate announcement
- [ ] Dynamic content changes announced — `aria-live="polite"` where relevant

## Color and Contrast
- [ ] Text contrast ratio minimum 4.5:1 against background (verify against
      `src/styles/_variables.scss` tokens, not by eye — see the automated
      contrast-ratio test in `src/utils/contrast-ratio.test.ts`)
- [ ] Interactive element contrast minimum 3:1
- [ ] Information never conveyed by color alone

## Images and Icons
- [ ] Decorative images have `aria-hidden="true"`
- [ ] Informative images have descriptive `alt` text
- [ ] SVG icons used as buttons have `aria-label` on the button

## Animations
- [ ] All animations respect `prefers-reduced-motion`
- [ ] No content flashes more than 3 times per second
