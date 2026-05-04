
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import StatCard from '../components/StatCard'
import TrendChart from '../charts/TrendChart'
import DistributionChart from '../charts/DistributionChart'
import DataTable from '../components/DataTable'
import AlertPanel from '../Pages/AlertPanel'


import { TrendingUp, TrendingDown, Users, UserX, Thermometer, Droplets, Wifi, Wind } from 'lucide-react';

const attendance = [
  { id: 'EMP001', name: 'Benard Mulwa', time: '10:30:42 AM', status: 'Present', method: 'fingerprint', date: '28 Apr 2026' },
  { id: 'EMP002', name: 'Dr. FRank Otieno', time: '10:28:15 AM', status: 'Present', method: 'fingerprint', date: '28 Apr 2026' },
  { id: 'EMP002', name: 'Eric Chiguba', time: '10:28:15 AM', status: 'Present', method: 'fingerprint', date: '28 Apr 2026' },
  { id: 'EMP003', name: 'Elijah Kakiro', time: '10:26:33 AM', status: 'Present', method: 'fingerprint', date: '28 Apr 2026' },
  { id: 'EMP004', name: 'Sarah Wilson', time: '10:24:08 AM', status: 'Absent', method: 'none', date: '28 Apr 2026' },
  { id: 'EMP005', name: 'Doreen Mutua', time: '10:22:51 AM', status: 'Present', method: 'fingerprint', date: '28 Apr 2026' },
  { id: 'EMP006', name: 'Emily Davis', time: '10:20:15 AM', status: 'Present', method: 'fingerprint', date: '28 Apr 2026' },
]

const todayAttendanceTotals = {
  present: 128,
  absent: 15,
  late: 0,
};

export default function Dashboard() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-transparent">
      <Sidebar />

      <main className="flex-1 p-6 sm:p-8 space-y-6 pt-16 lg:pt-6">
        <Navbar />

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 gap-4">
          <StatCard 
            title="Total Present Today" 
            value="128" 
            icon={<Users size={24} className="text-white" />} 
            iconBgColor="bg-purple-600"
            bgGradient="linear-gradient(135deg, rgba(88, 28, 135, 0.95) 0%, rgba(15, 23, 42, 1) 100%)"
            status={<><TrendingUp size={14} className="inline" /> 12.5% from yesterday</>} 
            color="text-green-400" 
            animationDelay="fade-in-delay-1" 
          />
          <StatCard 
            title="Total Absent Today" 
            value="15" 
            icon={<UserX size={24} className="text-white" />} 
            iconBgColor="bg-blue-600"
            bgGradient="linear-gradient(135deg, rgba(88, 28, 150, 0.95) 0%, rgba(15, 23, 42, 1) 100%)"
            status={<><TrendingDown size={14} className="inline" /> 3.2% from yesterday</>} 
            color="text-red-400" 
            animationDelay="fade-in-delay-2" 
          />
          <StatCard 
            title="Temperature" 
            value="28.6 °C" 
            icon={<Thermometer size={24} className="text-white" />} 
            iconBgColor="bg-teal-700"
            bgGradient="linear-gradient(135deg, rgba(88, 28, 150, 0.95) 0%, rgba(15, 23, 42, 0.9) 100%)"
            status={<><span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-1"></span>Normal</>} 
            color="text-green-400" 
            animationDelay="fade-in-delay-3" 
          />
          <StatCard 
            title="Humidity" 
            value="62.4 %" 
            icon={<Droplets size={24} className="text-white" />} 
            iconBgColor="bg-blue-600"
            bgGradient="linear-gradient(135deg, rgba(88, 28, 150, 0.95) 0%, rgba(15, 23, 42, 0.9) 100%)"
            status={<><span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-1"></span>Normal</>} 
            color="text-green-400" 
            animationDelay="fade-in-delay-4" 
          />
          <StatCard 
            title="Air Quality (AQI)" 
            value="42" 
            icon={<Wind size={24} className="text-white" />} 
            iconBgColor="bg-orange-600"
            bgGradient="linear-gradient(135deg, rgba(190, 24, 93, 0.95) 0%, rgba(15, 23, 42, 9) 100%)"           
            status={<><span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-1"></span>Good</>} 
            color="text-green-400" 
            animationDelay="fade-in-delay-5" 
          />
          <StatCard 
            title="Devices Online" 
            value="6 / 6" 
            icon={<Wifi size={24} className="text-white" />} 
            iconBgColor="bg-pink-700"
            bgGradient="linear-gradient(135deg, rgba(88, 28, 120, 0.95) 0%, rgba(15, 23, 42, 0.90) 100%)"
            status={<><span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-1"></span>All Connected</>} 
            color="text-green-400" 
            animationDelay="fade-in-delay-5" 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
          <div className="lg:col-span-2">
            <TrendChart />
          </div>
          <DistributionChart todayAttendanceTotals={todayAttendanceTotals} />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="xl:col-span-2">
            <DataTable attendance={attendance} />
          </div>
          <AlertPanel />
        </div>

      {/* Footer for the dashboard */}

        <footer className="mt-12 rounded-2xl bg-blue-400/5 backdrop-blur-xl border border-white/10 px-6 py-6 text-slate-400">

          <div className="flex flex-col items-center text-center md:flex-row md:items-center md:justify-between gap-3">

            {/* Left / Top on mobile */}

            <div className="flex items-center gap-2 justify-center md:justify-start">

              <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></span>

              <span className="text-sm sm:text-base font-medium text-blue-400 truncate">
                IoT Dashboard System • Designed by Benard Mulwa
              </span>

            </div>

            {/* Center */}
            <div className="text-lg sm:text-base text-blue-400">
              Smart Attendance  • Environment Monitoring • IoT Analytics
            </div>

            {/* Right / Bottom on mobile */}
            <div className="flex flex-col md:flex-row items-center gap-2 text-xs justify-center md:justify-end">
              <span className="px-3 py-3 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                System Online
              </span>
              <span className="text-xs text-blue-400">
                © {new Date().getFullYear()} All rights reserved
              </span>
            </div>

          </div>
        </footer>
    


        {/* Footer for the dashboard */}
      </main>
      
    </div>
  )
}