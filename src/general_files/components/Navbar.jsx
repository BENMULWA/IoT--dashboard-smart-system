import { useState } from 'react'
import { Bell, Download, CalendarDays, ChartNoAxesCombined } from 'lucide-react'

function formatDate(value) {
  return new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

// Navbar component with date range filter and export button
export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [startDate, setStartDate] = useState('2025-05-19')
  const [endDate, setEndDate] = useState('2025-05-25')

  return (
    <div className='bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center relative'>
      <div>
        <ChartNoAxesCombined size={35} className='text-indigo-600' /> 
              <h1 className='text-white text-4xl sm:text-3xl font-extrabold font-family-arial'>
                  Dashboard Overview
              </h1>

        <p className='text-slate-400 mt-1'>Biometric Attendance & Environmental Monitoring System</p>
      </div>

      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3'>
        <div className='relative w-full sm:w-auto'>
          <button
            type='button'
            onClick={() => setOpen((value) => !value)}
            className='w-full sm:w-auto flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-blue-500 text-slate-200 text-sm sm:text-base'
          >
            <CalendarDays size={20} />
            <span className='truncate'>{`${formatDate(startDate)} - ${formatDate(endDate)}`}</span>
          </button>

          {open && (
            <div className='absolute right-0 top-full z-10 mt-2 min-w-[320px] max-w-[90vw] rounded-3xl bg-slate-950 border border-slate-800 p-5 shadow-2xl'>
              <div className='mb-4 text-slate-300 text-sm font-semibold uppercase tracking-wide'>Filter by date range</div>
              <div className='grid gap-4'>
                <label className='text-slate-300 text-sm font-medium'>Start date</label>
                <input
                  type='date'
                  value={startDate}
                  onChange={(event) => setStartDate(event.target.value)}
                  className='w-full rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-base text-slate-100 outline-none transition duration-150 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                />
                <label className='text-slate-300 text-sm font-medium'>End date</label>
                <input
                  type='date'
                  value={endDate}
                  onChange={(event) => setEndDate(event.target.value)}
                  className='w-full rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-base text-slate-100 outline-none transition duration-150 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                />
                <button
                  type='button'
                  onClick={() => setOpen(false)}
                  className='mt-3 rounded-3xl bg-indigo-600 px-5 py-4 text-base font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-500'
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>

        <button className='p-3 rounded-xl bg-slate-800 text-white'>
          <Bell size={20} />
        </button>
        <button className='w-full sm:w-auto px-5 py-3 rounded-xl bg-indigo-600 text-white flex items-center justify-center gap-2 text-sm sm:text-base'>
          <Download size={20} />Export Report
        </button>
      </div>
    </div>
  )
}
