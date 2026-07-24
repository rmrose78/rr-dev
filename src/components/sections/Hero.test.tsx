import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import Hero from './Hero'

describe('Hero', () => {
  it('calls onContactClick when Get in Touch is clicked', async () => {
    // Arrange
    const user = userEvent.setup()
    const onContactClick = jest.fn()
    render(<Hero onContactClick={onContactClick} />)

    // Act
    await user.click(screen.getByRole('button', { name: /get in touch/i }))

    // Assert
    expect(onContactClick).toHaveBeenCalledTimes(1)
  })

  it('links out to GitHub', () => {
    // Arrange & Act
    render(<Hero onContactClick={jest.fn()} />)

    // Assert
    expect(screen.getByRole('link', { name: /view github/i })).toHaveAttribute(
      'href',
      'https://github.com/rmrose78'
    )
  })

  it('has no accessibility violations', async () => {
    // Arrange
    const { container } = render(<Hero onContactClick={jest.fn()} />)

    // Act
    const results = await axe(container)

    // Assert
    expect(results).toHaveNoViolations()
  })
})
