import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

interface NavigationProps {}

const Navigation: React.FC<NavigationProps> = () => {
  const navRef = useRef<HTMLElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    // Animate nav on scroll
    gsap.to(nav, {
      scrollTrigger: {
        trigger: 'main',
        start: 'top top',
        end: 'bottom top',
        onUpdate: (self) => {
          if (self.progress > 0.1) {
            nav.classList.add('nav-scrolled')
          } else {
            nav.classList.remove('nav-scrolled')
          }
        }
      }
    })

    // Animate nav items on load
    gsap.fromTo('.nav-item', 
      { opacity: 0, y: -20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.5
      }
    )
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <nav ref={navRef} className="navigation">
      <div className="nav-container">
        <div className="nav-logo">
          <span className="logo-text">Portfolio</span>
        </div>
        
        <div className={`nav-menu ${isMenuOpen ? 'nav-menu-open' : ''}`}>
          <button 
            className="nav-item" 
            onClick={() => scrollToSection('hero')}
          >
            Home
          </button>
          <button 
            className="nav-item" 
            onClick={() => scrollToSection('about')}
          >
            About
          </button>
          <button 
            className="nav-item" 
            onClick={() => scrollToSection('projects')}
          >
            Projects
          </button>
          <button 
            className="nav-item" 
            onClick={() => scrollToSection('contact')}
          >
            Contact
          </button>
        </div>

        <button 
          className="nav-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  )
}

export default Navigation 