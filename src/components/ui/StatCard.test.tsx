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

  it('has no accessibility violations', async () => {
    // Arrange
    const { container } = render(
      <StatCard label="Education" value="B.S." sub="UTSA 2020" />
    )

    // Act
    const results = await axe(container)

    // Assert
    expect(results).toHaveNoViolations()
  })
})
