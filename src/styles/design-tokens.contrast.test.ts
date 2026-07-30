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
  navy900: '#071428',
  white: '#ffffff',
  textSecondary: '#8ab4cc',
  textMuted: '#6690b5',
  electricBlue: '#38bdf8',
  // Footer's .quoteSource is $text-muted at opacity: 0.9 over navy --
  // opacity blends the text color toward the background, so the flat
  // text-muted-on-navy check above doesn't cover it. This is the
  // resulting composited color, computed by hand (0.9 * textMuted +
  // 0.1 * navy per channel) -- recompute this if either $text-muted or
  // that opacity value changes. A real-browser sweep caught this exact
  // pairing failing at opacity: 0.7 (effective ~3.39:1, #496987).
  footerQuoteSourceOnNavy: '#5c83a6',
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

  // navy-900 is the flat card background shared by ProjectCard, LogPanel,
  // and the Testimonials carousel card.
  it.each([
    ['text-secondary', tokens.textSecondary, tokens.navy900],
    ['text-muted', tokens.textMuted, tokens.navy900],
  ])(
    '%s on navy-900 (shared card background) meets WCAG AA normal text (4.5:1)',
    (_label, fg, bg) => {
      // Act
      const ratio = contrastRatio(fg, bg)

      // Assert
      expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_NORMAL_TEXT)
    }
  )

  // Contact's status line renders full sentence text in electric-blue over
  // navy-900 (the radial-gradient panel's base color), not just a dot or
  // focus ring -- that's real content, so it needs the stricter 4.5:1
  // normal-text threshold, not the 3:1 UI-component one used elsewhere for
  // this token.
  it('electric-blue status text on navy-900 meets WCAG AA normal text (4.5:1)', () => {
    // Act
    const ratio = contrastRatio(tokens.electricBlue, tokens.navy900)

    // Assert
    expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_NORMAL_TEXT)
  })

  // navy button text on a solid electric-blue fill -- Nav's CTA and
  // Contact's primary button both use this pair via the shared
  // btn-outline-fill mixin's hover-fill state. Contrast is symmetric
  // (same ratio as electric-blue-on-navy above) but that check only
  // covers the 3:1 UI-component threshold for an accent/focus-ring use;
  // this is real button text, so it needs its own 4.5:1 check.
  it('navy button text on electric-blue meets WCAG AA normal text (4.5:1)', () => {
    // Act
    const ratio = contrastRatio(tokens.navy, tokens.electricBlue)

    // Assert
    expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_NORMAL_TEXT)
  })

  it("footer quote-source's opacity-blended color on navy meets WCAG AA normal text (4.5:1)", () => {
    // Act
    const ratio = contrastRatio(tokens.footerQuoteSourceOnNavy, tokens.navy)

    // Assert
    expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_NORMAL_TEXT)
  })
})
