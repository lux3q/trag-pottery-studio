import { useEffect, useRef } from 'react'
import type { GalleryItem } from '../../content/types'

interface LightboxProps {
  items: GalleryItem[]
  index: number
  onClose: () => void
  onMove: (next: number) => void
}

export default function Lightbox({ items, index, onClose, onMove }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const item = items[index]

  useEffect(() => {
    closeRef.current?.focus()

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key === 'ArrowLeft') {
        onMove((index - 1 + items.length) % items.length)
        return
      }
      if (event.key === 'ArrowRight') {
        onMove((index + 1) % items.length)
        return
      }
      if (event.key !== 'Tab') return

      // focus trap: keep Tab inside the dialog
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>('button')
      if (!focusable || focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [index, items.length, onClose, onMove])

  return (
    <div
      className="lightbox"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="lightbox__dialog" ref={dialogRef} role="dialog" aria-modal="true" aria-label={item.alt}>
        <button ref={closeRef} type="button" className="lightbox__close" onClick={onClose}>
          Zatvori ✕
        </button>

        {items.length > 1 && (
          <button
            type="button"
            className="lightbox__nav lightbox__nav--prev"
            onClick={() => onMove((index - 1 + items.length) % items.length)}
            aria-label="Prethodna slika"
          >
            ←
          </button>
        )}

        <figure className="lightbox__figure">
          <img src={item.src} alt={item.alt} width={item.width} height={item.height} />
          <figcaption>
            {item.caption}
            <span className="lightbox__count">
              {index + 1} / {items.length}
            </span>
          </figcaption>
        </figure>

        {items.length > 1 && (
          <button
            type="button"
            className="lightbox__nav lightbox__nav--next"
            onClick={() => onMove((index + 1) % items.length)}
            aria-label="Sljedeća slika"
          >
            →
          </button>
        )}
      </div>
    </div>
  )
}
