import { useState } from 'react'
import Modal from './Modal'
import styles from './ContactModal.module.scss'

interface ContactModalProps {
  open: boolean
  onClose: () => void
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

interface FormFields {
  name: string
  email: string
  message: string
}

const INITIAL_FIELDS: FormFields = {
  name: '',
  email: '',
  message: '',
}

export default function ContactModal({ open, onClose }: ContactModalProps) {
  const [fields, setFields] = useState<FormFields>(INITIAL_FIELDS)
  const [status, setStatus] = useState<FormStatus>('idle')

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('submitting')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          ...fields,
        }),
      })

      const data = await res.json()
      const nextStatus = data.success ? 'success' : 'error'
      setStatus(nextStatus)
    } catch {
      setStatus('error')
    }
  }

  function handleClose() {
    setStatus('idle')
    setFields(INITIAL_FIELDS)
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Get in Touch"
      titleVisible={false}
    >
      {status === 'success' ? (
        <div className={styles.successState}>
          <p className={styles.successIcon}>✓</p>
          <h2 className={styles.modalTitle}>Message sent.</h2>
          <p className={styles.modalSub}>
            Thanks for reaching out. I'll get back to you soon.
          </p>
          <button className={styles.btnPrimary} onClick={handleClose}>
            Close
          </button>
        </div>
      ) : (
        <>
          <h2 className={styles.modalTitle} id="modal-heading">
            Get in Touch
          </h2>
          <p className={styles.modalSub}>ryan.rose.dev@gmail.com</p>

          <form onSubmit={handleSubmit} noValidate>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="modal-name">
                Name
              </label>
              <input
                className={styles.input}
                id="modal-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={fields.name}
                onChange={handleChange}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="modal-email">
                Email
              </label>
              <input
                className={styles.input}
                id="modal-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={fields.email}
                onChange={handleChange}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="modal-message">
                Message
              </label>
              <textarea
                className={styles.textarea}
                id="modal-message"
                name="message"
                required
                value={fields.message}
                onChange={handleChange}
              />
            </div>

            {status === 'error' && (
              <p className={styles.errorMsg} role="alert">
                Something went wrong. Please try again or email me directly.
              </p>
            )}

            <button
              className={styles.btnPrimary}
              type="submit"
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </>
      )}
    </Modal>
  )
}
