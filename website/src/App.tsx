import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import Navigation from './components/Navigation'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

function App() {
  const appRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize GSAP animations
    const ctx = gsap.context(() => {
      // Global animations setup
      gsap.set('.fade-in', { opacity: 0, y: 50 })
      
      // Scroll-triggered animations
      gsap.utils.toArray('.fade-in').forEach((element: any) => {
        gsap.to(element, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        })
      })
    }, appRef)

    return () => ctx.revert() // Cleanup
  }, [])

  return (
    <div ref={appRef} className="app">
      <Navigation />
      <main>
        <Home />
        <About />
        <Projects />
        <Contact />
      </main>
    </div>
  )
}

export default App
