import { useRef, useState, type FormEvent } from 'react'
import { GPW_TRANSLATIONS } from '../data/translations'
import { t, type Lang } from '../utils/i18n'
import { css } from '../utils/css'

interface Props {
  lang: Lang
  onSuccess: () => void
}

export default function Contact({ lang, onSuccess }: Props) {
  const dict = GPW_TRANSLATIONS[lang] || GPW_TRANSLATIONS.tr
  const [submitting, setSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  function handleQuoteSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    setSubmitting(true)

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new FormData(form),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          onSuccess()
          form.reset()
        } else {
          alert('Bir hata oluştu, lütfen tekrar deneyin: ' + (result.message || ''))
        }
      })
      .catch(() => {
        alert('Bağlantı hatası, lütfen tekrar deneyin.')
      })
      .finally(() => setSubmitting(false))
  }

  return (
    <section className="dedicated-contact-section" id="contact">
      <div className="dedicated-contact-grid">
        {/* Left Info Block */}
        <div className="contact-info-block">
          <span className="eyebrow">
            <span className="eyebrow-line"></span> <span {...t(lang, 'contact_eyebrow')} />
          </span>
          <h2 {...t(lang, 'contact_title')} />
          <p {...t(lang, 'contact_desc')} />
        </div>

        {/* Right Form Card */}
        <div className="contact-form-card">
          <h3 {...t(lang, 'form_title')} />
          <p {...t(lang, 'form_desc')} />

          <form ref={formRef} onSubmit={handleQuoteSubmit}>
            <input type="hidden" name="access_key" value="5bf3f9bf-18ba-4e8b-9190-7dbc30221d8c" />
            <input type="hidden" name="subject" value="Green Pi Works - Yeni Teklif Talebi" />
            <input type="checkbox" name="botcheck" style={css('display:none')} tabIndex={-1} autoComplete="off" />
            <div style={css('display:grid; grid-template-columns:1fr 1fr; gap:14px;')}>
              <label>
                <span {...t(lang, 'form_name_label')} />
                <input
                  type="text"
                  name="name"
                  placeholder={dict.form_name_placeholder as string}
                  required
                  id="formInputName"
                />
              </label>
              <label>
                <span {...t(lang, 'form_email_label')} />
                <input type="email" name="email" placeholder="ornek@firma.com" required id="formInputEmail" />
              </label>
            </div>

            <div style={css('display:grid; grid-template-columns:1fr 1fr; gap:14px;')}>
              <label>
                <span {...t(lang, 'form_phone_label')} />
                <input type="tel" name="phone" placeholder="+90 (5XX) XXX XX XX" id="formInputPhone" />
              </label>
              <label>
                <span {...t(lang, 'form_service_label')} />
                <select name="service" id="formSelectService">
                  {dict.services.map((svc, i) => (
                    <option key={i} value={svc}>
                      {svc}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label>
              <span {...t(lang, 'form_message_label')} />
              <textarea
                name="message"
                rows={3}
                placeholder={dict.form_message_placeholder as string}
                id="formInputMessage"
              ></textarea>
            </label>

            <button className="contact-form-submit-btn" type="submit" id="formSubmitBtn" disabled={submitting}>
              {submitting ? <span>Gönderiliyor...</span> : <span {...t(lang, 'form_submit_btn')} />}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
