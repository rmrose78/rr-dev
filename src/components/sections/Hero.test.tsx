import { fireEvent, render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import Hero from './Hero'
import styles from './Hero.module.scss'

describe('Hero', () => {
  it('links out to GitHub and LinkedIn', () => {
    // Arrange & Act
    render(<Hero />)

    // Assert
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute(
      'href',
      'https://github.com/rmrose78'
    )
    expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/ryan-rose-272626170/'
    )
  })

  it('jumps to the projects section', () => {
    // Arrange & Act
    render(<Hero />)

    // Assert
    expect(
      screen.getByRole('link', { name: /jump to projects/i })
    ).toHaveAttribute('href', '#projects')
  })

  it('shows the scroll cue at the top of the page and hides it once scrolled', () => {
    // Arrange
    const { container } = render(<Hero />)
    const scrollCue = container.querySelector(`.${styles.scrollCue}`)
    expect(scrollCue).not.toHaveClass(styles.scrollCueHidden)

    // Act
    Object.defineProperty(window, 'scrollY', { value: 100, writable: true })
    fireEvent.scroll(window)

    // Assert
    expect(scrollCue).toHaveClass(styles.scrollCueHidden)
  })

  it('has no accessibility violations', async () => {
    // Arrange
    const { container } = render(<Hero />)

    // Act
    const results = await axe(container)

    // Assert
    expect(results).toHaveNoViolations()
  })

  it('still renders its content when motion is not reduced', () => {
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
    render(<Hero />)

    // Assert
    expect(
      screen.getByRole('link', { name: /jump to projects/i })
    ).toBeInTheDocument()
    jest.restoreAllMocks()
  })
})
