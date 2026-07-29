import { useStarTrail } from '@/hooks/useStarTrail'
import Starfield from './Starfield'
import ConstellationField from './ConstellationField'
import styles from './PageBackground.module.scss'

export default function PageBackground() {
  useStarTrail()

  return (
    <div className={styles.background} aria-hidden="true">
      <Starfield />
      <ConstellationField />
    </div>
  )
}
