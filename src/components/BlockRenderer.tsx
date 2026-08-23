import type { Block } from '../content/types'
import Hero from './blocks/Hero'
import Figure from './blocks/Figure'
import VideoBlock from './blocks/VideoBlock'
import Cards from './blocks/Cards'
import Process from './blocks/Process'
import Gallery from './blocks/Gallery'
import AudioBlock from './blocks/AudioBlock'

// A switch instead of a lookup map, so each block's props are checked against its own type.
function renderBlock(block: Block, key: string) {
  switch (block.type) {
    case 'hero':
      return <Hero key={key} {...block} />
    case 'cards':
      return <Cards key={key} {...block} />
    case 'process':
      return <Process key={key} {...block} />
    case 'figure':
      return <Figure key={key} {...block} />
    case 'gallery':
      return <Gallery key={key} {...block} />
    case 'video':
      return <VideoBlock key={key} {...block} />
    case 'audio':
      return <AudioBlock key={key} {...block} />
    default: {
      // never happens for valid content, but bad JSON should warn instead of crash
      const unknown = block as { type: string }
      console.warn(`BlockRenderer: unknown block type "${unknown.type}"`)
      return null
    }
  }
}

export default function BlockRenderer({ blocks = [] }: { blocks?: Block[] }) {
  return blocks.map((block, i) => renderBlock(block, `${block.type}-${i}`))
}
