import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import About from './About'

describe('About', () => {
  it('renders the section heading, Dispatch and Stack panels, and both compact stat cards', () => {
    // Arrange & Act
    render(<About />)

    // Assert
    expect(
      screen.getByRole('heading', { name: /the signal so far/i })
    ).toBeInTheDocument()
    expect(screen.getByText('Dispatch')).toBeInTheDocument()
    expect(screen.getByText('Stack')).toBeInTheDocument()
    expect(screen.getByText('Currently scanning')).toBeInTheDocument()
    expect(screen.getByText('Education')).toBeInTheDocument()
    expect(screen.getByText('Service')).toBeInTheDocument()
  })

  it('renders the Dispatch bio before the Currently scanning focus-note', () => {
    // Arrange & Act
    render(<About />)

    // Assert
    const dispatch = screen.getByText('Dispatch')
    const focusNote = screen.getByText('Currently scanning')
    expect(
      dispatch.compareDocumentPosition(focusNote) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy()
  })

  it('drops Production Experience and Prior Clearance as their own stat tiles', () => {
    // Arrange & Act
    render(<About />)

    // Assert
    expect(screen.queryByText('Production Experience')).not.toBeInTheDocument()
    expect(screen.queryByText('Prior Clearance')).not.toBeInTheDocument()
  })

  it('renders the Stack panel skill groups', () => {
    // Arrange & Act
    render(<About />)

    // Assert
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(
      screen.getByRole('list', { name: /core frontend skills/i })
    ).toBeInTheDocument()
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
