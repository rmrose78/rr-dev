import { useEffect } from 'react'
import { useReducedMotion } from './useReducedMotion'

/**
 * Ported from the scroll-reactive star trail in
 * docs/mockups/mockup-i1-project-blocks.html (Ryan-approved carryover from
 * the researchpulse mockup session -- the one scroll-linked JS effect in an
 * otherwise CSS-only decor system). Tracks scroll velocity/direction via a
 * passive, rAF-throttled scroll listener and writes it to two custom
 * properties on the document root -- --trail-len (px) and --trail-dir
 * (1 down / -1 up) -- that Starfield.module.scss's `.star::after` rule
 * consumes. Decays back to 0 via a short rAF easing loop when scrolling
 * stops, instead of cutting off abruptly.
 */

const MAX_TRAIL_PX = 20
const VELOCITY_SCALE = 12
const IDLE_DELAY_MS = 120
const DECAY_DURATION_MS = 450

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

    function setVars(len: number, dir: number) {
      currentLen = len
      currentDir = dir
      root.style.setProperty('--trail-len', `${len.toFixed(2)}px`)
      root.style.setProperty('--trail-dir', String(dir))
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

    function processScroll() {
      ticking = false
      const now = performance.now()
      const y = window.scrollY
      const dy = y - lastY
      const dt = Math.max(now - lastTime, 1)
      lastY = y
      lastTime = now

      if (dy === 0) return

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

    return () => {
      window.removeEventListener('scroll', onScroll)
      stopDecay()
      if (idleTimer) clearTimeout(idleTimer)
      root.style.removeProperty('--trail-len')
      root.style.removeProperty('--trail-dir')
    }
  }, [reducedMotion])
}
