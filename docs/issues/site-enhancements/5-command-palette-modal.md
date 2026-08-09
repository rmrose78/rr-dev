# Issue 5: Build Cmd+K Command Palette Modal

## What
Build a keyboard-accessible Command Palette Modal (`CommandPaletteModal.tsx`) triggered via `Cmd+K` / `Ctrl+K` or search button to allow visitors to quickly jump between site sections (#hero, #about, #projects, #testimonials, #contact) and launch project repository/live links.

## Why
Delivers a state-of-the-art interactive feature commonly found in high-end dev tools, showcasing advanced React keyboard event handling, focus trapping, and accessibility.

## Acceptance Criteria
- [ ] Pressing `Cmd+K` / `Ctrl+K` or clicking search icon opens `CommandPaletteModal`.
- [ ] Type-to-filter sections and project links with arrow key navigation and `Enter` key execution.
- [ ] Accessible modal dialog: focus trapped, closes on `Esc` key or backdrop click, restores focus.
- [ ] `CommandPaletteModal.test.tsx` passes unit and `jest-axe` tests.

## Layers Touched
- [ ] Frontend — `src/components/ui/CommandPaletteModal.tsx`, `src/components/ui/CommandPaletteModal.module.scss`, `src/components/layout/Nav.tsx`
- [ ] Tests/a11y — `src/components/ui/CommandPaletteModal.test.tsx`

## Edge Cases
- ESC key pressed when open -> closes modal.
- Search input empty -> displays default section shortcuts.

## Blocked By
- None.

## Definition of Done
- [ ] Implementation complete per AGY.md
- [ ] Unit tests passing (`npm test`)
- [ ] Red-green TDD verified
- [ ] jest-axe passing on every distinct render state
