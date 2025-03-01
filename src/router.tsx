import { BrowserRouter, Route, Routes } from 'react-router-dom' 
import AppLayout from './components/AppLayout'
import DashboardView from './components/DashboardView'
import CvPage from './components/CvPage'
export default function Router() {
    return (
    <BrowserRouter>
        <Routes>
            <Route element={<AppLayout />}>
                    <Route path="/" element={<DashboardView />} index />
                    <Route path="/cv" element={<CvPage />} />
                </Route>
        </Routes>
    </BrowserRouter>
    )
}