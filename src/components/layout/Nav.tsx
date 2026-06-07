import { useState } from 'react'
import styles from './Nav.module.scss'
import GitHubIcon from '../ui/GitHubIcon'
import LinkedInIcon from '../ui/LinkedInIcon'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Recommendations', href: '#testimonials' },
]

interface NavProps {
  onContactClick: () => void
}

export default function Nav({ onContactClick }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  function toggleMenu() {
    setMenuOpen((prev) => {
      document.body.style.overflow = prev ? '' : 'hidden'
      return !prev
    })
  }

  function closeMenu() {
    setMenuOpen(false)
    document.body.style.overflow = ''
  }

  return (
    <>
      <nav className={styles.nav} aria-label="Main navigation">
        <a href="#hero" className={styles.logo}>
          rr<span>.dev</span>
        </a>

        <ul className={styles.navCenter}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>

        <div className={styles.navRight}>
          <a
            href="https://github.com/rmrose78"
            className={styles.iconLink}
            target="_blank"
            rel="noreferrer"
          >
            <GitHubIcon /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/ryan-rose-272626170/"
            className={styles.iconLink}
            target="_blank"
            rel="noreferrer"
          >
            <LinkedInIcon /> LinkedIn
          </a>

          <button
            className={styles.cta}
            onClick={(e) => {
              e.stopPropagation()
              onContactClick()
            }}
            aria-label="Open Contact Form"
          >
            Get in touch
          </button>
        </div>

        <button
          className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`}
        aria-hidden={!menuOpen}
      >
        <button
          className={styles.mobileClose}
          onClick={closeMenu}
          aria-label="Close navigation menu"
        >
          &times;
        </button>
        {NAV_LINKS.map((link) => (
          <a
            href={link.href}
            key={link.href}
            className="mobile-nav-link"
            onClick={closeMenu}
          >
            {link.label}
          </a>
        ))}

        <div className={styles.mobileIcons}>
          <a
            href="https://github.com/rmrose78"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Profile"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/ryan-rose-272626170/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn Profile"
          >
            LinkedIn
          </a>
          <button
            className={styles.cta}
            onClick={() => {
              onContactClick()
              closeMenu()
            }}
            aria-label="Open Contact Form"
          >
            Get in Touch
          </button>
        </div>
      </div>
    </>
  )
}
