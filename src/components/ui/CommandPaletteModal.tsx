import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import styles from './CommandPaletteModal.module.scss'

interface CommandItem {
  id: string
  title: string
  subtitle: string
  category: 'Navigation' | 'Projects' | 'Links'
  action: () => void
}

interface CommandPaletteModalProps {
  isOpen: boolean
  onClose: () => void
}

function navigateToSection(hash: string) {
  const elem = document.querySelector(hash)
  if (elem) {
    elem.scrollIntoView({ behavior: 'smooth' })
  }
}

export default function CommandPaletteModal({
  isOpen,
  onClose,
}: CommandPaletteModalProps) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const reducedMotion = useReducedMotion()
  const inputRef = useRef<HTMLInputElement>(null)

  const COMMANDS: CommandItem[] = [
    {
      id: 'nav-hero',
      title: 'Hero Section',
      subtitle: 'Jump to top of page',
      category: 'Navigation',
      action: () => {
        navigateToSection('#hero')
        onClose()
      },
    },
    {
      id: 'nav-about',
      title: 'About / Dispatch',
      subtitle: 'Background, #VetsWhoCode, Stack',
      category: 'Navigation',
      action: () => {
        navigateToSection('#about')
        onClose()
      },
    },
    {
      id: 'nav-projects',
      title: 'Fieldwork Projects',
      subtitle: 'ResearchPulse & ELPA Website case studies',
      category: 'Navigation',
      action: () => {
        navigateToSection('#projects')
        onClose()
      },
    },
    {
      id: 'nav-testimonials',
      title: 'Testimonials',
      subtitle: 'Peer recommendations and feedback',
      category: 'Navigation',
      action: () => {
        navigateToSection('#testimonials')
        onClose()
      },
    },
    {
      id: 'nav-contact',
      title: 'Contact',
      subtitle: 'Get in touch & direct dispatch link',
      category: 'Navigation',
      action: () => {
        navigateToSection('#contact')
        onClose()
      },
    },
    {
      id: 'proj-researchpulse',
      title: 'ResearchPulse (Live Site)',
      subtitle: 'Biomedical research discovery tool',
      category: 'Projects',
      action: () => {
        window.open('https://researchpulsehq.com/', '_blank')
        onClose()
      },
    },
    {
      id: 'proj-elpa',
      title: 'ELPA Website (Live Site)',
      subtitle: 'Donated preservation alliance rebuild',
      category: 'Projects',
      action: () => {
        window.open('https://eaglelakepreservationalliance.netlify.app/', '_blank')
        onClose()
      },
    },
    {
      id: 'link-github',
      title: 'GitHub Profile',
      subtitle: 'github.com/rmrose78',
      category: 'Links',
      action: () => {
        window.open('https://github.com/rmrose78', '_blank')
        onClose()
      },
    },
    {
      id: 'link-linkedin',
      title: 'LinkedIn Profile',
      subtitle: 'linkedin.com/in/ryan-rose',
      category: 'Links',
      action: () => {
        window.open('https://www.linkedin.com/in/ryan-rose-272626170/', '_blank')
        onClose()
      },
    },
  ]

  const filteredCommands = COMMANDS.filter((cmd) => {
    const q = query.toLowerCase().trim()
    if (!q) return true
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.subtitle.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q)
    )
  })

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50)
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose()
        }
      }

      window.addEventListener('keydown', handleKeyDown)
      return () => {
        clearTimeout(timer)
        window.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [isOpen, onClose])

  const handleKeyDownInput = (e: React.KeyboardEvent) => {
    if (filteredCommands.length === 0) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      filteredCommands[selectedIndex]?.action()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="presentation"
          className={styles.backdrop}
          onClick={onClose}
          data-testid="command-palette-backdrop"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette quick navigation"
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <div className={styles.searchBar}>
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.searchIcon}
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setSelectedIndex(0)
                }}
                onKeyDown={handleKeyDownInput}
                placeholder="Type a command or search..."
                className={styles.input}
                aria-label="Search commands and sections"
              />
              <span className={styles.kbdHint} aria-hidden="true">
                ESC
              </span>
            </div>

            <div className={styles.listContainer}>
              {filteredCommands.length > 0 ? (
                <ul className={styles.list} role="listbox" aria-label="Command results">
                  {filteredCommands.map((cmd, idx) => {
                    const isSelected = idx === selectedIndex
                    return (
                      <li
                        key={cmd.id}
                        role="option"
                        tabIndex={0}
                        aria-selected={isSelected}
                        className={`${styles.item} ${isSelected ? styles.selectedItem : ''}`}
                        onClick={cmd.action}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            cmd.action()
                          }
                        }}
                        onMouseEnter={() => setSelectedIndex(idx)}
                      >
                        <div className={styles.itemText}>
                          <span className={styles.itemTitle}>{cmd.title}</span>
                          <span className={styles.itemSubtitle}>{cmd.subtitle}</span>
                        </div>
                        <span className={styles.itemBadge}>{cmd.category}</span>
                      </li>
                    )
                  })}
                </ul>
              ) : (
                <div className={styles.emptyState}>No matching commands found.</div>
              )}
            </div>

            <div className={styles.footer}>
              <span>Navigation: ↑ ↓ Arrow keys</span>
              <span>Execute: ↵ Enter</span>
              <span>Close: ESC</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
