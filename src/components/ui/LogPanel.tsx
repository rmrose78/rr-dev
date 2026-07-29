import type { ReactNode } from 'react'
import styles from './LogPanel.module.scss'

interface LogPanelProps {
  label: string
  footer?: string
  className?: string
  children: ReactNode
}

export default function LogPanel({
  label,
  footer,
  className,
  children,
}: LogPanelProps) {
  return (
    <div className={`${styles.panel} ${className ?? ''}`}>
      <div className={styles.bar}>
        <span className={styles.dot} aria-hidden="true" />
        <span className={styles.label}>{label}</span>
      </div>
      <div className={styles.body}>{children}</div>
      {footer && <div className={styles.foot}>{footer}</div>}
    </div>
  )
}
