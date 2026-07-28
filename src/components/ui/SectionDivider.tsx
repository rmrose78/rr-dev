import { useReducedMotion } from '@/hooks/useReducedMotion'
import styles from './SectionDivider.module.scss'

interface SectionDividerProps {
  compact?: boolean
}

export default function SectionDivider({ compact }: SectionDividerProps) {
  const reducedMotion = useReducedMotion()

  return (
    <div
      className={`${styles.divider} ${compact ? styles.compact : ''}`}
      aria-hidden="true"
    >
      <span className={styles.line} />
      <svg
        className={`${styles.orbit} ${reducedMotion ? styles.reducedMotion : ''}`}
        viewBox="0 0 52 52"
      >
        <circle className={styles.backgroundStar} cx={6} cy={9} r={1} />
        <circle className={styles.backgroundStar} cx={46} cy={42} r={1} />
        <ellipse className={styles.orbitRing} cx={26} cy={26} rx={21} ry={8.5} />
        <g className={styles.orbitMoonGroup}>
          <circle className={styles.orbitMoon} cx={47} cy={26} r={2} />
        </g>
        <circle className={styles.orbitBody} cx={26} cy={26} r={3.2} />
      </svg>
      <span className={styles.line} />
    </div>
  )
}
