import { useReducedMotion } from '@/hooks/useReducedMotion'
import styles from './ConstellationField.module.scss'

// Shape (node/line/field-star counts) per cluster, matching the transcribed
// data in ConstellationField.module.scss (cluster0..5 and their nested
// cluster{n}Node{n}/Line{n}/FieldStar{n} classes) -- position/color/timing
// live entirely in the SCSS module, not here.
const CLUSTER_SHAPES = [
  { nodes: 4, lines: 3, fieldStars: 5 },
  { nodes: 4, lines: 3, fieldStars: 4 },
  { nodes: 3, lines: 2, fieldStars: 3 },
  { nodes: 4, lines: 3, fieldStars: 4 },
  { nodes: 4, lines: 3, fieldStars: 3 },
  { nodes: 3, lines: 2, fieldStars: 3 },
]

export default function ConstellationField() {
  const reducedMotion = useReducedMotion()

  return (
    <div
      className={`${styles.constellationField} ${reducedMotion ? styles.reducedMotion : ''}`}
    >
      {CLUSTER_SHAPES.map((shape, c) => (
        <div key={c} className={`${styles.cluster} ${styles[`cluster${c}`]}`}>
          {Array.from({ length: shape.lines }, (_, n) => (
            <span
              key={`line-${n}`}
              className={`${styles.line} ${styles[`cluster${c}Line${n}`]}`}
            />
          ))}
          {Array.from({ length: shape.nodes }, (_, n) => (
            <span
              key={`node-${n}`}
              className={`${styles.node} ${styles[`cluster${c}Node${n}`]}`}
            />
          ))}
          {Array.from({ length: shape.fieldStars }, (_, n) => (
            <span
              key={`field-star-${n}`}
              className={`${styles.fieldStar} ${styles[`cluster${c}FieldStar${n}`]}`}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
