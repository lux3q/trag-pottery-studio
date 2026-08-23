import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import site from '../../content/site.json'
import Container from '../ui/Container'
import Logo from '../ui/Logo'

export default function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  // close the panel on navigation
  useEffect(() => setOpen(false), [pathname])

  // lock scroll and allow Esc while the panel is open
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header className="header">
      <Container>
        <div className="header__inner">
          <Link className="header__logo" to="/">
            <Logo />
            <span>
              <span className="header__wordmark">{site.brand.name}</span>
              <span className="header__tagline">{site.brand.tagline}</span>
            </span>
          </Link>

          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="main-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="nav-toggle__icon" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            {open ? 'Zatvori' : 'Izbornik'}
          </button>

          <nav
            id="main-nav"
            className={`nav ${open ? 'nav--open' : ''}`.trim()}
            aria-label="Glavna navigacija"
          >
            <ul>
              {site.nav.map((item) => (
                <li key={item.href}>
                  <NavLink to={item.href} end={item.href === '/'}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>

      {open && <div className="nav-scrim" onClick={() => setOpen(false)} />}
    </header>
  )
}
