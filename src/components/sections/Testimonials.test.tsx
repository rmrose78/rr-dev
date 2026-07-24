import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import Testimonials from './Testimonials'

describe('Testimonials', () => {
  it('marks duplicate marquee cards aria-hidden so AT only encounters one', () => {
    // Arrange & Act
    render(<Testimonials />)

    // Assert -- cards are duplicated in the DOM for a seamless marquee
    // loop, so the name renders twice, but exactly one copy is exposed to
    // assistive technology and the other is aria-hidden
    const nameNodes = screen.getAllByText(/jay figueroa/i)
    expect(nameNodes).toHaveLength(2)

    const hiddenStates = nameNodes.map(
      (node) => node.closest('[aria-hidden]')?.getAttribute('aria-hidden')
    )
    expect(hiddenStates.sort()).toEqual(['false', 'true'])
  })

  it('links out to LinkedIn recommendations', () => {
    // Arrange & Act
    render(<Testimonials />)

    // Assert
    expect(
      screen.getByRole('link', { name: /view linkedin recommendations/i })
    ).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    // Arrange
    const { container } = render(<Testimonials />)

    // Act
    const results = await axe(container)

    // Assert
    expect(results).toHaveNoViolations()
  })
})
