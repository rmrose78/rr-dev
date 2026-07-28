import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import App from './App'

describe('App', () => {
  it('renders a skip link as the first focusable element', () => {
    // Arrange & Act
    render(<App />)

    // Assert
    expect(
      screen.getByRole('link', { name: /skip to main content/i })
    ).toHaveAttribute('href', '#main-content')
  })

  it('renders exactly one main landmark containing every section', () => {
    // Arrange & Act
    render(<App />)

    // Assert
    expect(screen.getAllByRole('main')).toHaveLength(1)
    expect(
      screen.getByRole('heading', { name: /the signal so far/i })
    ).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    // Arrange
    const { container } = render(<App />)

    // Act
    const results = await axe(container)

    // Assert
    expect(results).toHaveNoViolations()
  })
})
