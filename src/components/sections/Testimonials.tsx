import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import LinkedInIcon from '@/components/ui/LinkedInIcon'
import styles from './Testimonials.module.scss'
import { useMarquee } from '@/hooks/useMarquee'

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
  {
    quote:
      'What sets Ryan apart is his ability to translate highly technical concepts into clear, actionable guidance. His collaborative approach, patience, and strong communication skills made him an exceptional partner. Any team would be fortunate to have him.',
    name: 'Michelle Mosher',
    role: 'Growth Product Manager, TaxSlayer',
    url: 'https://www.linkedin.com/in/michellelmosher',
  },
]

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
  const { trackRef, wrapRef, dragLeft, controls, resumeScroll } = useMarquee()

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
          <p className={styles.eyebrow}>Recommendations</p>
          <h2 className={styles.title} id="testimonials-heading">
            What others say.
          </h2>
        </motion.div>

        <div
          ref={wrapRef}
          className={styles.marqueeWrap}
          aria-label="Scrolling recommendations"
        >
          <div className={styles.fadeLeft} aria-hidden="true" />
          <div className={styles.fadeRight} aria-hidden="true" />

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
