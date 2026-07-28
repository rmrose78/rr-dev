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
          <div className={styles.copy}>
            <p className={styles.eyebrow}>Open a channel</p>
            <h2 className={styles.title} id="contact-heading">
              Have a project in mind?
            </h2>
            <div className={styles.status}>
              <span className={styles.dot} aria-hidden="true" />
              Based in Pasadena, Maryland.
            </div>
          </div>
          <button className={styles.btn} onClick={onContactClick}>
            Send a Message
          </button>
        </div>
      </motion.div>
    </section>
  )
}
