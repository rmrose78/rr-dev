import { useState, useEffect } from 'react'
import styles from './Nav.module.scss'
import GitHubIcon from '../ui/GitHubIcon'
import LinkedInIcon from '../ui/LinkedInIcon'
import CommandPaletteModal from '../ui/CommandPaletteModal'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
]

interface NavProps {
  onContactClick: () => void
}

export default function Nav({ onContactClick }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)

  useEffect(() => {
    function handleGlobalKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setPaletteOpen((prev) => !prev)
      }
    }

    window.addEventListener('keydown', handleGlobalKeyDown)
    return () => window.removeEventListener('keydown', handleGlobalKeyDown)
  }, [])

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
          Ryan Rose
        </a>

        <ul className={styles.navCenter}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>

        <div className={styles.navRight}>
          <button
            className={styles.cmdBtn}
            onClick={() => setPaletteOpen(true)}
            aria-label="Open command search modal"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span>Search</span>
            <kbd className={styles.kbd}>⌘K</kbd>
          </button>

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
            Send a Message
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

      <nav
        id="mobile-menu"
        aria-label="Mobile navigation"
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
          <a href={link.href} key={link.href} onClick={closeMenu}>
            {link.label}
          </a>
        ))}

        <div className={styles.mobileIcons}>
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

        <button
          className={styles.cta}
          onClick={() => {
            onContactClick()
            closeMenu()
          }}
          aria-label="Open Contact Form"
        >
          Send a Message
        </button>
      </nav>

      <CommandPaletteModal
        isOpen={paletteOpen}
        onClose={() => setPaletteOpen(false)}
      />
    </>
  )
}
