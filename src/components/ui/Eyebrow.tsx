import type { ReactNode } from 'react'

export default function Eyebrow({ children }: { children?: ReactNode }) {
  if (!children) return null
  return <span className="eyebrow">{children}</span>
}
