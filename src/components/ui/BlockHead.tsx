import Eyebrow from './Eyebrow'

interface BlockHeadProps {
  eyebrow?: string
  heading?: string
  className?: string
}

// Shared eyebrow + heading pair used at the top of most blocks.
export default function BlockHead({ eyebrow, heading, className }: BlockHeadProps) {
  if (!eyebrow && !heading) return null
  return (
    <div className={className}>
      <Eyebrow>{eyebrow}</Eyebrow>
      {heading && <h2>{heading}</h2>}
    </div>
  )
}
