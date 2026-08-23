import { useEffect, useRef, useState } from 'react'

// Fades a section in the first time it scrolls into view. Anyone who asks for less
// motion, or whose browser lacks IntersectionObserver, gets the content right away.
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !('IntersectionObserver' in window)) {
      setVisible(true)
      return
    }

    let frame = 0

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        observer.disconnect()

        // Let the browser paint the hidden state once first. A section that is already
        // on screen right after a route change would otherwise flip to visible within
        // the same frame, and the transition would never run.
        frame = requestAnimationFrame(() => {
          frame = requestAnimationFrame(() => setVisible(true))
        })
      },
      // start slightly before the section reaches the bottom edge of the viewport
      { rootMargin: '0px 0px -8% 0px' }
    )

    observer.observe(node)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [])

  return { ref, className: visible ? 'reveal is-visible' : 'reveal' }
}
