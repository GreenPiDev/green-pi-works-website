import { useEffect, useRef } from 'react'
import { projectsEN, projectsTR } from '../data/projects'
import { t, type Lang } from '../utils/i18n'

interface Props {
  lang: Lang
  onToggleLanguage: () => void
}

export default function Hero({ lang, onToggleLanguage }: Props) {
  const rootRef = useRef<HTMLElement>(null)
  const initialLang = useRef(lang)

  // 3D silindirik carousel (orijinal project-carousel.js) — bir kez başlatılır
  useEffect(() => {
    window.AssidProjectCarousel.init(rootRef.current, {
      projects: initialLang.current === 'en' ? projectsEN : projectsTR,
      config: {
        autoplayDuration: 60,
        dragSensitivity: 0.18,
        inertiaFriction: 0.88,
        segments: 9,
        curveAngle: 11,
        curveDepth: 16,
      },
    })
  }, [])

  // Dil değişince carousel metinlerini güncelle
  useEffect(() => {
    const api = window.AssidProjectCarousel
    if (api && typeof api.update === 'function') {
      api.update(lang === 'en' ? projectsEN : projectsTR)
    }
  }, [lang])

  return (
    <section ref={rootRef} className="hero-section assid-project-carousel" id="assid-carousel-main">
      {/* Nav */}
      <nav className="hero-nav">
        <a
          className="hud-brand brand"
          href="#home"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          <img
            src="/GREEN-PI-WORKS-VEKTOREL-LOGO.svg"
            alt="GREEN pi WORKS"
            style={{ height: 40, width: 'auto', display: 'block', padding: '0 0 0 6px' }}
          />
        </a>
        <div className="site-nav">
          <a href="#about" {...t(lang, 'nav_about')} />
          <a href="#mission" {...t(lang, 'nav_mission')} />
          <a href="#contact" {...t(lang, 'nav_contact')} />
          <a className="nav-cta" href="#contact" {...t(lang, 'nav_cta')} />
          <button
            className="lang-toggle-btn"
            id="langToggleBtn"
            onClick={onToggleLanguage}
            title="Switch Language / Dili Değiştir"
            aria-label="Language Toggle"
          >
            <span id="langCodeDisplay">{lang === 'tr' ? 'EN' : 'TR'}</span>
          </button>
        </div>
      </nav>

      {/* Copy overlay */}
      <div className="hero-copy">
        <h1 className="hero-title" {...t(lang, 'hero_title')} />
        <div className="hero-actions">
          <a className="btn btn--primary" href="#contact" {...t(lang, 'hero_btn_primary')} />
          <a className="btn btn--ghost" href="#about" {...t(lang, 'hero_btn_ghost')} />
        </div>
      </div>

      {/* Carousel fills hero */}
      <div className="hero-carousel-wrap">
        <div className="assid-project-carousel__nav"></div>
        <div className="assid-project-carousel__stage">
          <div className="assid-project-carousel__tilt">
            <div className="assid-project-carousel__ring"></div>
          </div>
        </div>
      </div>

      {/* Category Legend Buttons positioned at the bottom of hero section */}
      <div className="assid-project-carousel__legend hero-legend-inline"></div>
    </section>
  )
}
