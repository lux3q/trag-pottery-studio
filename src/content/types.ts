// Shape of the JSON content in content/pages. Every page is a list of blocks,
// and each block type maps to one component in components/blocks.

export type SectionVariant = 'surface'

export interface Spec {
  label: string
  value: string
  /** CSS font-family, so a font can be shown set in itself */
  font?: string
  note?: string
}

export interface Swatch {
  name: string
  hex: string
}

export interface HeroBlock {
  type: 'hero'
  eyebrow?: string
  heading: string
  lead?: string
  paragraphs?: string[]
  specs?: Spec[]
  palette?: Swatch[]
}

export interface CardItem {
  title: string
  text: string
  href?: string
  label?: string
}

export interface CardsBlock {
  type: 'cards'
  eyebrow?: string
  heading?: string
  items: CardItem[]
  variant?: SectionVariant
}

export interface ProcessItem {
  /** steps without a title render as bullets instead of numbered entries */
  title?: string
  text: string
  image?: string
  alt?: string
}

export interface ProcessBlock {
  type: 'process'
  eyebrow?: string
  heading?: string
  /** tools, sources and export format, shown under the heading */
  tool?: string
  items: ProcessItem[]
  variant?: SectionVariant
}

export interface FigureBlock {
  type: 'figure'
  eyebrow?: string
  heading?: string
  src: string
  alt: string
  caption?: string
  width: number
  height: number
  /** 'mark' centres the image at logo size */
  size?: 'mark'
  /** sit close to the block above instead of starting a new gap */
  tight?: boolean
  download?: { href: string; label: string }
  variant?: SectionVariant
}

export interface VideoBlock {
  type: 'video'
  eyebrow?: string
  heading?: string
  description?: string
  /** YouTube id; without it the block falls back to a local file in src */
  youtube?: string
  src?: string
  poster?: string
  captions?: string
  variant?: SectionVariant
  tight?: boolean
}

export interface GalleryItem {
  src: string
  alt: string
  caption?: string
  width: number
  height: number
}

export interface GalleryBlock {
  type: 'gallery'
  eyebrow?: string
  heading?: string
  columns?: 2 | 3
  items: GalleryItem[]
  variant?: SectionVariant
}

export interface AudioBlock {
  type: 'audio'
  eyebrow?: string
  heading?: string
  description?: string
  src: string
  /** optional written description of what can be heard */
  transcript?: string
  tight?: boolean
  variant?: SectionVariant
}

export interface CompareImage {
  src: string
  alt: string
}

export interface CompareItem {
  /** the steps that produced this change, shown beside the slider */
  steps?: string[]
  caption?: string
  before: CompareImage
  after: CompareImage
  width: number
  height: number
}

export interface CompareBlock {
  type: 'compare'
  eyebrow?: string
  heading?: string
  items: CompareItem[]
  variant?: SectionVariant
}

export type Block =
  | HeroBlock
  | CardsBlock
  | ProcessBlock
  | FigureBlock
  | GalleryBlock
  | CompareBlock
  | VideoBlock
  | AudioBlock

export interface PageData {
  /** path to page.schema.json, so the editor validates content while typing */
  $schema?: string
  slug: string
  title: string
  seo?: {
    description?: string
    image?: string
  }
  blocks: Block[]
}
