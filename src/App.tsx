import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Page from './pages/Page'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Page slug="home" />} />
        <Route path=":slug" element={<Page />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
