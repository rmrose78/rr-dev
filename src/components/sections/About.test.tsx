import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import About from './About'

describe('About', () => {
  it('renders the section heading and all stat cards', () => {
    // Arrange & Act
    render(<About />)

    // Assert
    expect(
      screen.getByRole('heading', { name: /building things/i })
    ).toBeInTheDocument()
    expect(screen.getByText('Production Experience')).toBeInTheDocument()
    expect(screen.getByText('Education')).toBeInTheDocument()
    expect(screen.getByText('Veteran')).toBeInTheDocument()
    expect(screen.getByText('Prior Clearance')).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    // Arrange
    const { container } = render(<About />)

    // Act
    const results = await axe(container)

    // Assert
    expect(results).toHaveNoViolations()
  })
})
