import { useEffect, useState } from 'react'

const PHRASES = [
  'Frontend Craftsman.',
  'TypeScript Developer.',
  'Accessibility Advocate.',
  'Clean Code Enthusiast.',
  'React Engineer.',
]

const TYPE_SPEED = 80
const DELETE_SPEED = 50
const PAUSE_MS = 1800

export function useTypewriter(disabled: boolean): string {
  const [text, setText] = useState(PHRASES[0])

  useEffect(
    function typewriterEffect() {
      if (disabled) {
        return
      }

      let phraseIndex = 0
      let charIndex = 0
      let deleting = false
      let timer: ReturnType<typeof setTimeout>

      function tick() {
        const phrase = PHRASES[phraseIndex]

        if (!deleting) {
          charIndex++
          setText(phrase.slice(0, charIndex))

          if (charIndex === phrase.length) {
            deleting = true
            timer = setTimeout(tick, PAUSE_MS)
            return
          }
        } else {
          charIndex--
          setText(phrase.slice(0, charIndex))

          if (charIndex === 0) {
            deleting = false
            phraseIndex = (phraseIndex + 1) % PHRASES.length
          }
        }
        timer = setTimeout(tick, deleting ? DELETE_SPEED : TYPE_SPEED)
      }

      timer = setTimeout(tick, PAUSE_MS)

      return () => clearTimeout(timer)
    },
    [disabled]
  )

  return text
}
