import { Link } from 'react-router-dom'
import type { CardsBlock } from '../../content/types'
import Section from '../ui/Section'
import BlockHead from '../ui/BlockHead'

export default function Cards({ eyebrow, heading, items = [], variant }: Omit<CardsBlock, 'type'>) {
  return (
    <Section variant={variant}>
      <BlockHead eyebrow={eyebrow} heading={heading} className="cards__heading" />
      <ul className="cards__grid">
        {items.map((item, i) => (
          <li key={item.title}>
            <article className="card">
              <span className="card__num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              {item.href && (
                <Link className="card__link" to={item.href}>
                  {item.label || 'Pogledaj'}
                </Link>
              )}
            </article>
          </li>
        ))}
      </ul>
    </Section>
  )
}
