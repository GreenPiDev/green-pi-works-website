import { useCallback, useEffect, useRef, useState } from 'react'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Hero from './components/Hero'
import ProjectModals from './components/ProjectModals'
import Toast from './components/Toast'
import Trusted from './components/Trusted'
import { projectsEN, projectsTR, type Project } from './data/projects'
import type { Lang } from './utils/i18n'

function initialLang(): Lang {
  try {
    return localStorage.getItem('gpw_lang') === 'en' ? 'en' : 'tr'
  } catch {
    return 'tr'
  }
}

export default function App() {
  const [lang, setLang] = useState<Lang>(initialLang)
  const [projectIndex, setProjectIndex] = useState(0)
  const [termOpen, setTermOpen] = useState(false)
  const [demoOpen, setDemoOpen] = useState(false)
  const [demoFullscreen, setDemoFullscreen] = useState(false)
  const [toastShow, setToastShow] = useState(false)
  const toastTimer = useRef<number | undefined>(undefined)

  // setLanguage(): localStorage + <html lang>
  useEffect(() => {
    try {
      localStorage.setItem('gpw_lang', lang)
    } catch {
      /* yoksay */
    }
    document.documentElement.lang = lang
  }, [lang])

  const toggleLanguage = useCallback(() => setLang((l) => (l === 'tr' ? 'en' : 'tr')), [])

  // Carousel kartına tıklanınca (project-carousel.js -> window.openProjectTerminal)
  useEffect(() => {
    window.openProjectTerminal = (project: Project) => {
      let idx = 0
      for (let i = 0; i < projectsTR.length; i++) {
        if (
          project.title === projectsTR[i].title ||
          project.title === projectsEN[i].title ||
          (project.image && project.image === projectsTR[i].image)
        ) {
          idx = i
          break
        }
      }
      setProjectIndex(idx)
      setTermOpen(true)
    }
    return () => {
      delete window.openProjectTerminal
    }
  }, [])

  const closeTerm = () => setTermOpen(false)
  const openDemo = () => {
    setTermOpen(false)
    setDemoFullscreen(false)
    setDemoOpen(true)
  }
  const closeDemo = () => setDemoOpen(false)

  const showToast = () => {
    setToastShow(true)
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToastShow(false), 5000)
  }

  return (
    <>
      <ProjectModals
        lang={lang}
        projectIndex={projectIndex}
        termOpen={termOpen}
        demoOpen={demoOpen}
        demoFullscreen={demoFullscreen}
        onCloseTerm={closeTerm}
        onOpenDemo={openDemo}
        onCloseDemo={closeDemo}
        onToggleFullscreen={() => setDemoFullscreen((f) => !f)}
      />
      <Hero lang={lang} onToggleLanguage={toggleLanguage} />
      <About lang={lang} />
      <Trusted lang={lang} />
      <Contact lang={lang} onSuccess={showToast} />
      <Toast lang={lang} show={toastShow} onClose={() => setToastShow(false)} />
      <Footer lang={lang} />
    </>
  )
}
