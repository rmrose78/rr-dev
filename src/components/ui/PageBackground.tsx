import styles from './PageBackground.module.scss'

function Cluster({
  className,
  showDots = false,
}: {
  className: string
  showDots?: boolean
}) {
  return (
    <div className={`${styles.cluster} ${className}`}>
      <div className={styles.ringOuter} />
      <div className={styles.grid} />
      <div className={styles.crossWrapper}>
        <div className={styles.crossH} />
        <div className={styles.crossV} />
      </div>
      {showDots && (
        <>
          <div className={styles.dotCenter} />
          <div className={styles.dotTop} />
          <div className={styles.dotRight} />
          <div className={styles.dotBottom} />
          <div className={styles.dotLeft} />
        </>
      )}
    </div>
  )
}
export default function PageBackground() {
  return (
    <div className={styles.background} aria-hidden="true">
      <Cluster className={styles.cluster1} showDots />
      <Cluster className={styles.cluster2} />
      <Cluster className={styles.cluster3} />
      <Cluster className={styles.cluster4} />
      <Cluster className={styles.cluster5} />
    </div>
  )
}
