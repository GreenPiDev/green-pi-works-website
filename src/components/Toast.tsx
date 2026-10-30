import { t, type Lang } from '../utils/i18n'

interface Props {
  lang: Lang
  show: boolean
  onClose: () => void
}

export default function Toast({ lang, show, onClose }: Props) {
  return (
    <div id="formSuccessToast" className={'gpw-toast' + (show ? ' show' : '')}>
      <div className="gpw-toast-icon">✓</div>
      <div className="gpw-toast-content">
        <strong {...t(lang, 'toast_title')} />
        <p {...t(lang, 'toast_desc')} />
      </div>
      <button className="gpw-toast-close" onClick={onClose} title="Kapat">
        ✕
      </button>
    </div>
  )
}
