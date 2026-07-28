import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import SectionDivider from './SectionDivider'
import styles from './SectionDivider.module.scss'

describe('SectionDivider', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('is hidden from assistive technology as a decorative element', () => {
    // Arrange
    const { container } = render(<SectionDivider />)

    // Assert
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true')
  })

  it('has no accessibility violations', async () => {
    // Arrange
    const { container } = render(<SectionDivider />)

    // Act
    const results = await axe(container)

    // Assert
    expect(results).toHaveNoViolations()
  })

  it('applies the compact modifier class when requested', () => {
    // Arrange & Act
    const { container } = render(<SectionDivider compact />)

    // Assert
    expect(container.firstChild).toHaveClass(styles.compact)
  })

  it('disables the orbit animation under prefers-reduced-motion (the test default)', () => {
    // Arrange & Act
    const { container } = render(<SectionDivider />)

    // Assert
    expect(container.querySelector('svg')).toHaveClass(styles.reducedMotion)
  })

  it('enables the orbit animation when motion is not reduced', () => {
    // Arrange
    jest.spyOn(window, 'matchMedia').mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }))

    // Act
    const { container } = render(<SectionDivider />)

    // Assert
    expect(container.querySelector('svg')).not.toHaveClass(styles.reducedMotion)
  })
})
