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

  it('renders the updated story-driven bio text', () => {
    // Arrange & Act
    render(<Hero />)

    // Assert
    expect(
      screen.getByText(
        /Software Engineer building responsive, accessible/i
      )
    ).toBeInTheDocument()
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

  it('starts staggered content in the pre-animation hidden state when motion is not reduced', () => {
    // Arrange -- content being present doesn't depend on this prop at all
    // (same JSX either way), so assert on the actual initial style Framer
    // Motion applies instead. The container's own "hidden" variant is
    // empty (it only carries the stagger timing), so the observable
    // difference shows up on a staggered child instead.
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
    const { container } = render(<Hero />)

    // Assert
    expect(container.querySelector(`.${styles.eyebrow}`)).toHaveStyle({
      opacity: '0',
    })
    jest.restoreAllMocks()
  })
})
