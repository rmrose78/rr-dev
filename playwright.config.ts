import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  // Running 4 Chrome instances in parallel on a dev machine causes real
  // CPU contention, which delays when animations actually attach to the
  // element. That races with the getAnimations() waits in a11y.spec.ts:
  // the check can run before the animation exists yet, so axe samples an
  // in-between paint frame and reports a false contrast violation. Serial
  // execution removes the race; this suite is small enough that the speed
  // cost doesn't matter.
  fullyParallel: false,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:5173',
    // The app reads prefers-reduced-motion (src/hooks/useReducedMotion.ts)
    // and this repo's own marquee/entrance animations respect it. Scanning
    // mid-animation samples partially-blended colors and produces false
    // contrast violations, so run the whole suite in the settled state.
    contextOptions: {
      reducedMotion: 'reduce',
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: true,
  },
})
