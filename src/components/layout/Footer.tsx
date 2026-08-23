import { Link } from 'react-router-dom'
import site from '../../content/site.json'
import Container from '../ui/Container'

export default function Footer() {
  return (
    <footer className="footer">
      <Container>
        <div className="footer__inner">
          <p>
            © {new Date().getFullYear()} {site.brand.name}. {site.footer.note}
          </p>
          <nav className="footer__nav" aria-label="Podnožje">
            <ul>
              <li>
                <Link to={site.home.href}>{site.home.label}</Link>
              </li>
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link to={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <p>{site.author}</p>
        </div>
      </Container>
    </footer>
  )
}
