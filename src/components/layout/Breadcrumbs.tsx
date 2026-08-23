import { Link } from 'react-router-dom'
import site from '../../content/site.json'
import Container from '../ui/Container'

export default function Breadcrumbs({ title }: { title: string }) {
  return (
    <Container>
      <nav className="breadcrumbs" aria-label="Putanja">
        <ol>
          <li>
            <Link to={site.home.href}>{site.home.label}</Link>
          </li>
          <li aria-current="page">{title}</li>
        </ol>
      </nav>
    </Container>
  )
}
