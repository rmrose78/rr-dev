import { useState } from 'react'
import Nav from '@/components/layout/Nav'
import Hero from '@/components/sections/Hero'
import ContactModal from '@/components/ui/ContactModal'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'

export default function App() {
  const [contactOpen, setContactOpen] = useState(false)

  return (
    <>
      <Nav onContactClick={() => setContactOpen(true)} />
      <main>
        <Hero onContactClick={() => setContactOpen(true)} />
        <About />
        <Skills />
        <ContactModal
          open={contactOpen}
          onClose={() => setContactOpen(false)}
        />
      </main>
    </>
  )
}
