import { useMemo, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { Fingerprint, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const allAttendanceData = [
  { id: 'EMP001', name: 'Benard Mulwa', time: '10:30:42 AM', status: 'Present', method: 'fingerprint', date: '28 Apr 2026' },
  {id: 'EMP002', name: 'Dr. FRank Otieno', time: '10:28:15 AM', status: 'Present', method: 'fingerprint', date: '28 Apr 2026' },
  { id: 'EMP002', name: 'Eric Chiguba', time: '10:28:15 AM', status: 'Present', method: 'fingerprint', date: '28 Apr 2026' },
  { id: 'EMP003', name: 'Elijah Kakiro', time: '10:26:33 AM', status: 'Present', method: 'fingerprint', date: '28 Apr 2026' },
  { id: 'EMP004', name: 'Sarah Wilson', time: '10:24:08 AM', status: 'Absent', method: 'none', date: '28 Apr 2026' },
  { id: 'EMP005', name: 'Doreen Mutua', time: '10:22:51 AM', status: 'Present', method: 'fingerprint', date: '28 Apr 2026' },
  { id: 'EMP006', name: 'Emily Davis', time: '10:20:15 AM', status: 'Present', method: 'fingerprint', date: '28 Apr 2026' },
  { id: 'EMP007', name: 'James Wilson', time: '11:18:42 AM', status: 'Late', method: 'fingerprint', date: '28 Apr 2026' },
  { id: 'EMP008', name: 'Jessica Martinez', time: '10:16:30 AM', status: 'Present', method: 'fingerprint', date: '28 Apr 2026' },
  { id: 'EMP009', name: 'Christopher Taylor', time: '10:14:21 AM', status: 'Present', method: 'fingerprint', date: '28 Apr 2026' },
  { id: 'EMP010', name: 'Amanda Anderson', time: '10:12:08 AM', status: 'Absent', method: 'none', date: '28 Apr 2026' },
  { id: 'EMP011', name: 'Daniel Thomas', time: '10:10:45 AM', status: 'Present', method: 'fingerprint', date: '28 Apr 2026' },
  { id: 'EMP012', name: 'Jennifer Jackson', time: '10:08:32 AM', status: 'Present', method: 'fingerprint', date: '28 Apr 2026' },
  { id: 'EMP013', name: 'Robert White', time: '10:06:19 AM', status: 'Present', method: 'fingerprint', date: '28 Apr 2026' },
  { id: 'EMP014', name: ' Terrry Onyango', time: '10:04:06 AM', status: 'Present', method: 'fingerprint', date: '28 Apr 2026' },
  { id: 'EMP015', name: 'Levis Ochieng', time: '10:02:53 AM', status: 'Present', method: 'fingerprint', date: '28 Apr 2026' },

    { id: 'EMP001', name: 'Benard Mulwa', time: '10:30:42 AM', status: 'Present', method: 'fingerprint', date: '28 Apr 2026' },
    { id: 'EMP002', name: 'Dr. FRank Otieno', time: '10:28:15 AM', status: 'Present', method: 'fingerprint', date: '28 Apr 2026' },
    { id: 'EMP002', name: 'Eric Chiguba', time: '10:28:15 AM', status: 'Present', method: 'fingerprint', date: '28 Apr 2026' },
    { id: 'EMP003', name: 'Elijah Kakiro', time: '10:26:33 AM', status: 'Present', method: 'fingerprint', date: '28 Apr 2026' },
    { id: 'EMP004', name: 'Sarah Wilson', time: '10:24:08 AM', status: 'Absent', method: 'none', date: '28 Apr 2026' },
    { id: 'EMP005', name: 'Doreen Mutua', time: '10:22:51 AM', status: 'Present', method: 'fingerprint', date: '28 Apr 2026' },
    { id: 'EMP006', name: 'Emily Davis', time: '10:20:15 AM', status: 'Present', method: 'fingerprint', date: '28 Apr 2026' },
    { id: 'EMP007', name: 'James Wilson', time: '11:18:42 AM', status: 'Late', method: 'fingerprint', date: '28 Apr 2026' },
    { id: 'EMP008', name: 'Jessica Martinez', time: '10:16:30 AM', status: 'Present', method: 'fingerprint', date: '28 Apr 2026' },
    { id: 'EMP009', name: 'Christopher Taylor', time: '10:14:21 AM', status: 'Present', method: 'fingerprint', date: '28 Apr 2026' },
    { id: 'EMP010', name: 'Amanda Anderson', time: '10:12:08 AM', status: 'Absent', method: 'none', date: '28 Apr 2026' },
    { id: 'EMP011', name: 'Daniel Thomas', time: '10:10:45 AM', status: 'Present', method: 'fingerprint', date: '28 Apr 2026' },
    { id: 'EMP012', name: 'Jennifer Jackson', time: '10:08:32 AM', status: 'Present', method: 'fingerprint', date: '28 Apr 2026' },
    { id: 'EMP013', name: 'Robert White', time: '10:06:19 AM', status: 'Present', method: 'fingerprint', date: '28 Apr 2026' },
    { id: 'EMP014', name: ' Terrry Onyango', time: '10:04:06 AM', status: 'Present', method: 'fingerprint', date: '28 Apr 2026' },
    { id: 'EMP015', name: 'Levis Ochieng', time: '10:02:53 AM', status: 'Present', method: 'fingerprint', date: '28 Apr 2026' },
]

const avatarColors = [
  'bg-blue-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-green-500',
  'bg-orange-500',
]

const getInitials = (name) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

const getStatusColor = (status) => {
  switch (status) {
    case 'Present':
      return 'bg-green-500/20 text-green-400'
    case 'Late':
      return 'bg-amber-500/20 text-amber-400'
    case 'Absent':
      return 'bg-red-500/20 text-red-400'
    default:
      return 'bg-slate-500/20 text-slate-400'
  }
}

const sortOptions = [
  { value: 'name', label: 'Name' },
  { value: 'date', label: 'Date' },
  { value: 'time', label: 'Time' },
  { value: 'status', label: 'Status' },
]

const statusOrder = {
  Present: 1,
  Late: 2,
  Absent: 3,
}

const parseAttendanceDateTime = (row) => {
  return new Date(`${row.date} ${row.time}`)
}

export default function BiometricAttendance() {
  const navigate = useNavigate()
  const [sortBy, setSortBy] = useState('name')
  const [page, setPage] = useState(1)
  const pageSize = 15

  const sortedData = useMemo(() => {
    return [...allAttendanceData].sort((a, b) => {
      if (sortBy === 'status') {
        return (statusOrder[a.status] || 99) - (statusOrder[b.status] || 99)
      }

      if (sortBy === 'date' || sortBy === 'time') {
        return parseAttendanceDateTime(a) - parseAttendanceDateTime(b)
      }

      return a[sortBy]?.toString().localeCompare(b[sortBy]?.toString() || '') || 0
    })
  }, [sortBy])

  const pageCount = Math.max(1, Math.ceil(sortedData.length / pageSize))
  const pagedData = sortedData.slice((page - 1) * pageSize, page * pageSize)

  const handleBack = () => {
    navigate('/')
  }

  const handleSortChange = (event) => {
    setSortBy(event.target.value)
    setPage(1)
  }

  const handlePageClick = (targetPage) => {
    setPage(targetPage)
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-transparent">
      <Sidebar />

      <main className="flex-1 p-6 sm:p-8 space-y-6 pt-16 lg:pt-6">
        <Navbar />

        {/* Header with Back Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
          >
            <ArrowLeft size={20} />
            Back
          </button>
          <h1 className="text-white text-2xl font-semibold flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-cyan-500 inline-block"></span>
            Biometric Attendance Records
          </h1>
        </div>

        {/* Main Table */}
        <div className="bg-slate-900 rounded-2xl p-5 shadow-lg border border-slate-700 overflow-x-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div>
              <p className="text-slate-300 text-sm">
                Total Records: <span className="font-semibold text-white">{allAttendanceData.length}</span>
              </p>
              <p className="text-slate-500 text-xs">Showing page {page} of {pageCount}</p>
            </div>
            <div className="flex items-center gap-3">
              <label htmlFor="sortBy" className="text-slate-400 text-xs uppercase tracking-[0.1em] font-medium">Sort by</label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={handleSortChange}
                className="bg-slate-800 text-white px-3 py-2 rounded-lg border border-slate-700 focus:outline-none"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <table className="min-w-full w-full text-white border-collapse">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="px-4 py-3 text-left text-xs uppercase tracking-[0.1em] text-slate-400 font-medium">ID</th>
                <th className="px-4 py-3 text-left text-xs uppercase tracking-[0.1em] text-slate-400 font-medium">Name</th>
                <th className="px-4 py-3 text-left text-xs uppercase tracking-[0.1em] text-slate-400 font-medium">Date</th>
                <th className="px-4 py-3 text-left text-xs uppercase tracking-[0.1em] text-slate-400 font-medium">Time</th>
                <th className="px-4 py-3 text-left text-xs uppercase tracking-[0.1em] text-slate-400 font-medium">Status</th>
                <th className="px-4 py-3 text-left text-xs uppercase tracking-[0.1em] text-slate-400 font-medium">Method</th>
              </tr>
            </thead>
            <tbody>
              {pagedData.map((row, index) => (
                <tr key={`${row.id}-${index}`} className="border-b border-slate-700 hover:bg-slate-800 transition-colors">
                  <td className="px-4 py-3 text-sm text-slate-300">{row.id}</td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${avatarColors[index % avatarColors.length]} flex items-center justify-center text-white text-xs font-semibold`}>
                        {getInitials(row.name)}
                      </div>
                      <span className="text-slate-200">{row.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-300">{row.date}</td>
                  <td className="px-4 py-3 text-sm text-slate-300">{row.time}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(row.status)}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {row.method === 'fingerprint' ? (
                      <Fingerprint size={18} className="text-purple-400" />
                    ) : (
                      <span className="text-slate-500">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">
            <p className="text-slate-400 text-sm">
              Showing {pagedData.length} records on this page
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => handlePageClick(Math.max(1, page - 1))}
                disabled={page === 1}
                className="rounded-lg px-3 py-2 bg-slate-800 text-slate-300 disabled:opacity-50 hover:bg-slate-700"
              >
                Previous
              </button>
              {Array.from({ length: pageCount }, (_, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePageClick(idx + 1)}
                  className={`rounded-lg px-3 py-2 text-sm ${page === idx + 1 ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageClick(Math.min(pageCount, page + 1))}
                disabled={page === pageCount}
                className="rounded-lg px-3 py-2 bg-slate-800 text-slate-300 disabled:opacity-50 hover:bg-slate-700"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
