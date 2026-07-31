import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import Contact from './Contact'
import styles from './Contact.module.scss'

describe('Contact', () => {
  it('calls onContactClick when the send-a-message button is clicked', async () => {
    // Arrange
    const user = userEvent.setup()
    const onContactClick = jest.fn()
    render(<Contact onContactClick={onContactClick} />)

    // Act
    await user.click(screen.getByRole('button', { name: /send a message/i }))

    // Assert
    expect(onContactClick).toHaveBeenCalledTimes(1)
  })

  it('renders the heading and location status line', () => {
    // Arrange & Act
    render(<Contact onContactClick={jest.fn()} />)

    // Assert
    expect(
      screen.getByRole('heading', {
        name: /have a project in mind\?/i,
        level: 2,
      })
    ).toBeInTheDocument()
    expect(screen.getByText(/based in pasadena, maryland/i)).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    // Arrange
    const { container } = render(<Contact onContactClick={jest.fn()} />)

    // Act
    const results = await axe(container)

    // Assert
    expect(results).toHaveNoViolations()
  })

  it('starts in the pre-animation hidden state when motion is not reduced', () => {
    // Arrange -- content being present doesn't depend on this prop at all
    // (same JSX either way), so assert on the actual initial style Framer
    // Motion applies instead.
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
    const { container } = render(<Contact onContactClick={jest.fn()} />)

    // Assert
    expect(container.querySelector(`.${styles.section}`)).toHaveStyle({
      opacity: '0',
    })
    jest.restoreAllMocks()
  })
})
