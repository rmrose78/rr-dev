import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import Modal from './Modal'
import styles from './Modal.module.scss'

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

  it('renders a visually-styled title when titleVisible is true', () => {
    // Arrange & Act -- toBeVisible() alone doesn't distinguish this from
    // the default hidden-title branch: Radix's VisuallyHidden clips the
    // element rather than setting display:none/visibility:hidden, so it
    // still passes toBeVisible(). The styled class is what actually
    // differs between the two branches.
    render(
      <Modal open onClose={jest.fn()} title="Test Modal" titleVisible>
        <p>Modal body</p>
      </Modal>
    )

    // Assert
    expect(screen.getByRole('heading', { name: 'Test Modal' })).toHaveClass(
      styles.title
    )
  })

  it('does not apply the visible-title class by default', () => {
    // Arrange & Act
    render(
      <Modal open onClose={jest.fn()} title="Test Modal">
        <p>Modal body</p>
      </Modal>
    )

    // Assert
    expect(screen.getByText('Test Modal')).not.toHaveClass(styles.title)
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
