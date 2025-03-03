import { BrowserRouter, Route, Routes } from 'react-router-dom' 
import AppLayout from './components/AppLayout'
import DashboardView from './components/DashboardView'
import SkillsAboutMe from './components/SkillsAboutMe'
export default function Router() {
    return (
    <BrowserRouter>
        <Routes>
            <Route element={<AppLayout />}>
                    <Route path="/" element={<DashboardView />} index />
                    <Route path="/skills" element={<SkillsAboutMe />} />
                </Route>
        </Routes>
    </BrowserRouter>
    )
}