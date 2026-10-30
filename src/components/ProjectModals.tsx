import { PROJECT_MODAL_DATA } from '../data/modalData'
import type { Lang } from '../utils/i18n'
import { css } from '../utils/css'

interface Props {
  lang: Lang
  projectIndex: number
  termOpen: boolean
  demoOpen: boolean
  demoFullscreen: boolean
  onCloseTerm: () => void
  onOpenDemo: () => void
  onCloseDemo: () => void
  onToggleFullscreen: () => void
}

const EXPAND_ICON = 'M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3'
const SHRINK_ICON = 'M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3m8 0h3a2 2 0 0 0 2-2v-3'

export default function ProjectModals(p: Props) {
  const { lang, projectIndex, demoFullscreen } = p
  const isEn = lang === 'en'
  const data = PROJECT_MODAL_DATA[lang]?.[projectIndex] ?? PROJECT_MODAL_DATA.tr[projectIndex]

  // ---- Demo modal hesapları ----
  const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  const isCrm =
    projectIndex === 1 ||
    (data.category && data.category.indexOf('CRM') !== -1) ||
    (data.title && data.title.indexOf('CRM') !== -1)
  const isWeb = projectIndex === 0

  const urlText = isCrm
    ? 'https://greenpiworks.com/crm/'
    : isWeb
      ? 'https://greenpi.com.tr/'
      : 'https://demo.greenpiworks.com/' + slug

  const aboutLabel = isEn ? 'About the Project' : 'Proje Hakkında'
  const scopeLabel = isEn ? 'Scope & Features' : 'Kapsam & Özellikler'
  const ctaText = isEn ? 'Get a Quote →' : 'Teklif Al →'
  const processLabel = isEn ? 'SERVICE PROCESS' : 'HİZMET SÜRECİ'
  const demoBtnText = isEn ? 'Explore Live Demo →' : 'Canlı Demoyu İncele →'
  const fallbackMsg = isEn
    ? 'A dedicated live interactive demo environment is being configured for this service. Please contact us for custom demonstrations.'
    : 'Bu hizmet için özel demo ortamı hazırlanıyor. Detaylar için bizimle iletişime geçin.'

  const sidePanel = (
    <div className="demo-side-panel">
      <div style={css('border-bottom:1px solid rgba(15,60,38,0.08); padding-bottom:10px;')}>
        <div
          style={css(
            'font-size:9px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:#15803d; margin-bottom:3px;',
          )}
        >
          GREEN PI WORKS
        </div>
        <h3>{data.title}</h3>
        <div style={css('font-size:10px; color:#557860; font-weight:600; margin-top:2px;')}>{data.category || ''}</div>
      </div>

      <div className="demo-side-section">
        <div className="demo-side-section-title">{aboutLabel}</div>
        <p style={css('font-size:14px; line-height:1.75; color:#3b5644;')}>{data.brandAbout}</p>
      </div>

      {data.highlights && data.highlights.length > 0 && (
        <div className="demo-side-section">
          <div className="demo-side-section-title">{scopeLabel}</div>
          <div style={css('display:flex; flex-direction:column; gap:12px; margin-top:2px;')}>
            {data.highlights.map((h, i) => (
              <div className="demo-side-feature" key={i}>
                {h}
              </div>
            ))}
          </div>
        </div>
      )}

      <a
        href="#contact"
        onClick={p.onCloseDemo}
        style={css(
          "display:block; background:#15803d; color:#fff; font-family:'Space Grotesk',sans-serif; font-weight:700; font-size:15px; padding:15px; border-radius:12px; text-align:center; margin-top:auto; text-decoration:none; box-shadow:0 4px 14px rgba(21,128,61,0.25); transition:all .2s;",
        )}
        onMouseOver={(e) => (e.currentTarget.style.background = '#14532d')}
        onMouseOut={(e) => (e.currentTarget.style.background = '#15803d')}
      >
        {ctaText}
      </a>
    </div>
  )

  return (
    <>
      {/* Project Detail Modal */}
      <div
        className={'light-term-backdrop' + (p.termOpen ? ' is-open' : '')}
        id="projTermModal"
        onClick={(e) => {
          if (e.target === e.currentTarget) p.onCloseTerm()
        }}
      >
        <div className="light-term-window">
          <div className="light-term-header">
            <div className="proj-modal-title" id="projTermTitle">
              {data.title}
            </div>
            <button className="proj-modal-close" onClick={p.onCloseTerm} aria-label="Kapat">
              ✕
            </button>
          </div>
          <div className="light-term-body" id="projTermBody">
            <div className="light-term-content-wrapper">
              {/* Description */}
              <div style={css('width:100%; max-width:1080px; margin:0 auto;')}>
                <p
                  style={css(
                    'color:#14532d; line-height:1.7; margin:0; font-size:clamp(22px, 1.9vw, 27px); font-weight:600; text-align:center;',
                  )}
                  dangerouslySetInnerHTML={{ __html: data.desc }}
                />
              </div>

              <div style={css('width:100%; max-width:1040px; height:1px; background:rgba(21,128,61,0.14); margin:12px auto;')} />

              {/* Features — 2 columns */}
              <div
                style={css(
                  'display:grid; grid-template-columns:1fr 1fr; gap:20px 64px; width:100%; max-width:1020px; margin:0 auto; text-align:left;',
                )}
              >
                {data.features.map((f, i) => (
                  <div
                    key={i}
                    style={css(
                      'display:flex; align-items:flex-start; gap:14px; font-size:19.5px; font-weight:600; color:#166534; line-height:1.5;',
                    )}
                  >
                    <span style={css('color:#15803d; font-size:22px; font-weight:900; flex-shrink:0; margin-top:1px;')}>
                      &#10003;
                    </span>
                    <span dangerouslySetInnerHTML={{ __html: f }} />
                  </div>
                ))}
              </div>

              <div style={css('width:100%; max-width:1040px; height:1px; background:rgba(21,128,61,0.14); margin:12px auto;')} />

              {/* Process steps */}
              <div style={css('width:100%; max-width:1040px; margin:0 auto; text-align:center;')}>
                <div
                  style={css(
                    'font-size:13.5px; font-weight:800; text-transform:uppercase; letter-spacing:0.14em; color:#15803d; margin-bottom:16px;',
                  )}
                >
                  {processLabel}
                </div>
                <div style={css('display:flex; gap:16px; flex-wrap:wrap; justify-content:center; align-items:center;')}>
                  {data.steps.map((s, i) => (
                    <span
                      key={i}
                      style={css(
                        'display:inline-flex; align-items:center; gap:12px; background:#f0faf4; border:1px solid rgba(21,128,61,0.25); border-radius:28px; padding:13px 26px; font-size:16.5px; font-weight:700; color:#143823;',
                      )}
                    >
                      <span
                        style={css(
                          'background:#15803d; color:#ffffff; font-size:13px; font-weight:800; width:28px; height:28px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center;',
                        )}
                      >
                        {i + 1}
                      </span>
                      <span dangerouslySetInnerHTML={{ __html: s }} />
                    </span>
                  ))}
                </div>
              </div>

              <button className="light-term-demo-btn" onClick={p.onOpenDemo}>
                {demoBtnText}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Project Demo Showcase Modal */}
      <div
        className={'demo-modal-backdrop' + (p.demoOpen ? ' is-open' : '')}
        id="projDemoModal"
        style={demoFullscreen ? { padding: '0' } : undefined}
        onClick={(e) => {
          if (e.target === e.currentTarget) p.onCloseDemo()
        }}
      >
        <div
          className="demo-window"
          style={
            demoFullscreen
              ? css('width:100vw; height:100vh; border-radius:0; max-width:100vw; max-height:100vh;')
              : undefined
          }
        >
          <div className="demo-browser-bar">
            <div className="light-term-dots">
              <span className="light-term-dot light-term-dot-red" onClick={p.onCloseDemo} title="Kapat"></span>
              <span className="light-term-dot light-term-dot-yellow" title="Simge Durumu"></span>
              <span className="light-term-dot light-term-dot-green" title="Büyüt"></span>
            </div>
            <div className="demo-url-box">
              <span>🔒</span>
              <span id="demoUrlText">{urlText}</span>
            </div>
            <button className="demo-fullscreen-btn" id="demoFullscreenBtn" onClick={p.onToggleFullscreen} title="Tam Ekran">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d={demoFullscreen ? SHRINK_ICON : EXPAND_ICON} />
              </svg>{' '}
              {demoFullscreen ? (isEn ? 'Minimize' : 'Küçült') : isEn ? 'Full Screen' : 'Tam Ekran'}
            </button>
            <button className="proj-modal-close" onClick={p.onCloseDemo} aria-label="Kapat">
              ✕
            </button>
          </div>
          <div className="demo-body" id="demoBody">
            {p.demoOpen &&
              (isCrm ? (
                <>
                  <iframe src="https://greenpiworks.com/crm/" title="Green Pi Works CRM Live Demo" allow="fullscreen" loading="lazy" />
                  {sidePanel}
                </>
              ) : isWeb ? (
                <>
                  <iframe src="https://greenpi.com.tr/" title="Green Pi Live Demo" allow="fullscreen" loading="lazy" />
                  {sidePanel}
                </>
              ) : (
                <>
                  <div
                    style={css(
                      'flex:1; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; background:#f8fbf9; gap:12px; padding:40px;',
                    )}
                  >
                    <div style={css("font-family:'Space Grotesk',sans-serif; font-size:22px; font-weight:700; color:#0e2016;")}>
                      {data.title}
                    </div>
                    <p style={css('color:#557860; font-size:14px; text-align:center; max-width:420px; line-height:1.7;')}>
                      {fallbackMsg}
                    </p>
                    <a
                      href="#contact"
                      onClick={p.onCloseDemo}
                      style={css(
                        "background:#15803d; color:#fff; font-family:'Space Grotesk',sans-serif; font-weight:700; padding:12px 28px; border-radius:10px; font-size:14px; text-decoration:none;",
                      )}
                    >
                      {ctaText}
                    </a>
                  </div>
                  {sidePanel}
                </>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}
