import { useState } from 'react'
import Nav from '@/components/layout/Nav'
import Hero from '@/components/sections/Hero'
import ContactModal from '@/components/ui/ContactModal'
import About from '@/components/sections/About'
import Testimonials from '@/components/sections/Testimonials'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/layout/Footer'
import PageBackground from '@/components/ui/PageBackground'
import SectionDivider from '@/components/ui/SectionDivider'
import styles from './App.module.scss'

export default function App() {
  const [contactOpen, setContactOpen] = useState(false)

  function openContactModal(): void {
    setContactOpen(true)
  }

  function closeContactModal(): void {
    setContactOpen(false)
  }

  return (
    <>
      <a href="#main-content" className={styles.skipLink}>
        Skip to main content
      </a>
      <Nav onContactClick={openContactModal} />

      <main id="main-content" className={styles.main}>
        <PageBackground />
        <Hero />
        <SectionDivider compact />
        <About />
        <SectionDivider />
        <Testimonials />
        <Contact onContactClick={openContactModal} />
      </main>

      <Footer />
      <ContactModal open={contactOpen} onClose={closeContactModal} />
    </>
  )
}
