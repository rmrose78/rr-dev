import styles from './StatCard.module.scss'

interface StatCardProps {
  label: string
  value: string
  sub: string
}

export default function StatCard({ label, value, sub }: StatCardProps) {
  return (
    <div className={styles.card}>
      <p className={styles.label}>{label}</p>
      <p className={styles.value}>{value}</p>
      <p className={styles.sub}>{sub}</p>
    </div>
  )
}
