import type { AudioBlock as AudioBlockData } from '../../content/types'
import Section from '../ui/Section'
import BlockHead from '../ui/BlockHead'

export default function AudioBlock({
  eyebrow,
  heading,
  description,
  src,
  transcript,
  variant
}: Omit<AudioBlockData, 'type'>) {
  return (
    <Section variant={variant}>
      <figure className="media">
        <BlockHead eyebrow={eyebrow} heading={heading} />

        <audio controls preload="metadata" src={src}>
          Vaš preglednik ne podržava reprodukciju zvuka.
        </audio>

        {description && <figcaption className="media__desc">{description}</figcaption>}
      </figure>

      {transcript && (
        <details className="transcript">
          <summary>Tekstualni opis zvuka</summary>
          <p>{transcript}</p>
        </details>
      )}
    </Section>
  )
}
