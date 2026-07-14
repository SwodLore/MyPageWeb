import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import DashboardView from './components/DashboardView'
import CustomCursor from './components/CustomCursor'
import { ThemeProvider } from './ThemeContext'

// Lazy load de rutas secundarias — solo la home carga en el bundle inicial
const SkillsAboutMe = lazy(() => import('./components/SkillsAboutMe'))
const Anotaciones = lazy(() => import('./components/Anotaciones'))
const NotFound = lazy(() => import('./components/NotFound'))

function RouteFallback() {
  return <div className="min-h-screen" aria-hidden="true" />
}

export default function Router() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        {/* Global — renders on every route including 404 */}
        <CustomCursor />
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<DashboardView />} index />
              <Route path="/skills" element={<SkillsAboutMe />} />
              <Route path="/anotaciones" element={<Anotaciones />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  )
}
