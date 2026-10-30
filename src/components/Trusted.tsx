import { t, type Lang } from '../utils/i18n'
import { css } from '../utils/css'

const CLIENTS = [
  { title: 'Aksan Pano', src: '/assets/client-aksan-pano.png', alt: 'Aksan Pano' },
  { title: 'Green Pi', src: '/assets/client-green-pi.png', alt: 'Green Pi' },
  { title: 'Ankara Siteler Sanayici ve İş İnsanları Derneği', src: '/assets/client-ankara-siteler.png', alt: 'Ankara Siteler Derneği' },
  { title: 'Agora Sanat Galerisi Müzayede Evi', src: '/assets/client-agora-sanat.jpg', alt: 'Agora Sanat Galerisi' },
  { title: 'Şahbaz Pano', src: '/assets/client-sahbaz-pano.png', alt: 'Şahbaz Pano' },
]

// 5 gerçek müşteri x 3 tekrar = 15 logo
const GROUP = [...CLIENTS, ...CLIENTS, ...CLIENTS]

function Group({ hidden }: { hidden?: boolean }) {
  return (
    <div className="trusted-marquee-group" aria-hidden={hidden ? 'true' : undefined}>
      {GROUP.map((c, i) => (
        <div className="trusted-brand-pill" title={c.title} key={i}>
          <img src={c.src} alt={c.alt} className="trusted-brand-img" loading="lazy" />
        </div>
      ))}
    </div>
  )
}

export default function Trusted({ lang }: { lang: Lang }) {
  return (
    <section className="section trusted" id="trusted">
      <div className="container" style={css('text-align:center;')}>
        <span className="trusted__label" {...t(lang, 'trusted_label')} />
      </div>
      <div className="trusted-marquee-container" aria-hidden="true">
        <div className="trusted-marquee-track">
          <Group />
          {/* Group 2: kesintisiz akış için aynı 15 logo */}
          <Group hidden />
        </div>
      </div>
    </section>
  )
}
