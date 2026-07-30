import EmailIcon from '@/components/ui/EmailIcon'
import GitHubIcon from '@/components/ui/GitHubIcon'
import LinkedInIcon from '@/components/ui/LinkedInIcon'
import styles from './Footer.module.scss'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.info}>
        <span className={styles.mono}>
          Ryan Rose &copy; {new Date().getFullYear()}
        </span>
        <div className={styles.quote}>
          <p className={styles.quoteText}>
            &ldquo;I must not fear. Fear is the mind-killer. Fear is the
            little-death that brings total obliteration. I will face my
            fear&hellip;&rdquo;
          </p>
          <p className={styles.quoteSource}>Frank Herbert, Dune</p>
        </div>
      </div>
      <div className={styles.links}>
        <a href="mailto:ryan.rose.dev@gmail.com" aria-label="Email">
          <EmailIcon />
        </a>
        <a
          href="https://github.com/rmrose78"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
        >
          <GitHubIcon />
        </a>
        <a
          href="https://www.linkedin.com/in/ryan-rose-272626170/"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
        >
          <LinkedInIcon />
        </a>
      </div>
    </footer>
  )
}
