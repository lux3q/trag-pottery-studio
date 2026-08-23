import { useRef, useState } from 'react'
import type { GalleryBlock } from '../../content/types'
import Section from '../ui/Section'
import BlockHead from '../ui/BlockHead'
import Lightbox from '../ui/Lightbox'
import { buildSrcSet } from '../../lib/images'

export default function Gallery({ eyebrow, heading, items = [], columns = 3, variant }: Omit<GalleryBlock, 'type'>) {
  const [active, setActive] = useState<number | null>(null)
  const triggers = useRef<(HTMLButtonElement | null)[]>([])

  // returning focus to the thumbnail that opened the lightbox
  function close() {
    const opened = active
    setActive(null)
    if (opened !== null) triggers.current[opened]?.focus()
  }

  return (
    <Section variant={variant}>
      <BlockHead eyebrow={eyebrow} heading={heading} className="gallery__head" />

      <ul className="gallery__grid" data-columns={columns}>
        {items.map((item, i) => (
          <li key={item.src}>
            <figure className="gallery__item">
              <button
                type="button"
                className="gallery__btn"
                ref={(el) => {
                  triggers.current[i] = el
                }}
                onClick={() => setActive(i)}
                aria-label={`Povećaj sliku: ${item.alt}`}
              >
                <img
                  src={item.src}
                  srcSet={buildSrcSet(item.src, item.width)}
                  sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  width={item.width}
                  height={item.height}
                />
              </button>
              {item.caption && <figcaption>{item.caption}</figcaption>}
            </figure>
          </li>
        ))}
      </ul>

      {active !== null && (
        <Lightbox items={items} index={active} onClose={close} onMove={setActive} />
      )}
    </Section>
  )
}
