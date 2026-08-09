import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import styles from './ImageLightboxModal.module.scss'

interface ImageLightboxModalProps {
  isOpen: boolean
  onClose: () => void
  src: string
  alt: string
  title: string
  liveUrl?: string
  repoUrl?: string
}

export default function ImageLightboxModal({
  isOpen,
  onClose,
  src,
  alt,
  title,
  liveUrl,
  repoUrl,
}: ImageLightboxModalProps) {
  const reducedMotion = useReducedMotion()
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement
      closeBtnRef.current?.focus()

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose()
        }
      }

      window.addEventListener('keydown', handleKeyDown)
      return () => {
        window.removeEventListener('keydown', handleKeyDown)
        triggerRef.current?.focus()
      }
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="presentation"
          className={styles.backdrop}
          onClick={onClose}
          data-testid="lightbox-backdrop"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Demo lightbox for ${title}`}
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className={styles.header}>
              <h2 className={styles.title}>{title}</h2>
              <button
                ref={closeBtnRef}
                className={styles.closeBtn}
                onClick={onClose}
                aria-label="Close demo modal"
              >
                ✕
              </button>
            </div>

            <div className={styles.imageWrapper}>
              <img className={styles.image} src={src} alt={alt} />
            </div>

            <div className={styles.actions}>
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.btnPrimary}
                >
                  Visit Live Site &rarr;
                </a>
              )}
              {repoUrl && (
                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.btnSecondary}
                >
                  View GitHub Source &#8599;
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
