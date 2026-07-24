import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const VIEWPORTS = {
  mobile: { width: 375, height: 812 },
  desktop: { width: 1440, height: 900 },
}

for (const [name, viewport] of Object.entries(VIEWPORTS)) {
  test(`homepage has no accessibility violations (${name})`, async ({
    page,
  }) => {
    // Arrange
    await page.setViewportSize(viewport)
    await page.goto('/')

    // Act
    const results = await new AxeBuilder({ page }).analyze()

    // Assert
    expect(results.violations).toEqual([])
  })
}

test('mobile nav menu open has no accessibility violations', async ({
  page,
}) => {
  // Arrange
  await page.setViewportSize(VIEWPORTS.mobile)
  await page.goto('/')

  // Act
  await page.getByRole('button', { name: 'Toggle navigation menu' }).click()
  const results = await new AxeBuilder({ page }).analyze()

  // Assert
  expect(results.violations).toEqual([])
})

test('contact modal open has no accessibility violations', async ({
  page,
}) => {
  // Arrange
  await page.setViewportSize(VIEWPORTS.desktop)
  await page.goto('/')
  await page.getByRole('button', { name: 'Open Contact Form' }).click()
  const dialog = page.getByRole('dialog')
  await dialog.waitFor()
  // Wait out the modal's fade-in transition (including the nested content
  // motion.div, not just the dialog wrapper — scanning mid-animation samples
  // partially-blended colors and produces false contrast violations).
  await dialog.evaluate((el) =>
    Promise.all(
      el.getAnimations({ subtree: true }).map((a) => a.finished)
    )
  )

  // Act
  const results = await new AxeBuilder({ page }).analyze()

  // Assert
  expect(results.violations).toEqual([])
})
