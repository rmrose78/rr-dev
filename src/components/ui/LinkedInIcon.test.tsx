import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import LinkedInIcon from './LinkedInIcon'

describe('LinkedInIcon', () => {
  it('has no accessibility violations as a decorative icon', async () => {
    // Arrange
    const { container } = render(<LinkedInIcon />)

    // Act
    const results = await axe(container)

    // Assert
    expect(results).toHaveNoViolations()
  })

  it('is hidden from assistive technology', () => {
    // Arrange
    const { container } = render(<LinkedInIcon />)

    // Assert
    expect(container.querySelector('svg')).toHaveAttribute(
      'aria-hidden',
      'true'
    )
  })
})
