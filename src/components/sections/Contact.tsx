import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import styles from './Contact.module.scss'

const revealVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
} as const

interface ContactProps {
  onContactClick: () => void
}

export default function Contact({ onContactClick }: ContactProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id={'contact-section'} aria-labelledby="contact-heading">
      <motion.div
        className={styles.section}
        variants={revealVariants}
        initial={shouldReduceMotion ? 'visible' : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className={styles.inner}>
          {/* TODO: Update when recommendations added */}
          <p className={styles.sectionLabel}>// 04 Contact</p>
          <h2 className={styles.title} id="contact-heading">
            Let's work together
          </h2>
          <p className={styles.sub}>
            Based in Pasadena, MD. Open to remote, hybrid, or onsite
            opportunities in the Maryland/DC corridor.
          </p>
          <button className={styles.btn} onClick={onContactClick}>
            Send a Message
          </button>
        </div>
      </motion.div>
    </section>
  )
}
