import { Link } from 'react-router-dom'
import Section from '../components/ui/Section'
import { usePageMeta } from '../lib/meta'

export default function NotFound() {
  usePageMeta({
    title: 'Stranica nije pronađena',
    description: 'Tražena stranica ne postoji.'
  })

  return (
    <Section className="notfound">
      <h1>Ova stranica još nastaje</h1>
      <p>Sadržaj koji tražite trenutačno nije dostupan.</p>
      <Link className="btn" to="/">
        Natrag na naslovnicu
      </Link>
    </Section>
  )
}
