import type { VideoBlock as VideoBlockData } from '../../content/types'
import Section from '../ui/Section'
import BlockHead from '../ui/BlockHead'

export default function VideoBlock({
  eyebrow,
  heading,
  description,
  src,
  poster,
  captions,
  youtube,
  variant
}: Omit<VideoBlockData, 'type'>) {
  return (
    <Section variant={variant}>
      <figure className="media">
        <BlockHead eyebrow={eyebrow} heading={heading} />

        {youtube ? (
          <div className="media__frame">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${youtube}`}
              title={heading || 'Video'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        ) : (
          <video controls playsInline poster={poster} preload="metadata" width="1920" height="1080">
            <source src={src} type="video/mp4" />
            {captions && <track kind="captions" srcLang="hr" label="Hrvatski" src={captions} default />}
          </video>
        )}

        {description && <figcaption className="media__desc">{description}</figcaption>}
      </figure>
    </Section>
  )
}
