import { getLiveUrl } from './projects'

describe('getLiveUrl', () => {
  it('returns the liveUrl when the project has one', () => {
    // Assert
    expect(getLiveUrl({ liveUrl: 'https://example.com' })).toBe(
      'https://example.com'
    )
  })

  it('returns undefined when the project has no liveUrl', () => {
    // Assert
    expect(getLiveUrl({})).toBeUndefined()
  })
})
