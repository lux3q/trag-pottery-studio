import type { HeroBlock } from '../../content/types'
import Container from '../ui/Container'
import Eyebrow from '../ui/Eyebrow'
import { useReveal } from '../../lib/useReveal'

export default function Hero({
  eyebrow,
  heading,
  lead,
  paragraphs = [],
  specs = [],
  palette = []
}: Omit<HeroBlock, 'type'>) {
  const hasPanel = specs.length > 0 || palette.length > 0
  const reveal = useReveal<HTMLElement>()

  return (
    <section ref={reveal.ref} className={`hero ${reveal.className}`}>
      <Container>
        <div className={`hero__grid ${hasPanel ? 'hero__grid--split' : ''}`.trim()}>
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1>{heading}</h1>
            {lead && <p className="hero__lead">{lead}</p>}
            {paragraphs.map((paragraph, i) => (
              <p className="hero__lead hero__lead--small" key={i}>
                {paragraph}
              </p>
            ))}
          </div>

          {hasPanel && (
            <div className="hero__panel">
              {specs.map((spec) => (
                <div className="spec" key={spec.label}>
                  <span className="spec__label">{spec.label}</span>
                  <p className="spec__value" style={spec.font ? { fontFamily: spec.font } : undefined}>
                    {spec.value}
                  </p>
                  {spec.note && <p className="spec__note">{spec.note}</p>}
                </div>
              ))}

              {palette.length > 0 && (
                <div className="spec">
                  <span className="spec__label">Paleta</span>
                  <ul className="swatches">
                    {palette.map((colour) => (
                      <li key={colour.hex} className="swatch">
                        <span className="swatch__chip" style={{ background: colour.hex }} aria-hidden="true" />
                        <span className="swatch__name">{colour.name}</span>
                        <span className="swatch__hex">{colour.hex}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}
