import { useReducedMotion } from '@/hooks/useReducedMotion'
import styles from './Starfield.module.scss'

// Counts match the transcribed data in Starfield.module.scss (star0..131,
// shootingStar0..8) -- position/color/animation live entirely in the SCSS
// module, not here, per CLAUDE.md's no-inline-styles rule.
const STAR_COUNT = 132
const SHOOTING_STAR_COUNT = 9

export default function Starfield() {
  const reducedMotion = useReducedMotion()

  return (
    <div
      className={`${styles.starfield} ${reducedMotion ? styles.reducedMotion : ''}`}
    >
      {Array.from({ length: STAR_COUNT }, (_, i) => (
        <span
          key={i}
          className={`${styles.star} ${styles[`star${i}`]}`}
        />
      ))}
      {Array.from({ length: SHOOTING_STAR_COUNT }, (_, i) => (
        <span
          key={i}
          className={`${styles.shootingStar} ${styles[`shootingStar${i}`]}`}
        />
      ))}
    </div>
  )
}
