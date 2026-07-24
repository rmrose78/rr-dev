import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import Nav from './Nav'

describe('Nav', () => {
  it('calls onContactClick when the desktop CTA is clicked', async () => {
    // Arrange
    const user = userEvent.setup()
    const onContactClick = jest.fn()
    render(<Nav onContactClick={onContactClick} />)

    // Act
    await user.click(
      screen.getByRole('button', { name: /open contact form/i })
    )

    // Assert
    expect(onContactClick).toHaveBeenCalledTimes(1)
  })

  it('opens the mobile menu and marks it expanded', async () => {
    // Arrange
    const user = userEvent.setup()
    render(<Nav onContactClick={jest.fn()} />)
    const toggle = screen.getByRole('button', {
      name: /toggle navigation menu/i,
    })

    // Act
    await user.click(toggle)

    // Assert
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
  })

  it('closes the mobile menu from its own close button', async () => {
    // Arrange
    const user = userEvent.setup()
    render(<Nav onContactClick={jest.fn()} />)
    const toggle = screen.getByRole('button', {
      name: /toggle navigation menu/i,
    })
    await user.click(toggle)

    // Act
    await user.click(
      screen.getByRole('button', { name: /close navigation menu/i })
    )

    // Assert
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  it('has no accessibility violations with the menu closed', async () => {
    // Arrange
    const { container } = render(<Nav onContactClick={jest.fn()} />)

    // Act
    const results = await axe(container)

    // Assert
    expect(results).toHaveNoViolations()
  })

  it('has no accessibility violations with the menu open', async () => {
    // Arrange
    const user = userEvent.setup()
    const { container } = render(<Nav onContactClick={jest.fn()} />)
    await user.click(
      screen.getByRole('button', { name: /toggle navigation menu/i })
    )

    // Act
    const results = await axe(container)

    // Assert
    expect(results).toHaveNoViolations()
  })
})
