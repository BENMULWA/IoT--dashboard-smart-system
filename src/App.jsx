import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Dashboard from './general_files/Pages/Dashboard'
import BiometricAttendance from './general_files/Pages/Biometric'
import EnvironmentalMonitor from './general_files/Pages/Environmental_Data'
import Reports from './general_files/Pages/Reports'
import Settings from './general_files/Pages/Settings'
import AlertPage from './general_files/Pages/AlertPanel'
import Sidebar from './general_files/components/Sidebar'
import Navbar from './general_files/components/Navbar'
import DevicesPage from './general_files/Pages/Devices'
import AlertsDashboard from './general_files/Pages/Alertpage'



const PlaceholderPage = ({ title }) => (
    <div className="flex flex-col lg:flex-row min-h-screen bg-transparent">
        <div className="flex-1 p-6 sm:p-8 pt-16 lg:pt-6 text-white">
            <h1 className="text-3xl font-semibold mb-4">{title}</h1>
            <p className="text-slate-400">This page is not implemented yet.</p>
        </div>
    </div>
)

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/biometric-attendance" element={<BiometricAttendance />} />
                <Route path="/environment" element={<EnvironmentalMonitor />} />
                <Route path="/devices" element={<DevicesPage />} />
                <Route path="/alerts" element={<AlertsDashboard />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/settings" element={<Settings />} />
            </Routes>
        </Router>
    )
}
