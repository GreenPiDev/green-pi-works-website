import { t, type Lang } from '../utils/i18n'
import { css } from '../utils/css'

export default function About({ lang }: { lang: Lang }) {
  const cards = [1, 2, 3, 4, 5, 6]
  return (
    <section className="fullscreen-about-section" id="about">
      <div id="mission" style={css('position: absolute; top: -40px; left: 0;')}></div>

      <div className="about-mission-header">
        <span className="eyebrow">
          <span className="eyebrow-line"></span>
          <span {...t(lang, 'about_eyebrow')} />
        </span>
        <h2 {...t(lang, 'about_title')} />
        <p {...t(lang, 'about_desc')} />
      </div>

      <div className="about-mission-grid">
        {cards.map((n) => (
          <div className="about-mission-card" key={n}>
            <h3 {...t(lang, `card${n}_title`)} />
            <p {...t(lang, `card${n}_desc`)} />
          </div>
        ))}
      </div>
    </section>
  )
}
