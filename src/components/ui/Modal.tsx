import * as Dialog from '@radix-ui/react-dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { AnimatePresence, motion } from 'framer-motion'
import styles from './Modal.module.scss'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  titleVisible?: boolean
}

export default function Modal({
  open,
  onClose,
  title,
  children,
  titleVisible = false,
}: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <Dialog.Portal>
        <AnimatePresence>
          {open && (
            <>
              <Dialog.Overlay asChild>
                <motion.div
                  className={styles.overlay}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              </Dialog.Overlay>

              <Dialog.Content
                className={styles.contentWrapper}
                aria-describedby={undefined}
              >
                {titleVisible ? (
                  <Dialog.Title className={styles.title}>{title}</Dialog.Title>
                ) : (
                  <VisuallyHidden>
                    <Dialog.Title>{title}</Dialog.Title>
                  </VisuallyHidden>
                )}

                <motion.div
                  className={styles.modal}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                >
                  <Dialog.Close
                    className={styles.closeBtn}
                    aria-label="Close modal"
                  >
                    &times;
                  </Dialog.Close>

                  {children}
                </motion.div>
              </Dialog.Content>
            </>
          )}
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
