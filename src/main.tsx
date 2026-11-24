import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import About from './pages/About'
import Contact from './pages/Contact'
import { installRouter, usePath } from './router'
import './index.css'

type Page = 'home' | 'about' | 'contact'

const titles: Record<Page, string> = {
  home: 'OPÉRA — Ultra Volume Mascara',
  about: 'About — OPÉRA',
  contact: 'Contact — OPÉRA',
}

function pageFor(path: string): Page {
  const clean = path.replace(/\/+$/, '')
  if (clean === '/about') return 'about'
  if (clean === '/contact') return 'contact'
  return 'home'
}

function Root() {
  const page = pageFor(usePath())

  useEffect(() => {
    document.title = titles[page]
  }, [page])

  if (page === 'about') return <About />
  if (page === 'contact') return <Contact />
  return <App />
}

installRouter()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
