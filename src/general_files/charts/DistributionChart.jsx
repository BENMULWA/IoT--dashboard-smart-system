// distribution charts (pie chart for students present and the students absent)

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";
import { useMemo, useState } from "react";

const filterOptions = [
  { value: "today", label: "Today" },
  { value: "yesterday", label: "Yesterday" },
  { value: "week", label: "Last 7 Days" },
  { value: "month", label: "Last 30 Days" },
];

// Sample attendance data with different statuses and timestamps
const rawAttendanceData = (() => {
  const now = new Date();
  const samplePoints = [
    { daysAgo: 0, hours: 8, status: 'present' },
    { daysAgo: 0, hours: 9, status: 'present' },
    { daysAgo: 0, hours: 10, status: 'late' },
    { daysAgo: 0, hours: 11, status: 'absent' },
    { daysAgo: 0, hours: 12, status: 'present' },
    { daysAgo: 0, hours: 13, status: 'present' },
    { daysAgo: 1, hours: 8, status: 'present' },
    { daysAgo: 1, hours: 9, status: 'late' },
    { daysAgo: 1, hours: 10, status: 'present' },
    { daysAgo: 1, hours: 11, status: 'absent' },
    { daysAgo: 2, hours: 8, status: 'present' },
    { daysAgo: 3, hours: 9, status: 'absent' },
    { daysAgo: 4, hours: 10, status: 'late' },
    { daysAgo: 5, hours: 8, status: 'present' },
    { daysAgo: 6, hours: 9, status: 'present' },
  ];

  return samplePoints.map(({ daysAgo, hours, status }, index) => {
    const timestamp = new Date(now);
    timestamp.setDate(now.getDate() - daysAgo);
    timestamp.setHours(hours, 0, 0, 0);
    return { id: `EMP${String(index + 1).padStart(3, '0')}`, status, timestamp };
  });
})();

const COLORS = ["#22c55e", "#ef4444", "#f59e0b"];

export default function DistributionChart({ todayAttendanceTotals = { present: 128, absent: 15, late: 0 } }) {
  const [filter, setFilter] = useState("today");

  const filteredData = useMemo(() => {
    const now = new Date();
    let startTime = new Date(now);
    let endTime = now;

    if (filter === "today") {
      startTime.setHours(0, 0, 0, 0);
    } else if (filter === "yesterday") {
      startTime.setDate(startTime.getDate() - 1);
      startTime.setHours(0, 0, 0, 0);
      endTime = new Date(startTime);
      endTime.setHours(23, 59, 59, 999);
    } else if (filter === "week") {
      startTime.setDate(startTime.getDate() - 7);
      startTime.setHours(0, 0, 0, 0);
    } else if (filter === "month") {
      startTime.setDate(startTime.getDate() - 30);
      startTime.setHours(0, 0, 0, 0);
    }

    return rawAttendanceData.filter((item) => {
      const timestamp = item.timestamp.getTime();
      return timestamp >= startTime.getTime() && timestamp <= endTime.getTime();
    });
  }, [filter]);

  const statusCounts = useMemo(() => {
    if (filter === "today" && todayAttendanceTotals) {
      return {
        present: todayAttendanceTotals.present || 0,
        absent: todayAttendanceTotals.absent || 0,
        late: todayAttendanceTotals.late || 0,
      };
    }

    return filteredData.reduce(
      (acc, item) => {
        acc[item.status] = (acc[item.status] || 0) + 1;
        return acc;
      },
      { present: 0, absent: 0, late: 0 }
    );
  }, [filteredData, filter, todayAttendanceTotals]);

  const totalRecords = statusCounts.present + statusCounts.absent + statusCounts.late;
  const totalRegisteredStudents = 143; // Fixed total registered students for the course

  const distributionData = useMemo(() => {
    const total = totalRecords;
    return [
      {
        name: "Present",
        value: statusCounts.present,
        percent: total ? Math.round((statusCounts.present / total) * 100) : 0,
        color: "#22c55e"
      },
      {
        name: "Absent",
        value: statusCounts.absent,
        percent: total ? Math.round((statusCounts.absent / total) * 100) : 0,
        color: "#ef4444"
      },
      {
        name: "Late",
        value: statusCounts.late,
        percent: total ? Math.round((statusCounts.late / total) * 100) : 0,
        color: "#f59e0b"
      }
    ].filter(item => item.value > 0);
  }, [statusCounts, totalRecords]);

  const selectLabel = filterOptions.find((option) => option.value === filter)?.label ?? "Today";

  return (
      <div className="bg-slate-900 rounded-2xl p-5 border border-slate-700 shadow-lg">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between mb-4">
        <div>
          <h2 className="text-white text-lg font-semibold flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span>
            Attendance Distribution
          </h2>
          <p className="text-slate-400 text-sm mt-1">Showing data for {selectLabel}</p>
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-slate-800 text-white px-3 py-2 rounded-md border border-slate-700 focus:outline-none"
        >
          {filterOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div className="rounded-xl bg-slate-800 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Total Students Registered</p>
          <p className="text-white text-2xl font-semibold">{totalRegisteredStudents}</p>
          <p className="text-slate-400 text-sm mt-1">Enrolled in course</p>
        </div>
        <div className="rounded-xl bg-slate-800 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Attendance Rate</p>
          <p className="text-white text-2xl font-semibold">
            {totalRegisteredStudents > 0 ? Math.round(((statusCounts.present + statusCounts.late) / totalRegisteredStudents) * 100) : 0}%
          </p>
          <p className="text-slate-400 text-sm mt-1">Clocked in / Total registered</p>
        </div>
      </div>

      <div className="mt-4">
        {distributionData.length > 0 ? (
          <>
            <div className="min-h-[260px]">
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={distributionData}
                    cx="50%"
                    cy="40%"
                    innerRadius={58}
                    outerRadius={90}
                    dataKey="value"
                    label={false}
                    labelLine={false}
                    paddingAngle={4}
                  >
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      borderColor: "#334155",
                      borderRadius: "10px"
                    }}
                    formatter={(value, name) => [`${value} students`, name]}
                  />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    wrapperStyle={{ color: "#94a3b8", fontSize: "13px", marginTop: 8 }}
                    iconType="circle"
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
              {distributionData.map((item, index) => {
                const percent = totalRecords > 0 ? Math.round((item.value / totalRecords) * 100) : 0;
                const colorClass = item.name === 'Present'
                  ? 'bg-emerald-500'
                  : item.name === 'Absent'
                    ? 'bg-red-500'
                    : 'bg-amber-500';

                return (
                  <div key={item.name} className="rounded-xl bg-slate-800 p-4 flex items-center gap-3">
                    <span className={`w-3 h-3 rounded-full ${colorClass}`} />
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{item.name}</p>
                      <p className="text-white text-lg font-semibold">{percent}%</p>
                      <p className="text-slate-400 text-sm">{item.value} students</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-slate-400">
            No attendance data available for the selected time range
          </div>
        )}
      </div>
    </div>
  );
}