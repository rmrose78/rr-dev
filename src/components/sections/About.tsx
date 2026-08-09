import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import StatCard from '@/components/ui/StatCard'
import LogPanel from '@/components/ui/LogPanel'
import styles from './About.module.scss'

const SPEC_CARDS = [
  {
    label: 'Education',
    value: 'B.S. UTSA',
    sub: 'UT San Antonio',
  },
  {
    label: 'Service',
    value: 'U.S. Army',
    sub: 'Veteran, Military Intelligence',
  },
]

const SKILL_GROUPS = [
  {
    label: 'Core Frontend',
    primary: true,
    skills: ['TypeScript', 'React', 'JavaScript', 'WCAG / Accessibility'],
  },
  {
    label: 'Testing',
    primary: false,
    skills: ['Jest', 'React Testing Library', 'Playwright'],
  },
  {
    label: 'Tools & Workflow',
    primary: false,
    skills: [
      'Git',
      'Figma',
      'CI/CD',
      'Azure DevOps',
      'A/B Testing',
      'AI-Assisted Development',
    ],
  },
  {
    label: 'Backend Exposure',
    primary: false,
    skills: ['C# / .NET', 'REST APIs', 'SQL', 'Python'],
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
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>Background</p>
          <h2 className={styles.title} id="about-heading">
            The signal so far.
          </h2>
        </div>

        <div className={styles.grid}>
          <motion.div
            className={styles.col}
            variants={revealVariants}
            initial={reducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <LogPanel label="Dispatch" footer="STATUS: TRANSMITTING">
              <p>
                Frontend Software Engineer with a focus on building production
                React and TypeScript applications. Self-paced guidance through{' '}
                <a
                  href="https://vetswhocode.io/"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.bioLink}
                >
                  #VetsWhoCode
                </a>{' '}
                launched my web engineering career following my service in the
                U.S. Army. Today, I build high-performance, accessible digital
                products while constantly optimizing AI-assisted workflows.
              </p>
            </LogPanel>

            <div className={styles.focusNote}>
              <p className={styles.focusNoteLabel}>Ground station</p>
              <p className={styles.focusNoteText}>
                Based in Pasadena, Maryland.
              </p>
            </div>

            <div className={styles.specs}>
              {SPEC_CARDS.map((card) => (
                <StatCard
                  key={card.label}
                  label={card.label}
                  value={card.value}
                  sub={card.sub}
                  compact
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            className={styles.col}
            variants={revealVariants}
            initial={reducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <LogPanel label="Stack" className={styles.stackPanel}>
              <div className={styles.skillsChart}>
                {SKILL_GROUPS.map((group) => (
                  <div key={group.label} className={styles.skillsRow}>
                    <p className={styles.skillsCat}>{group.label}</p>
                    {/* list-style: none strips list semantics from the a11y tree
                        in Safari/VoiceOver unless role="list"/"listitem" are
                        explicit — jsx-a11y flags these as redundant since it only
                        checks markup, not this CSS interaction. */}
                    {/* eslint-disable jsx-a11y/no-redundant-roles */}
                    <ul
                      className={styles.tags}
                      role="list"
                      aria-label={`${group.label} skills`}
                    >
                      {group.skills.map((skill) => (
                        <li
                          key={skill}
                          role="listitem"
                          className={
                            group.primary ? styles.tagPrimary : styles.tag
                          }
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                    {/* eslint-enable jsx-a11y/no-redundant-roles */}
                  </div>
                ))}
              </div>
            </LogPanel>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
