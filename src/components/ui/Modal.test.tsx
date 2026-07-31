import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import Modal from './Modal'

describe('Modal', () => {
  it('does not render its content when closed', () => {
    // Arrange & Act
    render(
      <Modal open={false} onClose={jest.fn()} title="Test Modal">
        <p>Modal body</p>
      </Modal>
    )

    // Assert
    expect(screen.queryByText('Modal body')).not.toBeInTheDocument()
  })

  it('renders its content when open', () => {
    // Arrange & Act
    render(
      <Modal open onClose={jest.fn()} title="Test Modal">
        <p>Modal body</p>
      </Modal>
    )

    // Assert
    expect(screen.getByText('Modal body')).toBeInTheDocument()
  })

  it('renders a visible title when titleVisible is true', () => {
    // Arrange & Act
    render(
      <Modal open onClose={jest.fn()} title="Test Modal" titleVisible>
        <p>Modal body</p>
      </Modal>
    )

    // Assert
    expect(
      screen.getByRole('heading', { name: 'Test Modal' })
    ).toBeVisible()
  })

  it('calls onClose when the close button is clicked', async () => {
    // Arrange
    const user = userEvent.setup()
    const onClose = jest.fn()
    render(
      <Modal open onClose={onClose} title="Test Modal">
        <p>Modal body</p>
      </Modal>
    )

    // Act
    await user.click(screen.getByRole('button', { name: /close modal/i }))

    // Assert
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose on Escape', async () => {
    // Arrange
    const user = userEvent.setup()
    const onClose = jest.fn()
    render(
      <Modal open onClose={onClose} title="Test Modal">
        <p>Modal body</p>
      </Modal>
    )

    // Act
    await user.keyboard('{Escape}')

    // Assert
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('has no accessibility violations when open', async () => {
    // Arrange
    const { container } = render(
      <Modal open onClose={jest.fn()} title="Test Modal">
        <p>Modal body</p>
      </Modal>
    )

    // Act
    const results = await axe(container)

    // Assert
    expect(results).toHaveNoViolations()
  })
})
