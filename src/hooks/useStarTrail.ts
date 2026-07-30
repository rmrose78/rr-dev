import { useEffect } from 'react'
import { useReducedMotion } from './useReducedMotion'

/**
 * Ported from the scroll-reactive star trail in
 * docs/mockups/mockup-i1-project-blocks.html (Ryan-approved carryover from
 * the researchpulse mockup session -- the one scroll-linked JS effect in an
 * otherwise CSS-only decor system). Tracks scroll velocity/direction via a
 * passive, rAF-throttled scroll listener and writes it to three custom
 * properties on the document root -- --trail-len (px), --trail-dir
 * (1 down / -1 up), and --trail-intensity (0-1) -- that
 * Starfield.module.scss's `.star::after` rule consumes to scale the
 * streak's length, direction, and width/opacity. Decays back to 0 via a
 * short rAF easing loop when scrolling stops, instead of cutting off
 * abruptly.
 *
 * Also plays a one-time "dropping out of hyperspace" entry animation on
 * mount -- a scripted, exaggerated burst of the same --trail-len/
 * --trail-intensity properties that rapidly decelerates into the resting
 * state, gated by a module-level flag so it plays once per real page load
 * (not on every React StrictMode double-invoke or re-mount within the
 * same session) and is fully skipped under prefers-reduced-motion.
 */

const MAX_TRAIL_PX = 110
const VELOCITY_SCALE = 24
const IDLE_DELAY_MS = 120
const DECAY_DURATION_MS = 650

// "Dropping out of hyperspace" entry burst -- far beyond the normal scroll
// trail's max so the opening beat reads as a deliberate light-speed jump,
// not just a big scroll. Direction is arbitrary (down); ease-out cubic
// gives the fast-snap-then-gentle-settle feel of decelerating out of warp.
const ENTRY_TRAIL_PX = 320
const ENTRY_DURATION_MS = 900
const ENTRY_DIR = 1

let hasPlayedLightspeedEntry = false

export function useStarTrail() {
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return

    const root = document.documentElement
    let lastY = window.scrollY
    let lastTime = performance.now()
    let currentLen = 0
    let currentDir = 0
    let ticking = false
    let idleTimer: ReturnType<typeof setTimeout> | null = null
    let decayFrame: number | null = null
    let decayStart: number | null = null
    let decayFromLen = 0
    let entryFrame: number | null = null
    let entryStart: number | null = null

    function setVars(len: number, dir: number) {
      currentLen = len
      currentDir = dir
      const intensity = Math.min(len / MAX_TRAIL_PX, 1)
      root.style.setProperty('--trail-len', `${len.toFixed(2)}px`)
      root.style.setProperty('--trail-dir', String(dir))
      root.style.setProperty('--trail-intensity', intensity.toFixed(2))
    }

    function stopDecay() {
      if (decayFrame !== null) {
        cancelAnimationFrame(decayFrame)
        decayFrame = null
      }
    }

    function runDecay(timestamp: number) {
      if (decayStart === null) decayStart = timestamp
      const t = Math.min((timestamp - decayStart) / DECAY_DURATION_MS, 1)
      const eased = 1 - t
      setVars(decayFromLen * eased, currentDir)
      decayFrame = t < 1 ? requestAnimationFrame(runDecay) : null
    }

    function startDecay() {
      stopDecay()
      decayFromLen = currentLen
      decayStart = null
      if (decayFromLen <= 0.05) {
        setVars(0, currentDir)
        return
      }
      decayFrame = requestAnimationFrame(runDecay)
    }

    function stopEntry() {
      if (entryFrame !== null) {
        cancelAnimationFrame(entryFrame)
        entryFrame = null
      }
    }

    function runEntry(timestamp: number) {
      // Flip the "already played" flag on the first frame that actually
      // fires, not when the frame is merely scheduled -- React StrictMode's
      // dev-only mount/cleanup/mount cycle cancels a just-scheduled rAF
      // before it ever runs, and flipping the flag too early would leave
      // the surviving second mount thinking the entry already played when
      // it never visually did.
      if (entryStart === null) {
        entryStart = timestamp
        hasPlayedLightspeedEntry = true
      }
      const t = Math.min((timestamp - entryStart) / ENTRY_DURATION_MS, 1)
      const eased = Math.pow(1 - t, 3)
      setVars(ENTRY_TRAIL_PX * eased, ENTRY_DIR)
      entryFrame = t < 1 ? requestAnimationFrame(runEntry) : null
    }

    function startEntry() {
      if (hasPlayedLightspeedEntry) return
      entryStart = null
      entryFrame = requestAnimationFrame(runEntry)
    }

    function processScroll() {
      ticking = false
      const now = performance.now()
      const y = window.scrollY
      const dy = y - lastY
      const dt = Math.max(now - lastTime, 1)
      lastY = y
      lastTime = now

      if (dy === 0) return

      stopEntry()
      stopDecay()

      const velocity = Math.abs(dy) / dt
      const len = Math.min(velocity * VELOCITY_SCALE, MAX_TRAIL_PX)
      const dir = dy > 0 ? 1 : -1
      setVars(len, dir)

      if (idleTimer) clearTimeout(idleTimer)
      idleTimer = setTimeout(startDecay, IDLE_DELAY_MS)
    }

    function onScroll() {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(processScroll)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    startEntry()

    return () => {
      window.removeEventListener('scroll', onScroll)
      stopDecay()
      stopEntry()
      if (idleTimer) clearTimeout(idleTimer)
      root.style.removeProperty('--trail-len')
      root.style.removeProperty('--trail-dir')
      root.style.removeProperty('--trail-intensity')
    }
  }, [reducedMotion])
}
