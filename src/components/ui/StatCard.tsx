import styles from './StatCard.module.scss'

interface StatCardProps {
  label: string
  value: string
  sub: string
  compact?: boolean
}

export default function StatCard({
  label,
  value,
  sub,
  compact,
}: StatCardProps) {
  return (
    <div className={`${styles.card} ${compact ? styles.compact : ''}`}>
      <p className={styles.label}>{label}</p>
      <p className={styles.value}>{value}</p>
      <p className={styles.sub}>{sub}</p>
    </div>
  )
}
