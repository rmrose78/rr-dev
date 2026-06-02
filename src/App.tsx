import { useState } from 'react'
import Nav from '@/components/layout/Nav'
import Hero from '@/components/sections/Hero'

export default function App() {
  const [contactOpen, setContactOpen] = useState(false)

  return (
    <>
      <Nav onContactClick={() => setContactOpen(true)} />
      <main>
        <Hero onContactClick={() => setContactOpen(true)} />
      </main>
    </>
  )
}
