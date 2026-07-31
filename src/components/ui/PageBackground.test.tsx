import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import PageBackground from './PageBackground'

describe('PageBackground', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('is hidden from assistive technology as a decorative element', () => {
    // Arrange
    const { container } = render(<PageBackground />)

    // Assert
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true')
  })

  it('has no accessibility violations', async () => {
    // Arrange
    const { container } = render(<PageBackground />)

    // Act
    const results = await axe(container)

    // Assert
    expect(results).toHaveNoViolations()
  })

  it('does not attach a scroll listener under prefers-reduced-motion (the test default)', () => {
    // Arrange
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener')

    // Act
    render(<PageBackground />)

    // Assert
    expect(addEventListenerSpy).not.toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
      expect.anything()
    )
  })

  it('attaches a scroll listener for the star trail when motion is not reduced', () => {
    // Arrange
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
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener')

    // Act
    render(<PageBackground />)

    // Assert
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
      expect.objectContaining({ passive: true })
    )
  })

  it('runs the entry animation and scroll handler once without throwing', () => {
    // Arrange
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
    // Each distinct rAF callback (the entry-animation frame, the
    // scroll-processing frame) runs exactly once -- enough to exercise the
    // function bodies without letting either's self-rescheduling recurse
    // into a real animation loop that never resolves in jsdom.
    const invoked = new WeakSet<FrameRequestCallback>()
    jest
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((cb: FrameRequestCallback) => {
        if (!invoked.has(cb)) {
          invoked.add(cb)
          cb(performance.now())
        }
        return 1
      })
    jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {})

    // Act -- scrollY has to actually change for the scroll handler to do
    // anything; a same-position scroll event is a no-op early return.
    const { unmount } = render(<PageBackground />)
    Object.defineProperty(window, 'scrollY', { value: 100, writable: true })
    expect(() => window.dispatchEvent(new Event('scroll'))).not.toThrow()

    // Assert
    expect(() => unmount()).not.toThrow()
  })
})
