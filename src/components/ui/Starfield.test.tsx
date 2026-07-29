import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import Starfield from './Starfield'
import styles from './Starfield.module.scss'

describe('Starfield', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('has no accessibility violations', async () => {
    // Arrange
    const { container } = render(<Starfield />)

    // Act
    const results = await axe(container)

    // Assert
    expect(results).toHaveNoViolations()
  })

  it('renders every star and shooting star transcribed from the mockup', () => {
    // Arrange & Act
    const { container } = render(<Starfield />)

    // Assert
    expect(container.querySelectorAll(`.${styles.star}`)).toHaveLength(132)
    expect(container.querySelectorAll(`.${styles.shootingStar}`)).toHaveLength(9)
  })

  it('disables animation under prefers-reduced-motion (the test default)', () => {
    // Arrange & Act
    const { container } = render(<Starfield />)

    // Assert
    expect(container.firstChild).toHaveClass(styles.reducedMotion)
  })

  it('enables animation when motion is not reduced', () => {
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
    const { container } = render(<Starfield />)

    // Assert
    expect(container.firstChild).not.toHaveClass(styles.reducedMotion)
  })
})
