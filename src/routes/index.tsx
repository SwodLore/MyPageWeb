import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from '@/layouts/AppLayout'
import CustomCursor from '@/components/common/CustomCursor'
import Home from '@/pages/Home'

// Lazy load de rutas secundarias — solo la home carga en el bundle inicial
const Skills = lazy(() => import('@/pages/Skills'))
const Anotaciones = lazy(() => import('@/pages/Anotaciones'))
const NotFound = lazy(() => import('@/pages/NotFound'))

function RouteFallback() {
  return <div className="min-h-screen" aria-hidden="true" />
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      {/* Global — se renderiza en todas las rutas, incluida la 404 */}
      <CustomCursor />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="skills" element={<Skills />} />
            <Route path="anotaciones" element={<Anotaciones />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
