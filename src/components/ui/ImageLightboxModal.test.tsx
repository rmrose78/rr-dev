import { fireEvent, render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import ImageLightboxModal from './ImageLightboxModal'

describe('ImageLightboxModal', () => {
  const props = {
    isOpen: true,
    onClose: jest.fn(),
    src: '/projects/researchpulse-demo.gif',
    alt: 'ResearchPulse demo screenshot',
    title: 'ResearchPulse',
    liveUrl: 'https://researchpulsehq.com/',
    repoUrl: 'https://github.com/rmrose78/researchpulse',
  }

  it('renders open lightbox modal with image and links', () => {
    // Arrange & Act
    render(<ImageLightboxModal {...props} />)

    // Assert
    expect(
      screen.getByRole('dialog', { name: /demo lightbox for researchpulse/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /researchpulse demo screenshot/i })).toHaveAttribute(
      'src',
      '/projects/researchpulse-demo.gif'
    )
    expect(screen.getByRole('link', { name: /visit live site/i })).toHaveAttribute(
      'href',
      'https://researchpulsehq.com/'
    )
  })

  it('calls onClose when close button is clicked', () => {
    // Arrange
    const handleClose = jest.fn()
    render(<ImageLightboxModal {...props} onClose={handleClose} />)

    // Act
    fireEvent.click(screen.getByRole('button', { name: /close demo modal/i }))

    // Assert
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when Escape key is pressed', () => {
    // Arrange
    const handleClose = jest.fn()
    render(<ImageLightboxModal {...props} onClose={handleClose} />)

    // Act
    fireEvent.keyDown(window, { key: 'Escape' })

    // Assert
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('has no accessibility violations when open', async () => {
    // Arrange
    const { container } = render(<ImageLightboxModal {...props} />)

    // Act
    const results = await axe(container)

    // Assert
    expect(results).toHaveNoViolations()
  })
})
