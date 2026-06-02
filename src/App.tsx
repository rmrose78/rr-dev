import { useEffect, useState } from 'react'
import Nav from '@/components/layout/Nav'
import Hero from '@/components/sections/Hero'
import ContactModal from './components/ui/ContactModal'

export default function App() {
  const [contactOpen, setContactOpen] = useState(false)

  useEffect(() => {
    console.log(contactOpen)
  }, [contactOpen])

  return (
    <>
      <Nav onContactClick={() => setContactOpen(true)} />
      <main>
        <Hero onContactClick={() => setContactOpen(true)} />

        <ContactModal
          open={contactOpen}
          onClose={() => setContactOpen(false)}
        />
      </main>
    </>
  )
}
