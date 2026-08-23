import { useEffect } from 'react'
import site from '../content/site.json'

interface PageMeta {
  /** page title; omit on the home page, which leads with the brand instead */
  title?: string
  description?: string
  image?: string
  scrollToTop?: boolean
  /** false while the route has no page of its own, so NotFound keeps its own tags */
  enabled?: boolean
}

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attr, key)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', value)
}

// Sets document title, description and Open Graph tags for the current route.
export function usePageMeta({ title, description = '', image, scrollToTop = true, enabled = true }: PageMeta) {
  useEffect(() => {
    if (!enabled) return

    const fullTitle = title
      ? `${title} — ${site.brand.name}`
      : `${site.brand.name} — ${site.brand.tagline}`

    document.title = fullTitle
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:url', window.location.href)
    if (image) setMeta('property', 'og:image', image)

    if (scrollToTop) window.scrollTo(0, 0)
  }, [title, description, image, scrollToTop, enabled])
}
