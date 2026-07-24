import { contrastRatio, WCAG_AA_LARGE_TEXT, WCAG_AA_NORMAL_TEXT } from './contrast-ratio'

describe('contrastRatio', () => {
  it('returns 21 for black on white, the maximum possible ratio', () => {
    // Arrange
    const black = '#000000'
    const white = '#ffffff'

    // Act
    const ratio = contrastRatio(black, white)

    // Assert
    expect(ratio).toBeCloseTo(21, 1)
  })

  it('returns 1 for a color against itself, the minimum possible ratio', () => {
    // Arrange
    const color = '#38bdf8'

    // Act
    const ratio = contrastRatio(color, color)

    // Assert
    expect(ratio).toBeCloseTo(1, 5)
  })

  it('is symmetric regardless of argument order', () => {
    // Arrange
    const a = '#040d1a'
    const b = '#8ab4cc'

    // Act
    const forward = contrastRatio(a, b)
    const reverse = contrastRatio(b, a)

    // Assert
    expect(forward).toBeCloseTo(reverse, 10)
  })

  it('exposes the WCAG AA thresholds used to grade design tokens', () => {
    // Assert
    expect(WCAG_AA_NORMAL_TEXT).toBe(4.5)
    expect(WCAG_AA_LARGE_TEXT).toBe(3)
  })
})
