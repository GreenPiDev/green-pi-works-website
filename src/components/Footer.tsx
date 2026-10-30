import { t, type Lang } from '../utils/i18n'

const MAP_URL =
  "https://www.google.com/maps/place/39%C2%B052'37.9%22N+32%C2%B039'53.9%22E/@39.8771896,32.6623879,17z/data=!3m1!4b1!4m4!3m3!8m2!3d39.8771896!4d32.6649628?hl=tr&entry=ttu&g_ep=EgoyMDI2MDgxMS4wIKXMDSoASAFQAw%3D%3D"

export default function Footer({ lang }: { lang: Lang }) {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        {/* Col 1: Brand (Left) */}
        <div className="footer-brand-card">
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
              style={{ height: 40, width: 'auto', display: 'block' }}
            />
          </a>
          <p {...t(lang, 'footer_desc')} />
        </div>

        {/* Col 2: İletişim, Lokasyon & Sosyal Ağlar (Right) */}
        <div className="footer-contact-open-grid">
          <div className="footer-contact-item">
            <span className="footer-item-label" {...t(lang, 'footer_email_label')} />
            <a className="footer-item-value" href="mailto:info@greenpiworks.com">
              info@greenpiworks.com
            </a>
          </div>
          <div className="footer-contact-item">
            <span className="footer-item-label" {...t(lang, 'footer_phone_label')} />
            <a className="footer-item-value" href="tel:+905332384390">
              +90 533 238 43 90
            </a>
          </div>
          <div className="footer-contact-item">
            <span className="footer-item-label" {...t(lang, 'footer_location_label')} />
            <a
              href={MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-location-link"
              title="Google Haritalar'da Aç"
            >
              <span {...t(lang, 'footer_location_text')} />
            </a>
          </div>
          <div className="footer-contact-item">
            <span className="footer-item-label" {...t(lang, 'footer_social_label')} />
            <div className="footer-social-icons-row">
              <a
                href="https://www.instagram.com/greenpiworks/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon-btn"
                title="Instagram'da Takip Edin"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a
                href="https://tr.linkedin.com/company/green-pi-works"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon-btn"
                title="LinkedIn'de Bağlantı Kurun"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <p {...t(lang, 'footer_copyright')} />
      </div>
    </footer>
  )
}
