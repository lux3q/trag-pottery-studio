import type { PageData } from '../content/types'

// Every page is a JSON file in content/pages; the filename doubles as the route slug.
const modules = import.meta.glob<{ default: PageData }>('../content/pages/*.json', { eager: true })

const pages: Record<string, PageData> = Object.fromEntries(
  Object.entries(modules).map(([path, mod]) => {
    const data = mod.default
    const slug = data.slug || path.split('/').pop()!.replace('.json', '')
    return [slug, data]
  })
)

export function getPage(slug: string | undefined): PageData | undefined {
  return slug ? pages[slug] : undefined
}
