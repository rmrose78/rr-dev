import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import Projects from './Projects'

describe('Projects', () => {
  it('renders the section heading', () => {
    // Arrange & Act
    render(<Projects />)

    // Assert
    expect(
      screen.getByRole('heading', { name: /built, tested, shipped/i, level: 2 })
    ).toBeInTheDocument()
  })

  it('renders a meta-intro linking to the rr-dev repo, not as a project card', () => {
    // Arrange & Act
    render(<Projects />)

    // Assert
    expect(
      screen.getByText(/about this site/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/built to the same standard as the case studies below/i)
    ).toBeInTheDocument()
    const metaLink = screen.getByRole('link', { name: /view source on github/i })
    expect(metaLink).toHaveAttribute(
      'href',
      'https://github.com/rmrose78/rr-dev'
    )
    expect(metaLink).toHaveAttribute('target', '_blank')
    expect(metaLink).toHaveAttribute('rel', 'noreferrer')
  })

  it('renders both project card titles', () => {
    // Arrange & Act
    render(<Projects />)

    // Assert
    expect(screen.getByText('researchpulse')).toBeInTheDocument()
    expect(screen.getByText('elpa-website')).toBeInTheDocument()
    expect(screen.queryByText('rr-dev')).not.toBeInTheDocument()
  })

  it('links each card to both its live site and its repo', () => {
    // Arrange & Act
    render(<Projects />)

    // Assert
    const liveLinks = screen.getAllByRole('link', { name: /^view live site:/i })
    const liveHrefs = liveLinks.map((link) => link.getAttribute('href'))
    expect(liveHrefs).toEqual([
      'https://researchpulsehq.com/',
      'https://eaglelakepreservationalliance.netlify.app/',
    ])

    const sourceLinks = screen.getAllByRole('link', { name: /^view source:/i })
    const sourceHrefs = sourceLinks.map((link) => link.getAttribute('href'))
    expect(sourceHrefs).toEqual([
      'https://github.com/rmrose78/researchpulse',
      'https://github.com/rmrose78/elpa-website',
    ])
  })

  it('reverses the elpa-website card layout, not researchpulse', () => {
    // Arrange & Act
    const { container } = render(<Projects />)

    // Assert
    const reversedCards = container.querySelectorAll('.reverse')
    expect(reversedCards).toHaveLength(1)
    expect(reversedCards[0].textContent).toContain('elpa-website')
  })

  it('has no accessibility violations on default render', async () => {
    // Arrange
    const { container } = render(<Projects />)

    // Act
    const results = await axe(container)

    // Assert
    expect(results).toHaveNoViolations()
  })

  it('still renders both project cards when motion is not reduced', () => {
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
    render(<Projects />)

    // Assert
    expect(screen.getByText('researchpulse')).toBeInTheDocument()
    expect(screen.getByText('elpa-website')).toBeInTheDocument()
    jest.restoreAllMocks()
  })
})
