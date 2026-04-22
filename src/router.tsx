import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import DashboardView from './components/DashboardView'
import SkillsAboutMe from './components/SkillsAboutMe'
import NotFound from './components/NotFound'
import CustomCursor from './components/CustomCursor'
import { ThemeProvider } from './ThemeContext'

export default function Router() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        {/* Global — renders on every route including 404 */}
        <CustomCursor />
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<DashboardView />} index />
            <Route path="/skills" element={<SkillsAboutMe />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}