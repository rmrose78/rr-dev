// Global test environment stubs. jsdom doesn't implement matchMedia or
// IntersectionObserver, both of which this app's components rely on
// (useReducedMotion, useMarquee, and Framer Motion's whileInView).

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    // Default to "prefers reduced motion" so components render in their
    // final, fully-populated DOM state rather than a pre-animation hidden
    // one -- this is also what accessibility tests should exercise, and it
    // avoids components that start infinite animation loops on mount
    // (see Testimonials/useMarquee) from ever kicking one off in jsdom.
    matches: query === '(prefers-reduced-motion: reduce)',
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

class MockIntersectionObserver {
  observe = jest.fn()
  unobserve = jest.fn()
  disconnect = jest.fn()
  takeRecords = jest.fn(() => [])
}

window.IntersectionObserver =
  MockIntersectionObserver as unknown as typeof IntersectionObserver
