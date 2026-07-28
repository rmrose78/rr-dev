import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useAnimationControls } from 'framer-motion'

const RESET_WAIT_MS = 2000
const SCROLL_DURATION = 80
const RETURN_DURATION = 1.5

export function useMarquee() {
  const trackRef = useRef<HTMLDivElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const [dragLeft, setDragLeft] = useState(-1000)
  const controls = useAnimationControls()

  // Tracks the pending reset timer to cancel it
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const cancelPending = useCallback(() => {
    controls.stop()
    if (resetTimer.current) {
      clearTimeout(resetTimer.current)
      resetTimer.current = null
    }
  }, [controls])

  function delayWithRef(
    ms: number,
    timerRef: React.MutableRefObject<ReturnType<typeof setTimeout> | null>
  ) {
    return new Promise<void>((resolve) => {
      timerRef.current = setTimeout(() => {
        timerRef.current = null
        resolve()
      }, ms)
    })
  }

  const scrollToEnd = useCallback(
    (duration = SCROLL_DURATION) => {
      return controls.start({
        x: dragLeft,
        transition: { duration, ease: 'linear' },
      })
    },
    [dragLeft, controls]
  )

  const returnToStart = useCallback(async () => {
    await delayWithRef(RESET_WAIT_MS, resetTimer)
    return controls.start({
      x: 0,
      transition: { duration: RETURN_DURATION, ease: 'easeInOut' },
    })
  }, [controls, resetTimer])

  const scrollLoop = useCallback(async () => {
    while (true) {
      await scrollToEnd()
      await returnToStart()
    }
  }, [scrollToEnd, returnToStart])

  useEffect(function calculateDragConstraints() {
    function calculate() {
      if (!trackRef.current || !wrapRef.current) return
      const trackWidth = trackRef.current.scrollWidth
      const wrapWidth = wrapRef.current.offsetWidth
      setDragLeft(-(trackWidth - wrapWidth))
    }

    calculate()
    window.addEventListener('resize', calculate)
    return () => window.removeEventListener('resize', calculate)
  }, [])

  useEffect(
    function autoScroll() {
      if (dragLeft === -1000) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      let canceled = false

      async function loop() {
        while (!canceled) {
          await scrollToEnd()
          if (canceled) break
          await returnToStart()
        }
      }

      loop()

      return () => {
        canceled = true
        cancelPending()
      }
    },
    [dragLeft, controls, scrollToEnd, returnToStart, cancelPending]
  )

  function resumeScroll() {
    if (!trackRef.current) return

    // Cancel both the animation AND any pending delay timer
    cancelPending()

    const style = window.getComputedStyle(trackRef.current)
    const matrix = new DOMMatrix(style.transform)
    const currentX = matrix.m41

    if (currentX <= dragLeft + 10) {
      // At end - wait then return
      returnToStart().then(() => scrollLoop())
    } else if (currentX < 0) {
      // Mid-track - resume from current position
      const remaining = Math.abs(dragLeft - currentX) / Math.abs(dragLeft)
      scrollToEnd(remaining * SCROLL_DURATION)
        .then(() => returnToStart())
        .then(() => scrollLoop())
    } else {
      // At start - just loop
      scrollLoop()
    }
  }

  return { trackRef, wrapRef, dragLeft, controls, resumeScroll }
}
