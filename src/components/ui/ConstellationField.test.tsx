import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import ConstellationField from './ConstellationField'
import styles from './ConstellationField.module.scss'

describe('ConstellationField', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('has no accessibility violations', async () => {
    // Arrange
    const { container } = render(<ConstellationField />)

    // Act
    const results = await axe(container)

    // Assert
    expect(results).toHaveNoViolations()
  })

  it('renders all 6 clusters', () => {
    // Arrange & Act
    const { container } = render(<ConstellationField />)

    // Assert
    expect(container.querySelectorAll(`.${styles.cluster}`)).toHaveLength(6)
  })

  it('disables animation under prefers-reduced-motion (the test default)', () => {
    // Arrange & Act
    const { container } = render(<ConstellationField />)

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
    const { container } = render(<ConstellationField />)

    // Assert
    expect(container.firstChild).not.toHaveClass(styles.reducedMotion)
  })
})
