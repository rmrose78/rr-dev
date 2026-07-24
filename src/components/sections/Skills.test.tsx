import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import Skills from './Skills'

describe('Skills', () => {
  it('renders every skill group as a labeled list', () => {
    // Arrange & Act
    render(<Skills />)

    // Assert
    expect(
      screen.getByRole('list', { name: /core frontend skills/i })
    ).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    // Arrange
    const { container } = render(<Skills />)

    // Act
    const results = await axe(container)

    // Assert
    expect(results).toHaveNoViolations()
  })
})
