import { test, expect } from '@playwright/test'

const MOBILE_VIEWPORT = { width: 375, height: 812 }

test('mobile nav menu is visible again after closing via a section link and reopening (issue #25 regression)', async ({
  page,
}) => {
  // Arrange
  await page.setViewportSize(MOBILE_VIEWPORT)
  await page.goto('/')
  const toggle = page.getByRole('button', { name: 'Toggle navigation menu' })
  const mobileMenu = page.getByRole('navigation', { name: 'Mobile navigation' })

  // Act — open the menu, click a section link (scrolls the page and closes
  // the menu), then reopen it. The bug: .mobileMenu used
  // `position: absolute; inset: 0`, anchoring to the top of the document
  // rather than the viewport. Correct only at scroll position 0 — after
  // scrolling to a section, reopening rendered the menu off-screen above
  // the current viewport.
  await toggle.click()
  await mobileMenu.getByRole('link', { name: 'Projects' }).click()
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBeGreaterThan(0)
  await toggle.click()

  // Assert
  await expect(mobileMenu).toBeInViewport()
})
