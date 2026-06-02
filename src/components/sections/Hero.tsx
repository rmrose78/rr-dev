import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useMolecularCanvas } from '@/hooks/useMolecularCanvas'
import { useTypewriter } from '@/hooks/useTypewriter'
import styles from './Hero.module.scss'

/**
 * Hero section -- full viewport, molecular canvas background,
 * staggered fade-in on load, typewriter phrase cycling.
 * All animations respect prefers-reduced-motion.
 */

// Framer Motion variants -- named animation states
// 'hidden' is the starting state, 'visible' is the end state
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
} as const

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
} as const

interface HeroProps {
  onContactClick: () => void
}

export default function Hero({ onContactClick }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reducedMotion = useReducedMotion()

  useMolecularCanvas(canvasRef, reducedMotion)

  const typewriterText = useTypewriter(reducedMotion)

  return (
    <section id={'hero'} className={styles.hero}>
      {/* Canvas Background -- aria-hidden so screen readers skip it */}
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />

      <motion.div
        className={styles.content}
        variants={containerVariants}
        initial={reducedMotion ? 'visible' : 'hidden'}
        animate="visible"
      >
        <motion.p className={styles.label} variants={itemVariants}>
          Ryan Rose
        </motion.p>

        <motion.h1 className={styles.heading} variants={itemVariants}>
          Frontend
          <br />
          <span className={styles.last}>Developer.</span>
        </motion.h1>

        <motion.div className={styles.description} variants={itemVariants}>
          <span
            className={styles.typewriter}
            aria-label="Frontend Developer focused on crafting performant, accessible, and delightful web experiences."
          >
            {typewriterText}
          </span>
          <span className={styles.cursor} aria-hidden="true" />
        </motion.div>

        <motion.p className={styles.bio} variants={itemVariants}>
          React and TypeScript engineer with a background in Biomedical
          Engineering and U.S. Army service. I build clean, accessible
          interfaces and am drawn to work at the intersection of software and
          science, whether that's health IT, research tooling, or defense
          technology.
        </motion.p>

        <motion.div className={styles.actions} variants={itemVariants}>
          <button className={styles.btnPrimary} onClick={onContactClick}>
            Get in Touch
          </button>
          <a
            href="https://github.com/rmrose78"
            target="_blank"
            rel="noreferrer"
            className={styles.btnGhost}
          >
            View GitHub
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className={styles.scrollCue}
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <span className={styles.scrollText}>scroll</span>
        <span className={styles.scrollLine} />
      </motion.div>
    </section>
  )
}
