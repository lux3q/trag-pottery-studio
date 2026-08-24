import type { ReactNode } from 'react'
import type { SectionVariant } from '../../content/types'
import Container from './Container'
import { useReveal } from '../../lib/useReveal'

interface SectionProps {
  children: ReactNode
  className?: string
  variant?: SectionVariant
  /** drop the top padding, so this block sits close to the one above */
  tight?: boolean
}

export default function Section({ children, className = '', variant, tight }: SectionProps) {
  const variantClass = variant ? `section--${variant}` : ''
  const tightClass = tight ? 'section--tight' : ''

  const reveal = useReveal<HTMLElement>()

  return (
    <section
      ref={reveal.ref}
      className={`section ${variantClass} ${tightClass} ${className} ${reveal.className}`.trim()}
    >
      <Container>{children}</Container>
    </section>
  )
}
