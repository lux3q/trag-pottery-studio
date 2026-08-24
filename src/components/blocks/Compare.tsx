import { useState } from 'react'
import type { CSSProperties } from 'react'
import type { CompareBlock, CompareItem } from '../../content/types'
import Section from '../ui/Section'
import BlockHead from '../ui/BlockHead'
import { buildSrcSet } from '../../lib/images'

// The divider is a range input: dragging, clicking and arrow keys all come from the
// browser, and screen readers announce it as a slider. The line and grip are drawn
// separately so they stay glued to the value at both ends of the track.
function Comparison({ item, index }: { item: CompareItem; index: number }) {
  const [position, setPosition] = useState(50)
  const number = String(index + 1).padStart(2, '0')

  return (
    <li className="compare__item">
      <div className="compare__text">
        <span className="compare__num" aria-hidden="true">
          {number}
        </span>
        {item.steps && (
          <ul className="compare__steps">
            {item.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ul>
        )}
      </div>

      <figure className="compare__figure">
        <div className="compare__frame" style={{ '--pos': `${position}%` } as CSSProperties}>
          <img
            className="compare__img"
            src={item.before.src}
            srcSet={buildSrcSet(item.before.src, item.width)}
            sizes="(min-width: 1024px) 460px, 100vw"
            alt={item.before.alt}
            width={item.width}
            height={item.height}
            loading="lazy"
            decoding="async"
          />
          <img
            className="compare__img compare__img--after"
            src={item.after.src}
            srcSet={buildSrcSet(item.after.src, item.width)}
            sizes="(min-width: 1024px) 460px, 100vw"
            alt={item.after.alt}
            width={item.width}
            height={item.height}
            loading="lazy"
            decoding="async"
          />

          <span className="compare__tag compare__tag--before" aria-hidden="true">
            Prije
          </span>
          <span className="compare__tag compare__tag--after" aria-hidden="true">
            Poslije
          </span>

          <input
            type="range"
            className="compare__range"
            min={0}
            max={100}
            step={1}
            value={position}
            onChange={(event) => setPosition(Number(event.target.value))}
            aria-label={`Usporedba ${number}: otkrij obrađenu sliku`}
            aria-valuetext={`${position} % obrađene slike`}
          />
          <div className="compare__handle" aria-hidden="true">
            <span className="compare__grip">⇄</span>
          </div>
        </div>

        {item.caption && <figcaption className="compare__caption">{item.caption}</figcaption>}
      </figure>
    </li>
  )
}

export default function Compare({ eyebrow, heading, items = [], variant }: Omit<CompareBlock, 'type'>) {
  return (
    <Section variant={variant}>
      <BlockHead eyebrow={eyebrow} heading={heading} className="compare__head" />
      <ul className="compare__list">
        {items.map((item, i) => (
          <Comparison key={item.after.src} item={item} index={i} />
        ))}
      </ul>
    </Section>
  )
}
