import { BrowserRouter, Route, Routes } from 'react-router-dom' 
import AppLayout from './components/AppLayout'
import DashboardView from './components/DashboardView'
import SkillsAboutMe from './components/SkillsAboutMe'
import { ThemeProvider } from './ThemeContext'
import ThemeToggle from './components/ThemeToggle'
export default function Router() {
    return (
    <ThemeProvider>
        <BrowserRouter>
            <ThemeToggle />
            <Routes>
                <Route element={<AppLayout />}>
                        <Route path="/" element={<DashboardView />} index />
                        <Route path="/skills" element={<SkillsAboutMe />} />
                    </Route>
            </Routes>
        </BrowserRouter>
    </ThemeProvider>
    )
}