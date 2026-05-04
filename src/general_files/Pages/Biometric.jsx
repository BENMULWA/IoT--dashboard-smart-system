import { useMemo, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { Fingerprint, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const allAttendanceData = [
  { id: 'EMP001', name: 'Benard Mulwa', time: '10:30:42 AM', status: 'Present', method: 'fingerprint', date: '28 Apr 2026' },
  { id: 'EMP002', name: 'Dr. Frank Otieno', time: '10:28:15 AM', status: 'Present', method: 'fingerprint', date: '28 Apr 2026' },
  { id: 'EMP003', name: 'Eric Chiguba', time: '10:28:15 AM', status: 'Present', method: 'fingerprint', date: '28 Apr 2026' },
  { id: 'EMP004', name: 'Elijah Kakiro', time: '10:26:33 AM', status: 'Present', method: 'fingerprint', date: '28 Apr 2026' },
  { id: 'EMP005', name: 'Sarah Wilson', time: '10:24:08 AM', status: 'Absent', method: 'none', date: '28 Apr 2026' },
  { id: 'EMP006', name: 'Doreen Mutua', time: '10:22:51 AM', status: 'Present', method: 'fingerprint', date: '28 Apr 2026' },
  { id: 'EMP007', name: 'Emily Davis', time: '10:20:15 AM', status: 'Present', method: 'fingerprint', date: '28 Apr 2026' },
  { id: 'EMP008', name: 'James Wilson', time: '11:18:42 AM', status: 'Late', method: 'fingerprint', date: '28 Apr 2026' },
  { id: 'EMP009', name: 'Jessica Martinez', time: '10:16:30 AM', status: 'Present', method: 'fingerprint', date: '28 Apr 2026' },
  { id: 'EMP010', name: 'Christopher Taylor', time: '10:14:21 AM', status: 'Present', method: 'fingerprint', date: '28 Apr 2026' },
  { id: 'EMP011', name: 'Amanda Anderson', time: '10:12:08 AM', status: 'Absent', method: 'none', date: '28 Apr 2026' },
  { id: 'EMP012', name: 'Daniel Thomas', time: '10:10:45 AM', status: 'Present', method: 'fingerprint', date: '28 Apr 2026' },
  { id: 'EMP013', name: 'Jennifer Jackson', time: '10:08:32 AM', status: 'Present', method: 'fingerprint', date: '28 Apr 2026' },
  { id: 'EMP014', name: 'Robert White', time: '10:06:19 AM', status: 'Present', method: 'fingerprint', date: '28 Apr 2026' },
  { id: 'EMP015', name: 'Terry Onyango', time: '10:04:06 AM', status: 'Present', method: 'fingerprint', date: '28 Apr 2026' },
  { id: 'EMP016', name: 'Levis Ochieng', time: '10:02:53 AM', status: 'Present', method: 'fingerprint', date: '28 Apr 2026' },

  // 👉 EXTRA DATA FOR 3+ PAGES
  { id: 'EMP017', name: 'Kevin Otieno', time: '09:58:10 AM', status: 'Present', method: 'fingerprint', date: '28 Apr 2026' },
  { id: 'EMP018', name: 'Grace Wanjiku', time: '09:55:33 AM', status: 'Late', method: 'fingerprint', date: '28 Apr 2026' },
  { id: 'EMP019', name: 'Brian Mutiso', time: '09:52:21 AM', status: 'Absent', method: 'none', date: '28 Apr 2026' },
  { id: 'EMP020', name: 'Faith Achieng', time: '09:50:11 AM', status: 'Present', method: 'fingerprint', date: '28 Apr 2026' },
  { id: 'EMP021', name: 'Mark Njoroge', time: '09:48:45 AM', status: 'Present', method: 'fingerprint', date: '28 Apr 2026' },
  { id: 'EMP022', name: 'Jane Nyambura', time: '09:46:30 AM', status: 'Present', method: 'fingerprint', date: '28 Apr 2026' },
  { id: 'EMP023', name: 'Peter Mwangi', time: '09:44:12 AM', status: 'Late', method: 'fingerprint', date: '28 Apr 2026' },
  { id: 'EMP024', name: 'Linda Wambui', time: '09:41:55 AM', status: 'Present', method: 'fingerprint', date: '28 Apr 2026' },
  { id: 'EMP025', name: 'Samuel Kiprotich', time: '09:39:20 AM', status: 'Absent', method: 'none', date: '28 Apr 2026' },
  { id: 'EMP026', name: 'Alice Chebet', time: '09:37:10 AM', status: 'Present', method: 'fingerprint', date: '28 Apr 2026' },
  { id: 'EMP027', name: 'David Ouma', time: '09:35:05 AM', status: 'Present', method: 'fingerprint', date: '28 Apr 2026' },
  { id: 'EMP028', name: 'Nancy Auma', time: '09:33:44 AM', status: 'Present', method: 'fingerprint', date: '28 Apr 2026' },
];

const avatarColors = [
  'bg-blue-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-green-500',
  'bg-orange-500',
]

const getInitials = (name) =>
  name.split(' ').map((n) => n[0]).join('').toUpperCase()

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

export default function BiometricAttendance() {
  const navigate = useNavigate()
  const [sortBy, setSortBy] = useState('name')
  const [page, setPage] = useState(1)

  const pageSize = 10

  const sortedData = useMemo(() => {
    return [...allAttendanceData].sort((a, b) =>
      a[sortBy]?.toString().localeCompare(b[sortBy]?.toString() || '')
    )
  }, [sortBy])

  const pageCount = Math.ceil(sortedData.length / pageSize)
  const pagedData = sortedData.slice((page - 1) * pageSize, page * pageSize)

  return (
    <div className="flex flex-col lg:flex-row min-h-screen text-lg bg-transparent">

      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 pt-16 lg:pt-6">

        <Navbar />

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 w-fit"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <h1 className="text-white text-lg sm:text-2xl font-semibold flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span>
            Biometric Attendance Records
          </h1>
        </div>

        {/* TABLE CONTAINER */}
        <div className="bg-slate-900 rounded-2xl p-4 sm:p-5 shadow-lg border border-slate-700">

          {/* TOP BAR */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">

            <div>
              <p className="text-slate-300 text-sm">
                Total Records: <span className="text-white font-semibold">{allAttendanceData.length}</span>
              </p>
              <p className="text-slate-500 text-xs">
                Page {page} of {pageCount}
              </p>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-800 text-white px-3 py-2 rounded-lg border border-slate-700 w-full sm:w-auto"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  Sort by {o.label}
                </option>
              ))}
            </select>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="min-w-[700px] w-full text-white">

              <thead>
                <tr className="border-b border-slate-700 text-xs uppercase text-slate-400">
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Time</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Method</th>
                </tr>
              </thead>

              <tbody>
                {pagedData.map((row, i) => (
                  <tr key={row.id + i} className="border-b border-slate-800 hover:bg-slate-800/50">

                    <td className="p-3 text-sm text-slate-300">{row.id}</td>

                    <td className="p-3 flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-xs`}>
                        {getInitials(row.name)}
                      </div>
                      <span className="text-slate-200 text-sm">{row.name}</span>
                    </td>

                    <td className="p-3 text-sm text-slate-300">{row.date}</td>
                    <td className="p-3 text-sm text-slate-300">{row.time}</td>

                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(row.status)}`}>
                        {row.status}
                      </span>
                    </td>

                    <td className="p-3 text-purple-400">
                      {row.method === 'fingerprint' ? <Fingerprint size={16} /> : '—'}
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>

          {/* PAGINATION */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-4">

            <p className="text-slate-400 text-sm">
              Showing {pagedData.length} records
            </p>

            <div className="flex flex-wrap gap-2 justify-center">

              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                className="px-3 py-2 bg-slate-800 rounded-lg text-sm"
              >
                Prev
              </button>

              {Array.from({ length: pageCount }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-3 py-2 rounded-lg text-sm ${
                    page === i + 1 ? 'bg-cyan-500 text-black' : 'bg-slate-800 text-white'
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => setPage(Math.min(pageCount, page + 1))}
                className="px-3 py-2 bg-slate-800 rounded-lg text-sm"
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