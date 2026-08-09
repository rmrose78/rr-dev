# Issue 1: Update Hero and About Bio Copy

## What
Update the bio copy across `Hero.tsx` and `About.tsx` to reflect Ryan Rose's authentic career trajectory (Army veteran ➔ Biomedical Engineering at UTSA ➔ #VetsWhoCode ➔ Professional FE Software Engineer specializing in AI workflow optimization).

## Why
Ensures the portfolio's messaging is compelling, story-driven, non-AI-sounding, professional, and accurate.

## Acceptance Criteria
- [ ] `Hero.tsx` renders updated bio: "U.S. Army veteran and Biomedical Engineering graduate turned Frontend Software Engineer. I build responsive, accessible React and TypeScript applications while leveraging cutting-edge AI workflows to deliver fast, high-quality software."
- [ ] `About.tsx` renders updated Dispatch bio: "After serving in the U.S. Army, I earned my Biomedical Engineering degree at UTSA, where I discovered a passion for coding and building software. Self-paced guidance through #VetsWhoCode helped launch my career into frontend development. Since then, I've worked professionally as a Frontend Software Engineer, constantly refining my craft and optimizing AI-assisted workflows to stay at the forefront of modern web engineering."
- [ ] Zero em dashes in copy.
- [ ] All unit and `jest-axe` accessibility tests pass (`Hero.test.tsx`, `About.test.tsx`).

## Layers Touched
- [ ] Frontend — `src/components/sections/Hero.tsx`, `src/components/sections/About.tsx`
- [ ] Tests/a11y — `src/components/sections/Hero.test.tsx`, `src/components/sections/About.test.tsx`

## Edge Cases
- Mobile viewport wrapping — text wraps cleanly without awkward line breaks.

## Blocked By
- None.

## Definition of Done
- [ ] Implementation complete per AGY.md
- [ ] Unit tests passing (`npm test`)
- [ ] Red-green TDD verified
- [ ] jest-axe passing on every distinct render state
