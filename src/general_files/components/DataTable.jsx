import { Fingerprint } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const avatarColors = [
  'bg-blue-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-green-500',
  'bg-orange-500',
];

const getInitials = (name) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};

export default function DataTable({ attendance }) {
  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate('/biometric-attendance');
  };
  return (
    <div className="bg-slate-900 rounded-2xl p-5 shadow-lg border border-slate-700 overflow-x-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white text-lg font-semibold flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-cyan-500 inline-block"></span>
          Recent Attendance
        </h3>
        <button onClick={handleViewAll} className="text-cyan-500 text-sm hover:text-cyan-400 transition-colors">View All</button>
      </div>
      <table className="min-w-full w-full text-white border-collapse">
        <thead>
          <tr className="border-b border-slate-700">
            <th className="px-4 py-3 text-left text-xs uppercase tracking-[0.1em] text-slate-400 font-medium">ID</th>
            <th className="px-4 py-3 text-left text-xs uppercase tracking-[0.1em] text-slate-400 font-medium">Name</th>
            <th className="px-4 py-3 text-left text-xs uppercase tracking-[0.1em] text-slate-400 font-medium">Time</th>
            <th className="px-4 py-3 text-left text-xs uppercase tracking-[0.1em] text-slate-400 font-medium">Status</th>
            <th className="px-4 py-3 text-left text-xs uppercase tracking-[0.1em] text-slate-400 font-medium">Method</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((row, index) => (
            <tr key={index} className="border-b border-slate-700 hover:bg-slate-800 transition-colors">
              <td className="px-4 py-3 text-sm text-slate-300">{row.id}</td>
              <td className="px-4 py-3 text-sm">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full ${avatarColors[index % avatarColors.length]} flex items-center justify-center text-white text-xs font-semibold`}>
                    {getInitials(row.name)}
                  </div>
                  <span className="text-slate-200">{row.name}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-sm text-slate-300">{row.time}</td>
              <td className="px-4 py-3 text-sm">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  row.status === 'Present'
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-red-500/20 text-red-400'
                }`}>
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
    </div>
  );
}
