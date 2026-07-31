import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import ContactModal from './ContactModal'

async function fillOutForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/name/i), 'Jerome')
  await user.type(screen.getByLabelText(/email/i), 'jerome@example.com')
  await user.type(screen.getByLabelText(/message/i), 'Hello there')
}

describe('ContactModal', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('shows an error and does not submit when required fields are empty', async () => {
    // Arrange
    const user = userEvent.setup()
    render(<ContactModal open onClose={jest.fn()} />)

    // Act
    await user.click(screen.getByRole('button', { name: /send message/i }))

    // Assert
    expect(
      await screen.findByText(/please fill out all fields/i)
    ).toBeInTheDocument()
    expect(global.fetch).not.toHaveBeenCalled()
  })

  it('shows a success message after a successful submission', async () => {
    // Arrange
    ;(global.fetch as jest.Mock).mockResolvedValue({
      json: async () => ({ success: true }),
    })
    const user = userEvent.setup()
    render(<ContactModal open onClose={jest.fn()} />)
    await fillOutForm(user)

    // Act
    await user.click(screen.getByRole('button', { name: /send message/i }))

    // Assert
    expect(await screen.findByText(/message sent/i)).toBeInTheDocument()
  })

  it('shows an error message when the submission fails', async () => {
    // Arrange
    ;(global.fetch as jest.Mock).mockRejectedValue(new Error('network error'))
    const user = userEvent.setup()
    render(<ContactModal open onClose={jest.fn()} />)
    await fillOutForm(user)

    // Act
    await user.click(screen.getByRole('button', { name: /send message/i }))

    // Assert
    expect(
      await screen.findByText(/something went wrong/i)
    ).toBeInTheDocument()
  })

  it('shows an error message when the server reports failure', async () => {
    // Arrange
    ;(global.fetch as jest.Mock).mockResolvedValue({
      json: async () => ({ success: false }),
    })
    const user = userEvent.setup()
    render(<ContactModal open onClose={jest.fn()} />)
    await fillOutForm(user)

    // Act
    await user.click(screen.getByRole('button', { name: /send message/i }))

    // Assert
    expect(
      await screen.findByText(/something went wrong/i)
    ).toBeInTheDocument()
  })

  it('has no accessibility violations on the idle form', async () => {
    // Arrange
    const { container } = render(<ContactModal open onClose={jest.fn()} />)

    // Act
    const results = await axe(container)

    // Assert
    expect(results).toHaveNoViolations()
  })

  it('has no accessibility violations on the error state', async () => {
    // Arrange
    const user = userEvent.setup()
    const { container } = render(<ContactModal open onClose={jest.fn()} />)
    await user.click(screen.getByRole('button', { name: /send message/i }))
    await screen.findByText(/please fill out all fields/i)

    // Act
    const results = await axe(container)

    // Assert
    expect(results).toHaveNoViolations()
  })

  it('has no accessibility violations on the success state', async () => {
    // Arrange
    ;(global.fetch as jest.Mock).mockResolvedValue({
      json: async () => ({ success: true }),
    })
    const user = userEvent.setup()
    const { container } = render(<ContactModal open onClose={jest.fn()} />)
    await fillOutForm(user)
    await user.click(screen.getByRole('button', { name: /send message/i }))
    await screen.findByText(/message sent/i)

    // Act
    const results = await axe(container)

    // Assert
    expect(results).toHaveNoViolations()
  })
})
