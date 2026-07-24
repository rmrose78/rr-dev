import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import styles from './Skills.module.scss'

const SKILL_GROUPS = [
  {
    label: 'Core Frontend',
    primary: true,
    skills: ['TypeScript', 'React', 'JavaScript', 'C# / MVC', 'Sass / SCSS'],
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
      'Sketch',
      'CI/CD',
      'Azure DevOps',
      'A/B Testing (Optimizely)',
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

export default function Skills() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="skills" aria-labelledby="skills-heading">
      <div className={styles.section}>
        <motion.div
          variants={revealVariants}
          initial={shouldReduceMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <p className={styles.sectionLabel}>// 02 Skills</p>
          <div className={styles.divider} />
          <h2 className={styles.title} id="skills-heading">
            What I've been working with.
          </h2>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={revealVariants}
          initial={shouldReduceMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {SKILL_GROUPS.map((group) => (
            <div key={group.label} className={styles.group}>
              <p className={styles.groupLabel}>{group.label}</p>
              {/* list-style: none strips list semantics from the a11y tree
                  in Safari/VoiceOver unless role="list"/"listitem" are
                  explicit — jsx-a11y flags these as redundant since it only
                  checks markup, not this CSS interaction. */}
              {/* eslint-disable jsx-a11y/no-redundant-roles */}
              <ul
                className={styles.pills}
                role="list"
                aria-label={`${group.label} skills`}
              >
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    role="listitem"
                    className={group.primary ? styles.pillPrimary : styles.pill}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
              {/* eslint-enable jsx-a11y/no-redundant-roles */}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
