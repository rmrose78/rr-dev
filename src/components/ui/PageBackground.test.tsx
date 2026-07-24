import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import PageBackground from './PageBackground'

describe('PageBackground', () => {
  it('is hidden from assistive technology as a decorative element', () => {
    // Arrange
    const { container } = render(<PageBackground />)

    // Assert
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true')
  })

  it('has no accessibility violations', async () => {
    // Arrange
    const { container } = render(<PageBackground />)

    // Act
    const results = await axe(container)

    // Assert
    expect(results).toHaveNoViolations()
  })
})
