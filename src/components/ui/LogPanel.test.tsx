import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import LogPanel from './LogPanel'

describe('LogPanel', () => {
  it('renders the label and body content', () => {
    // Arrange & Act
    render(<LogPanel label="Dispatch">Body copy</LogPanel>)

    // Assert
    expect(screen.getByText('Dispatch')).toBeInTheDocument()
    expect(screen.getByText('Body copy')).toBeInTheDocument()
  })

  it('renders a footer when provided, and omits it when not', () => {
    // Arrange & Act
    const { rerender } = render(
      <LogPanel label="Dispatch" footer="STATUS: TRANSMITTING">
        Body copy
      </LogPanel>
    )

    // Assert
    expect(screen.getByText('STATUS: TRANSMITTING')).toBeInTheDocument()

    // Act
    rerender(<LogPanel label="Stack">Body copy</LogPanel>)

    // Assert
    expect(screen.queryByText('STATUS: TRANSMITTING')).not.toBeInTheDocument()
  })

  it('has no accessibility violations, with or without a footer', async () => {
    // Arrange
    const { container, rerender } = render(
      <LogPanel label="Dispatch" footer="STATUS: TRANSMITTING">
        Body copy
      </LogPanel>
    )

    // Act
    const withFooterResults = await axe(container)

    // Assert
    expect(withFooterResults).toHaveNoViolations()

    // Act
    rerender(<LogPanel label="Stack">Body copy</LogPanel>)
    const withoutFooterResults = await axe(container)

    // Assert
    expect(withoutFooterResults).toHaveNoViolations()
  })
})
