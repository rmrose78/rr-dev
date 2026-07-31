import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import About from './About'
import styles from './About.module.scss'

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
    expect(screen.getByText('Ground station')).toBeInTheDocument()
    expect(screen.getByText('Education')).toBeInTheDocument()
    expect(screen.getByText('Service')).toBeInTheDocument()
  })

  it('renders the Dispatch bio before the Ground station focus-note', () => {
    // Arrange & Act
    render(<About />)

    // Assert
    const dispatch = screen.getByText('Dispatch')
    const focusNote = screen.getByText('Ground station')
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

  it('starts panels in the pre-animation hidden state when motion is not reduced', () => {
    // Arrange -- content being present doesn't depend on this prop at all
    // (same JSX either way), so assert on the actual initial style Framer
    // Motion applies instead: the "hidden" variant (opacity: 0,
    // translateY) vs. the reduced-motion default of "visible" (opacity:
    // 1, no transform).
    jest.spyOn(window, 'matchMedia').mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }))

    // Act
    const { container } = render(<About />)

    // Assert
    const col = container.querySelector(`.${styles.col}`)
    expect(col).toHaveStyle({ opacity: '0' })
    jest.restoreAllMocks()
  })
})
