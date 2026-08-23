import type { ReactNode } from 'react'
import type { SectionVariant } from '../../content/types'
import Container from './Container'

interface SectionProps {
  children: ReactNode
  className?: string
  variant?: SectionVariant
}

export default function Section({ children, className = '', variant }: SectionProps) {
  const variantClass = variant ? `section--${variant}` : ''
  return (
    <section className={`section ${variantClass} ${className}`.trim()}>
      <Container>{children}</Container>
    </section>
  )
}
