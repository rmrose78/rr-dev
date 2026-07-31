import { renderHook, act } from '@testing-library/react'
import { useReducedMotion } from './useReducedMotion'

describe('useReducedMotion', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('updates when the OS-level reduced-motion preference changes mid-session', () => {
    // Arrange -- setupTests' global matchMedia mock has a no-op
    // addEventListener, so this test needs its own mock that actually
    // stores and can invoke the registered 'change' listener.
    let changeListener: EventListener | undefined
    jest.spyOn(window, 'matchMedia').mockImplementation(
      (query: string) =>
        ({
          matches: false,
          media: query,
          onchange: null,
          addEventListener: (_event: string, listener: EventListener) => {
            changeListener = listener
          },
          removeEventListener: jest.fn(),
          addListener: jest.fn(),
          removeListener: jest.fn(),
          dispatchEvent: jest.fn(),
        }) as unknown as MediaQueryList
    )
    const { result } = renderHook(() => useReducedMotion())
    expect(result.current).toBe(false)

    // Act
    act(() => {
      changeListener?.({ matches: true } as unknown as Event)
    })

    // Assert
    expect(result.current).toBe(true)
  })
})
