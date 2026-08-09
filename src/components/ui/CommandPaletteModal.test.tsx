import { fireEvent, render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import CommandPaletteModal from './CommandPaletteModal'

describe('CommandPaletteModal', () => {
  const props = {
    isOpen: true,
    onClose: jest.fn(),
  }

  it('renders open command palette modal with commands list', () => {
    // Arrange & Act
    render(<CommandPaletteModal {...props} />)

    // Assert
    expect(
      screen.getByRole('dialog', { name: /command palette quick navigation/i })
    ).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/type a command or search/i)).toBeInTheDocument()
    expect(screen.getByText('Hero Section')).toBeInTheDocument()
  })

  it('filters commands when typing in search input', () => {
    // Arrange
    render(<CommandPaletteModal {...props} />)

    // Act
    fireEvent.change(screen.getByPlaceholderText(/type a command or search/i), {
      target: { value: 'ResearchPulse' },
    })

    // Assert
    expect(screen.getByText('ResearchPulse (Live Site)')).toBeInTheDocument()
    expect(screen.queryByText('Hero Section')).not.toBeInTheDocument()
  })

  it('calls onClose when Escape key is pressed', () => {
    // Arrange
    const handleClose = jest.fn()
    render(<CommandPaletteModal {...props} onClose={handleClose} />)

    // Act
    fireEvent.keyDown(window, { key: 'Escape' })

    // Assert
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('has no accessibility violations when open', async () => {
    // Arrange
    const { container } = render(<CommandPaletteModal {...props} />)

    // Act
    const results = await axe(container)

    // Assert
    expect(results).toHaveNoViolations()
  })
})
