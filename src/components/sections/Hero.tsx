import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import GitHubIcon from '@/components/ui/GitHubIcon'
import LinkedInIcon from '@/components/ui/LinkedInIcon'
import styles from './Hero.module.scss'

// How far the page can scroll before the scroll cue (label + trail) fades
// out entirely.
const SCROLL_CUE_THRESHOLD_PX = 40

function useIsAtTop(): boolean {
  const [isAtTop, setIsAtTop] = useState(true)

  useEffect(() => {
    function handleScroll() {
      setIsAtTop(window.scrollY < SCROLL_CUE_THRESHOLD_PX)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return isAtTop
}

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

export default function Hero() {
  const reducedMotion = useReducedMotion()
  const isAtTop = useIsAtTop()

  return (
    <section id="hero" className={styles.hero}>
      <motion.div
        className={styles.content}
        variants={containerVariants}
        initial={reducedMotion ? 'visible' : 'hidden'}
        animate="visible"
      >
        <motion.p className={styles.eyebrow} variants={itemVariants}>
          Software Developer
        </motion.p>

        <motion.h1 className={styles.heading} variants={itemVariants}>
          Build things that <span className={styles.accent}>matter</span>.
        </motion.h1>

        <motion.p className={styles.bio} variants={itemVariants}>
          U.S. Army veteran with professional experience building React and
          TypeScript applications that serve millions of users. Drawn to work
          where the problem actually matters. Also, I have a thing for space,
          which explains all of this.
        </motion.p>

        <motion.div className={styles.actions} variants={itemVariants}>
          <div className={styles.iconRow}>
            <a
              href="https://github.com/rmrose78"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className={styles.iconLink}
            >
              <GitHubIcon />
            </a>
            <a
              href="https://www.linkedin.com/in/ryan-rose-272626170/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className={styles.iconLink}
            >
              <LinkedInIcon />
            </a>
          </div>
          <a href="#projects" className={styles.btnOutline}>
            Jump to Projects
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll cue -- a short star trail: a thin line with a small glowing
          dot travelling down it on a loop, echoing the shooting-star motif
          in the site-wide decor system. The whole cue (label + trail) only
          shows while at the top of the page. Purely decorative. */}
      <div
        className={`${styles.scrollCue} ${reducedMotion ? styles.reducedMotion : ''} ${isAtTop ? '' : styles.scrollCueHidden}`}
        aria-hidden="true"
      >
        <span className={styles.scrollText}>Scroll</span>
        <span className={styles.scrollLine} />
        <span className={styles.scrollDot} />
      </div>
    </section>
  )
}
