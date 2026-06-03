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
    label: 'Education',
    value: 'B.S. Biomedical Engineering',
    sub: 'Honors, UTSA 2020',
  },
  {
    label: 'Veteran',
    value: 'U.S. Army',
    sub: 'Human Intelligence (35M), Afghanistan 2012',
  },
  {
    label: 'Prior Clearance',
    value: 'TS/SCI',
    sub: 'Active 2010–2015 (lapsed)',
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
            <strong>Biomedical Engineering</strong> at UTSA, service as a{' '}
            <strong>U.S.&nbsp;Army Veteran</strong>, and frontend training
            through <strong>#VetsWhoCode</strong>.
          </p>

          <p className={styles.text}>
            I care about clean, maintainable code and building interfaces that
            actually serve the people using them. That includes accessibility. I
            build with Section 508 and WCAG compliance as a standard practice,
            not an afterthought. I'm drawn to work where the domain matters,
            whether that's healthcare, research, or public service.
          </p>

          <p className={styles.text}>
            Based in Pasadena, MD. Open to remote, hybrid, or onsite
            opportunities in the Maryland/DC corridor.
          </p>

          <div className={styles.tags}>
            {[
              'React / TypeScript',
              'C# MVC',
              'Prior TS/SCI',
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
