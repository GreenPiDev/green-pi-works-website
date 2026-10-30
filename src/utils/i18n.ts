import { GPW_TRANSLATIONS } from '../data/translations'

export type Lang = 'tr' | 'en'

/** Orijinaldeki `data-i18n` + innerHTML davranışı (çeviriler HTML içerebilir). */
export function t(lang: Lang, key: string) {
  const dict = GPW_TRANSLATIONS[lang] || GPW_TRANSLATIONS.tr
  const value = dict[key]
  return {
    'data-i18n': key,
    dangerouslySetInnerHTML: { __html: typeof value === 'string' ? value : '' },
  }
}
