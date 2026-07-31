import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import Nav from './Nav'

describe('Nav', () => {
  it('has exactly About and Projects as nav links, nothing else', () => {
    // Arrange & Act
    render(<Nav onContactClick={jest.fn()} />)

    // Assert
    expect(screen.getByRole('link', { name: /^about$/i })).toHaveAttribute(
      'href',
      '#about'
    )
    expect(screen.getByRole('link', { name: /^projects$/i })).toHaveAttribute(
      'href',
      '#projects'
    )
    expect(
      screen.queryByRole('link', { name: /recommendations/i })
    ).not.toBeInTheDocument()
  })

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

  it('calls onContactClick and closes the mobile menu when its CTA is clicked', async () => {
    // Arrange
    const user = userEvent.setup()
    const onContactClick = jest.fn()
    render(<Nav onContactClick={onContactClick} />)
    const toggle = screen.getByRole('button', {
      name: /toggle navigation menu/i,
    })
    await user.click(toggle)
    const mobileNav = screen.getByRole('navigation', {
      name: /mobile navigation/i,
    })

    // Act
    await user.click(
      within(mobileNav).getByRole('button', { name: /open contact form/i })
    )

    // Assert
    expect(onContactClick).toHaveBeenCalledTimes(1)
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  it('restores body scroll when the hamburger re-toggles the menu closed', async () => {
    // Arrange
    const user = userEvent.setup()
    render(<Nav onContactClick={jest.fn()} />)
    const toggle = screen.getByRole('button', {
      name: /toggle navigation menu/i,
    })
    await user.click(toggle)
    expect(document.body.style.overflow).toBe('hidden')

    // Act
    await user.click(toggle)

    // Assert
    expect(document.body.style.overflow).toBe('')
  })

  it('has no accessibility violations with the menu closed', async () => {
    // Arrange
    const { container } = render(<Nav onContactClick={jest.fn()} />)

    // Act
    const results = await axe(container)

    // Assert
    expect(results).toHaveNoViolations()
  })

  it('shows icon-only GitHub and LinkedIn links in the mobile menu, above the contact button', async () => {
    // Arrange
    const user = userEvent.setup()
    render(<Nav onContactClick={jest.fn()} />)
    await user.click(
      screen.getByRole('button', { name: /toggle navigation menu/i })
    )
    const mobileNav = screen.getByRole('navigation', {
      name: /mobile navigation/i,
    })

    // Act
    const github = within(mobileNav).getByRole('link', { name: /^github$/i })
    const linkedin = within(mobileNav).getByRole('link', {
      name: /^linkedin$/i,
    })
    const contactButton = within(mobileNav).getByRole('button', {
      name: /open contact form/i,
    })

    // Assert
    expect(github).toHaveTextContent('')
    expect(linkedin).toHaveTextContent('')
    expect(
      github.compareDocumentPosition(contactButton) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy()
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
