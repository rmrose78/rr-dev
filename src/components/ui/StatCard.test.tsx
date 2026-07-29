import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import StatCard from './StatCard'

describe('StatCard', () => {
  it('renders the label, value, and sub text', () => {
    // Arrange & Act
    render(<StatCard label="Education" value="B.S." sub="UTSA 2020" />)

    // Assert
    expect(screen.getByText('Education')).toBeInTheDocument()
    expect(screen.getByText('B.S.')).toBeInTheDocument()
    expect(screen.getByText('UTSA 2020')).toBeInTheDocument()
  })

  it('renders the compact variant', () => {
    // Arrange & Act
    render(<StatCard label="Education" value="B.S." sub="UTSA 2020" compact />)

    // Assert
    expect(screen.getByText('Education')).toBeInTheDocument()
    expect(screen.getByText('B.S.')).toBeInTheDocument()
  })

  it('has no accessibility violations, default and compact', async () => {
    // Arrange
    const { container, rerender } = render(
      <StatCard label="Education" value="B.S." sub="UTSA 2020" />
    )

    // Act
    const defaultResults = await axe(container)

    // Assert
    expect(defaultResults).toHaveNoViolations()

    // Act
    rerender(
      <StatCard label="Education" value="B.S." sub="UTSA 2020" compact />
    )
    const compactResults = await axe(container)

    // Assert
    expect(compactResults).toHaveNoViolations()
  })
})
