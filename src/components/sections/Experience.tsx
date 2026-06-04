import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import styles from './Experience.module.scss'

const EXPERIENCE = [
  {
    meta: 'Aug 2022 – Jun 2026',
    role: 'Frontend Developer',
    org: 'TaxSlayer — Remote',
    bullets: [
      'Led site-wide white-label partner launch as sole frontend engineer, delivering theme integration across a platform serving millions of filers.',
      'Introduced TypeScript across all frontend projects; led AI-assisted migration of 100+ components with automated CI/CD quality checks.',
      'Architected a dynamic product flow manager replacing hardcoded offer logic with a configurable key-based system.',
      'Researched and implemented Optimizely feature experimentation SDK; built a local override tool for developer flag management.',
    ],
  },
  {
    meta: 'May 2021 – Oct 2021',
    role: 'Contractor, Validation Engineer',
    org: 'Cardinal Health',
    bullets: [
      'Authored FDA-compliant manufacturing procedures to prevent cross-contamination in drug combination production.',
      'Supported QA resolving non-conformance issues and managed change orders to improve process safety.',
    ],
  },
  {
    meta: 'Aug 2008 – Jan 2015',
    role: 'Human Intelligence Collector (35M)',
    org: 'U.S. Army — Honorable Discharge',
    bullets: [
      'Conducted time-sensitive intelligence operations including deployment to Afghanistan (2012); produced analytical products under zero-margin conditions.',
      'Trained personnel on analytical software systems; developed cross-functional leadership in high-stakes environments.',
    ],
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

export default function Experience() {
  const reducedMotion = useReducedMotion()

  return (
    <section id="experience" aria-labelledby="experience-heading">
      <div className={styles.section}>
        <motion.div
          variants={revealVariants}
          initial={reducedMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <p className={styles.sectionLabel}>// 03 Experience</p>
          <div className={styles.divider} />
          <h2 className={styles.title} id="experience-heading">
            Where I've been.
          </h2>
        </motion.div>

        <motion.div
          className={styles.timeline}
          variants={revealVariants}
          initial={reducedMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {EXPERIENCE.map((job) => (
            <div key={job.meta} className={styles.item}>
              <div className={styles.dot} aria-hidden="true" />
              <p className={styles.meta}>{job.meta}</p>
              <p className={styles.role}>{job.role}</p>
              <p className={styles.org}>{job.org}</p>
              <ul className={styles.bullets}>
                {job.bullets.map((bullet) => (
                  <li key={bullet} className={styles.bullet}>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
