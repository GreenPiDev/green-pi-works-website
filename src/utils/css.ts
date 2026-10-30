import type { CSSProperties } from 'react'

/** Orijinaldeki inline style string'lerini (birebir) React style nesnesine çevirir. */
export function css(style: string): CSSProperties {
  const out: Record<string, string> = {}
  style.split(';').forEach((decl) => {
    const i = decl.indexOf(':')
    if (i < 0) return
    const prop = decl.slice(0, i).trim()
    const val = decl.slice(i + 1).trim()
    if (!prop) return
    out[prop.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase())] = val
  })
  return out as CSSProperties
}
