import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import EmailIcon from './EmailIcon'

describe('EmailIcon', () => {
  it('has no accessibility violations as a decorative icon', async () => {
    // Arrange
    const { container } = render(<EmailIcon />)

    // Act
    const results = await axe(container)

    // Assert
    expect(results).toHaveNoViolations()
  })

  it('is hidden from assistive technology', () => {
    // Arrange
    const { container } = render(<EmailIcon />)

    // Assert
    expect(container.querySelector('svg')).toHaveAttribute(
      'aria-hidden',
      'true'
    )
  })
})
