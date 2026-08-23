// Netlify's Image CDN resizes and re-encodes images on request, so the repository
// keeps the full-size originals while the browser downloads something much smaller.
// It only exists on Netlify, so local dev falls back to the original file.
const WIDTHS = [640, 960, 1280, 1600, 2000]

const isNetlify = import.meta.env.PROD

function transform(src: string, width: number) {
  return `/.netlify/images?url=${encodeURIComponent(src)}&w=${width}&fm=avif&q=70`
}

/** srcset covering the widths the layout can ask for, capped at the image's own width */
export function buildSrcSet(src: string, intrinsicWidth?: number) {
  if (!isNetlify || !src.startsWith('/')) return undefined

  const widths = WIDTHS.filter((w) => !intrinsicWidth || w <= intrinsicWidth)
  if (widths.length === 0) return undefined

  return widths.map((w) => `${transform(src, w)} ${w}w`).join(', ')
}
