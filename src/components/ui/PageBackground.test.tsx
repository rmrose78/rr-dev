import { act, render } from '@testing-library/react'
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

  // One test, one mount: useStarTrail's entry animation is gated by a
  // module-level "has this played yet this session" flag (by design --
  // it should only play once per real page load, not on every re-mount).
  // Jest doesn't reset that module between separate `it` blocks in this
  // file, so splitting entry/scroll/decay across multiple tests meant
  // only the first one ever actually saw a fresh, unplayed entry
  // animation -- the rest silently mounted into an already-played state.
  it('runs the entry animation, the scroll handler, and the decay animation in sequence', () => {
    // Arrange
    jest.useFakeTimers()
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
    // Each distinct rAF callback (the entry frame, the scroll-processing
    // frame, the decay frame) runs exactly once -- enough to exercise
    // each function body without letting any of their self-rescheduling
    // recurse into a real animation loop that never resolves in jsdom.
    const invoked = new WeakSet<FrameRequestCallback>()
    const rafSpy = jest
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((cb: FrameRequestCallback) => {
        if (!invoked.has(cb)) {
          invoked.add(cb)
          cb(performance.now())
        }
        return 1
      })
    jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {})

    // Act -- mount plays the once-per-session entry animation
    const { unmount } = render(<PageBackground />)
    const callsAfterMount = rafSpy.mock.calls.length
    expect(callsAfterMount).toBeGreaterThan(0)

    // scrollY has to actually change for the scroll handler to do
    // anything; a same-position scroll event is a no-op early return
    Object.defineProperty(window, 'scrollY', { value: 100, writable: true })
    window.dispatchEvent(new Event('scroll'))
    expect(rafSpy.mock.calls.length).toBeGreaterThan(callsAfterMount)
    const callsAfterScroll = rafSpy.mock.calls.length

    // The idle timer only fires once scrolling has actually stopped
    act(() => {
      jest.advanceTimersByTime(100)
    })
    expect(rafSpy.mock.calls.length).toBeGreaterThan(callsAfterScroll)

    // Assert
    expect(() => unmount()).not.toThrow()

    jest.useRealTimers()
  })
})
