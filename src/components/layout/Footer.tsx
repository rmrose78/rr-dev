import styles from './Footer.module.scss'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.mono}>
        Ryan Rose &copy; {new Date().getFullYear()}
      </span>
      <div className={styles.links}>
        <a href="https://github.com/rmrose78" target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/ryan-rose-272626170/"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  )
}
