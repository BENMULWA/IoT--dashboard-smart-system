import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

export default function Reports() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-transparent">
      <Sidebar />
      <main className="flex-1 p-6 sm:p-8 space-y-6 pt-16 lg:pt-6">
        <Navbar />
        <div className="text-white">
          <h1 className="text-3xl font-semibold mb-4">Reports</h1>
          <p className="text-slate-400">Reports and analytics features will be implemented here.</p>
        </div>
      </main>
    </div>
  )
}            