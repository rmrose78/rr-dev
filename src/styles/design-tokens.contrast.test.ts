import {
  contrastRatio,
  WCAG_AA_LARGE_TEXT,
  WCAG_AA_NORMAL_TEXT,
} from '@/utils/contrast-ratio'

// Mirrors src/styles/_variables.scss. SCSS variables can't be imported
// directly into a Jest/Node test, so these hex values are kept in sync by
// hand — if you change a color in _variables.scss that's covered below,
// update it here too.
const tokens = {
  navy: '#040d1a',
  navy800: '#0c2040',
  white: '#ffffff',
  textSecondary: '#8ab4cc',
  textMuted: '#6690b5',
  electricBlue: '#38bdf8',
}

describe('design token contrast ratios', () => {
  it.each([
    ['white body text', tokens.white, tokens.navy],
    ['text-secondary', tokens.textSecondary, tokens.navy],
    ['text-muted', tokens.textMuted, tokens.navy],
  ])('%s on navy meets WCAG AA normal text (4.5:1)', (_label, fg, bg) => {
    // Act
    const ratio = contrastRatio(fg, bg)

    // Assert
    expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_NORMAL_TEXT)
  })

  it('electric-blue accent/focus-ring on navy meets WCAG AA UI contrast (3:1)', () => {
    // Act
    const ratio = contrastRatio(tokens.electricBlue, tokens.navy)

    // Assert
    expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_LARGE_TEXT)
  })

  // navy-800 is the lighter end of LogPanel's gradient background
  // (linear-gradient(navy-900, navy-800)) — the worst case for contrast
  // since it's the palest of the two stops.
  it.each([
    ['text-secondary', tokens.textSecondary, tokens.navy800],
    ['text-muted', tokens.textMuted, tokens.navy800],
  ])(
    '%s on navy-800 (LogPanel background) meets WCAG AA normal text (4.5:1)',
    (_label, fg, bg) => {
      // Act
      const ratio = contrastRatio(fg, bg)

      // Assert
      expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_NORMAL_TEXT)
    }
  )

  it('electric-blue status dot on navy-800 meets WCAG AA UI contrast (3:1)', () => {
    // Act
    const ratio = contrastRatio(tokens.electricBlue, tokens.navy800)

    // Assert
    expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_LARGE_TEXT)
  })
})
