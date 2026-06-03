import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import StatCard from '@/components/ui/StatCard'
import styles from './About.module.scss'

const STAT_CARDS = [
  {
    label: 'Production Experience',
    value: '4 Years',
    sub: 'React + TypeScript at TaxSlayer',
  },
  {
    label: 'Prior Clearance',
    value: 'TS/SCI',
    sub: 'Active 2010–2015, U.S. Army (lapsed)',
  },
  {
    label: 'Background',
    value: 'B.S. BME',
    sub: 'Biomedical Engineering (Honors), UTSA 2020',
  },
  {
    label: 'Accessibility',
    value: 'Section 508',
    sub: 'WCAG compliant, production shipped',
  },
]

const revealVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
} as const

export default function About() {
  const reducedMotion = useReducedMotion()

  return (
    <section id="about" aria-labelledby="about-heading">
      <div className={styles.about}>
        <motion.div
          className={styles.left}
          variants={revealVariants}
          initial={reducedMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <p className={styles.sectionLabel}>// 01 About</p>
          <div className={styles.divider} />
          <h2 className={styles.title} id="about-heading">
            Building things
            <br />
            that matter.
          </h2>

          <p className={styles.text}>
            I'm a Frontend Developer with nearly four years of production
            experience in React and TypeScript. My path here went through{' '}
            <strong>Biomedical Engineering</strong> at UTSA, a U.S. Army
            deployment to Afghanistan, and frontend training through{' '}
            <strong>#VetsWhoCode</strong>.
          </p>

          <p className={styles.text}>
            My goal is building software for <strong>research teams</strong>:
            tools for biomedical scientists, engineers, and analysts that make
            complex work more accessible. I care about clean code and interfaces
            that actually serve the people using them.
          </p>

          <p className={styles.text}>
            Based in Pasadena, MD. Open to remote or hybrid roles in the
            Maryland/DC corridor.
          </p>

          <div className={styles.tags}>
            {[
              'U.S. Army Veteran',
              'Prior TS/SCI',
              'Biomedical Engineering',
              'Section 508 / WCAG',
              'Pasadena, MD',
            ].map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          className={styles.right}
          variants={revealVariants}
          initial={reducedMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {STAT_CARDS.map((card) => (
            <StatCard
              key={card.label}
              label={card.label}
              value={card.value}
              sub={card.sub}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
