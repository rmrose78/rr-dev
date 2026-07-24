import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import Experience from './Experience'

describe('Experience', () => {
  it('renders every role in the timeline', () => {
    // Arrange & Act
    render(<Experience />)

    // Assert
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument()
    expect(screen.getByText('Validation Engineer')).toBeInTheDocument()
    expect(
      screen.getByText('Human Intelligence Collector (35M)')
    ).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    // Arrange
    const { container } = render(<Experience />)

    // Act
    const results = await axe(container)

    // Assert
    expect(results).toHaveNoViolations()
  })
})
