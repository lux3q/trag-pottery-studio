import { useParams } from 'react-router-dom'
import BlockRenderer from '../components/BlockRenderer'
import Breadcrumbs from '../components/layout/Breadcrumbs'
import NotFound from './NotFound'
import { getPage } from '../lib/pages'
import { usePageMeta } from '../lib/meta'

export default function Page({ slug: fixedSlug }: { slug?: string }) {
  const params = useParams()
  const slug = fixedSlug || params.slug
  const data = getPage(slug)
  const isHome = slug === 'home'

  usePageMeta({
    title: isHome ? undefined : data?.title,
    description: data?.seo?.description,
    image: data?.seo?.image,
    enabled: Boolean(data)
  })

  if (!data) return <NotFound />

  return (
    <>
      {!isHome && <Breadcrumbs title={data.title} />}
      <BlockRenderer blocks={data.blocks} />
    </>
  )
}
