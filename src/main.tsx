import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LazyMotion } from 'framer-motion'
import './index.css'
import { ThemeProvider } from '@/context/ThemeContext'
import AppRouter from '@/routes'

// Las features de animación se cargan en un chunk aparte: el bundle
// inicial solo lleva los componentes `m` (ligeros) y las animaciones
// arrancan en cuanto llega el chunk de features.
const loadMotionFeatures = () =>
  import('@/lib/motionFeatures').then((mod) => mod.default)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LazyMotion features={loadMotionFeatures} strict>
      <ThemeProvider>
        <AppRouter />
      </ThemeProvider>
    </LazyMotion>
  </StrictMode>,
)
