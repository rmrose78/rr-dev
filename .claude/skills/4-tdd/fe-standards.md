# Frontend Standards — rr-dev

Read this before writing any component.

## Stack
- React 19 + TypeScript + Vite 8
- SCSS modules — one `.module.scss` per component, no exceptions
- NO Tailwind — pure SCSS only (settled design-system decision, see
  CLAUDE.md Critical Rules)
- Radix UI for accessible primitives
- Framer Motion for animations
- Jest + React Testing Library + jest-axe for tests

## Component Conventions
- File naming: kebab-case (`stat-card.tsx`) or PascalCase to match existing
  components in this repo — match whatever convention the sibling files in
  the same folder already use
- Component naming: PascalCase (`StatCard`, `ContactModal`)
- One component per file
- Props interface typed explicitly above component
- Default export for components, named exports for hooks and utils

```tsx
interface StatCardProps {
  label: string
  value: string
}

export default function StatCard({ label, value }: StatCardProps) {
  ...
}
```

## SCSS Modules
- One `.module.scss` per component, lives next to the component file
- camelCase class names — no BEM, modules handle scoping
- No inline styles ever
- Every module starts with:

```scss
@use '@/styles/_variables.scss' as *;
@use '@/styles/_mixins.scss' as *;
```

## Mobile-First
Always min-width, never max-width:

```scss
.element {
  padding: 1rem;        // mobile base
  @include desktop {
    padding: 3rem;      // desktop override
  }
}
```

## TypeScript
- Use `interface` for objects that might be extended
- Use `type` for unions and aliases
- Never use `any` — use `unknown` or proper typing
- Type event handlers explicitly:

```tsx
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {}
const handleSubmit = (e: React.FormEvent) => {}
```

## Testing
- Red-green applies to every test you write, not just `/4-tdd` feature
  builds: after writing an assertion, temporarily break the behavior it
  claims to cover, confirm the test fails for that reason, then restore
  and confirm it passes. A test that's never been red is unverified —
  it could be passing vacuously (weak selector, wrong assertion) and
  there'd be no way to know
- This applies just as much when backfilling tests onto already-shipped
  code (increasing coverage, not building a new feature) as it does to
  a fresh `/4-tdd` build — it's just as easy to write a vacuous test
  against existing code as against new code

## External Service Calls
- If a component talks to a third-party service (e.g. a form submission
  endpoint), keep the call scoped to that component if it's the only
  consumer — but never inline the same integration in more than one place.
  If a second component needs it, extract it to `src/utils/` first
- Never hardcode secrets — read from `import.meta.env.VITE_*`

## Framer Motion
Define variants outside components:

```tsx
const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
} as const
```

Always respect reduced motion — use the existing `useReducedMotion` hook:

```tsx
const reduced = useReducedMotion()
<motion.div
  variants={fadeIn}
  initial={reduced ? 'visible' : 'hidden'}
  animate="visible"
>
```

**Stateful async processes** (animation loops, retry sequences,
multi-step flows) need their state-transition logic kept separate from
the side-effecting calls that drive it. If a hook decides what happens
next by directly `await`ing an animation promise (e.g. a loop that
awaits `controls.start()` to know when to move to the next phase), the
state machine and the animation execution become inseparable — and
untestable without mocking Framer Motion's internals, which breaks
easily (`AnimationControls` isn't a plain value; other props on the
same element depend on its real shape). Prefer: a pure function that
answers "given the current phase and this event, what's the next
phase," with a thin effect layer that calls `controls.start()`/`.stop()`
in response. The pure part is trivially unit-testable with zero
mocking; the thin part is left to a smoke test. `useMarquee`'s
`autoScroll`/`resumeScroll` mix the two — most of that hook is still
untested for exactly this reason.

## States Every Component With Async Behavior Must Handle
- Loading — skeleton or spinner
- Empty — friendly message, not blank
- Error — distinct message with retry or fallback action
- Success — the actual content

## Folder Structure
```
src/
  components/
    layout/     # Nav, Footer
    sections/   # Hero, About, Skills, Experience, Testimonials, Contact
    ui/         # Modal, StatCard, icons — reusable primitives
  hooks/        # Custom React hooks
  styles/       # globals.scss, _variables.scss, _mixins.scss
  types/        # Shared TypeScript interfaces
  utils/        # pure helper functions and shared service calls
  assets/
```
