import type { ProcessBlock } from '../../content/types'
import Section from '../ui/Section'
import BlockHead from '../ui/BlockHead'
import { buildSrcSet } from '../../lib/images'

export default function Process({ eyebrow, heading, tool, items = [], variant }: Omit<ProcessBlock, 'type'>) {
  // steps without their own headings render as a plain bulleted list
  const numbered = items.some((item) => item.title)
  const List = numbered ? 'ol' : 'ul'

  return (
    <Section variant={variant}>
      <BlockHead eyebrow={eyebrow} heading={heading} className="process__head" />
      {tool && <p className="process__tool">{tool}</p>}

      <List className={`process__list ${numbered ? '' : 'process__list--bullets'}`.trim()}>
        {items.map((item, i) => (
          <li key={item.title || i} className="process__step">
            <span className="process__num" aria-hidden="true">
              {numbered ? String(i + 1).padStart(2, '0') : '—'}
            </span>
            <div className="process__body">
              {item.title && <h3>{item.title}</h3>}
              <p>{item.text}</p>
              {item.image && (
                <img
                  src={item.image}
                  srcSet={buildSrcSet(item.image)}
                  sizes="520px"
                  alt={item.alt || ''}
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="400"
                />
              )}
            </div>
          </li>
        ))}
      </List>
    </Section>
  )
}
