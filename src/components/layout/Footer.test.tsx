import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import Footer from './Footer'

describe('Footer', () => {
  it('renders links to GitHub and LinkedIn', () => {
    // Arrange & Act
    render(<Footer />)

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

  it('renders the Dune quote', () => {
    // Arrange & Act
    render(<Footer />)

    // Assert
    expect(
      screen.getByText(/fear is the mind-killer/i)
    ).toBeInTheDocument()
    expect(screen.getByText('Frank Herbert, Dune')).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    // Arrange
    const { container } = render(<Footer />)

    // Act
    const results = await axe(container)

    // Assert
    expect(results).toHaveNoViolations()
  })
})
