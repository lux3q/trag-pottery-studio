import type { FigureBlock } from '../../content/types'
import Section from '../ui/Section'
import BlockHead from '../ui/BlockHead'
import { buildSrcSet } from '../../lib/images'

export default function Figure({
  eyebrow,
  heading,
  src,
  alt,
  caption,
  width,
  height,
  download,
  size,
  variant,
  tight
}: Omit<FigureBlock, 'type'>) {
  const srcSet = buildSrcSet(src, width)

  return (
    <Section variant={variant} tight={tight}>
      <BlockHead eyebrow={eyebrow} heading={heading} className="figure__head" />

      <figure className={`figure ${size ? `figure--${size}` : ''}`.trim()}>
        <img
          src={src}
          srcSet={srcSet}
          sizes={size === 'mark' ? '320px' : '(min-width: 1140px) 1080px, 100vw'}
          alt={alt}
          loading="lazy"
          decoding="async"
          width={width}
          height={height}
        />
        {(caption || download) && (
          <figcaption>
            {caption}
            {download && (
              <a className="figure__download" href={download.href} download>
                {download.label}
              </a>
            )}
          </figcaption>
        )}
      </figure>
    </Section>
  )
}
