import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import LinkedInIcon from '@/components/ui/LinkedInIcon'
import styles from './Testimonials.module.scss'

const TESTIMONIALS = [
  {
    quote:
      'Ryan is the kind of developer who makes a measurable difference, not just through his own contributions, but through the way he supports and elevates the people around him. His work spans well beyond core development tasks -- he consistently looks for ways to make systems better and workflows smoother.',
    name: 'Jay Figueroa',
    role: 'Frontend Developer, TaxSlayer',
    url: 'https://www.linkedin.com/in/jayfig89',
  },
  {
    quote:
      'Ryan Rose is a tremendous asset to any development team. If you are looking for a developer who is forward-thinking, enables other engineers, and brings strong technical vision, Ryan is exactly the kind of developer you want.',
    name: 'Orion Palmer',
    role: 'Senior Frontend Developer, TaxSlayer',
    url: 'https://www.linkedin.com/in/orion-palmer',
  },
]

const RESET_WAIT_MS = 2000

// Duplicate cards for deamless marquee loop
const MARQUEE_CARDS = [...TESTIMONIALS, ...TESTIMONIALS]

const revealVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
} as const

export default function Testimonials() {
  const shouldReduceMotion = useReducedMotion()
  const trackRef = useRef<HTMLDivElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const [dragLeft, setDragLeft] = useState(-1000)
  const controls = useAnimationControls()

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  // Loop - reusable by both autoScroll and resumeScroll
  const scrollLoop = useCallback(async () => {
    while (true) {
      await controls.start({
        x: dragLeft,
        transition: { duration: 20, ease: 'linear' },
      })
      // Animate back to start smoothly
      await delay(RESET_WAIT_MS)
      await controls.start({
        x: 0,
        transition: { duration: 1.5, ease: 'easeInOut' },
      })
    }
  }, [dragLeft, controls])

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
      if (shouldReduceMotion || dragLeft === -1000) return

      let canceled = false

      async function loop() {
        while (!canceled) {
          await controls.start({
            x: dragLeft,
            transition: { duration: 20, ease: 'linear' }, // slow scroll left
          })
          if (canceled) break
          await delay(RESET_WAIT_MS)

          if (canceled) break
          // Full loop from start
          await controls.start({
            x: 0,
            transition: { duration: 1.5, ease: 'easeInOut' },
          })
        }
      }

      loop()

      return () => {
        canceled = true
        controls.stop()
      }
    },
    [dragLeft, shouldReduceMotion, controls]
  )

  function resumeScroll() {
    if (!trackRef.current) return

    const style = window.getComputedStyle(trackRef.current)
    const matrix = new DOMMatrix(style.transform)
    const currentX = matrix.m41

    if (currentX <= dragLeft + 10) {
      // At or near the end -- pause then return to start

      delay(RESET_WAIT_MS).then(async () => {
        await controls.start({
          x: 0,
          transition: {
            duration: 1.5,
            ease: 'easeInOut',
          },
        })
        scrollLoop()
      })
    } else if (currentX < 0) {
      // Mid-track - resume scrolling from current position

      const remaining = Math.abs(dragLeft - currentX) / Math.abs(dragLeft)
      controls
        .start({
          x: dragLeft,
          transition: {
            duration: remaining * 20,
            ease: 'linear',
          },
        })
        .then(async () => {
          await delay(RESET_WAIT_MS)
          await controls.start({
            x: 0,
            transition: { duration: 1.5, ease: 'easeInOut' },
          })
          scrollLoop()
        })
    } else scrollLoop()
  }

  return (
    <section id="testimonials" aria-labelledby="testimonials-heading">
      <div className={styles.section}>
        <motion.div
          className={styles.header}
          variants={revealVariants}
          initial={shouldReduceMotion ? 'visible' : 'hidden'}
          whileInView={'visible'}
          viewport={{ once: true, amount: 0.2 }}
        >
          <p className={styles.sectionLabel}>// 04 Recommendations</p>
          <div className={styles.divider} />
          <h2 className={styles.title} id="testimonials-heading">
            What others say.
          </h2>
        </motion.div>

        <div
          ref={wrapRef}
          className={styles.marqueeWrap}
          aria-label="Scrolling reccomendations"
        >
          <div className={styles.fadeLeft} />
          <div className={styles.fadeRight} />

          <motion.div
            ref={trackRef}
            className={styles.track}
            animate={controls}
            drag="x"
            dragConstraints={{ right: 0, left: dragLeft }}
            dragElastic={0.1}
            whileTap={{ cursor: 'grabbing' }}
            onDragStart={() => controls.stop()}
            onDragEnd={resumeScroll}
          >
            {MARQUEE_CARDS.map((t, i) => (
              <div
                key={`${t.name}-${i}`}
                className={styles.card}
                // Remove from tab order for duplicaties - screen readers
                // online need to encounter each card once
                aria-hidden={i >= TESTIMONIALS.length}
              >
                <p className={styles.quote}>&ldquo;{t.quote}&rdquo;</p>
                <div className={styles.author}>
                  <span className={styles.name}>{t.name}</span>
                  <span className={styles.role}>{t.role}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className={styles.footer}
          variants={revealVariants}
          initial={shouldReduceMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <span className={styles.footerLabel}>View all on</span>
          <a
            href="https://www.linkedin.com/in/ryan-rose-272626170/details/recommendations/"
            target="_blank"
            rel="noreferrer"
            className={styles.footerLink}
            aria-label="View LinkedIn recommendations"
          >
            <LinkedInIcon />
            LinkedIn Recommendations
          </a>
        </motion.div>
      </div>
    </section>
  )
}
