import type { ReactNode } from 'react'
import type { SectionVariant } from '../../content/types'
import Container from './Container'
import { useReveal } from '../../lib/useReveal'

interface SectionProps {
  children: ReactNode
  className?: string
  variant?: SectionVariant
}

export default function Section({ children, className = '', variant }: SectionProps) {
  const variantClass = variant ? `section--${variant}` : ''
  const reveal = useReveal<HTMLElement>()

  return (
    <section ref={reveal.ref} className={`section ${variantClass} ${className} ${reveal.className}`.trim()}>
      <Container>{children}</Container>
    </section>
  )
}
