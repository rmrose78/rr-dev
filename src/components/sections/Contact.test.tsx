import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import Contact from './Contact'

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

  it('has no accessibility violations', async () => {
    // Arrange
    const { container } = render(<Contact onContactClick={jest.fn()} />)

    // Act
    const results = await axe(container)

    // Assert
    expect(results).toHaveNoViolations()
  })
})
