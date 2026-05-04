import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useMemo, useState } from "react";

const filterOptions = [
  { value: "today", label: "Today" },
  { value: "yesterday", label: "Yesterday" },
  { value: "week", label: "Last 7 Days" },
  { value: "month", label: "Last 30 Days" },
];

const rawAttendanceData = (() => {
  const now = new Date();
  const samplePoints = [
    { daysAgo: 0, hours: 8, status: "present" },
    { daysAgo: 0, hours: 9, status: "present" },
    { daysAgo: 0, hours: 10, status: "late" },
    { daysAgo: 0, hours: 11, status: "absent" },
    { daysAgo: 1, hours: 8, status: "present" },
    { daysAgo: 2, hours: 9, status: "absent" },
    { daysAgo: 3, hours: 10, status: "late" },
    { daysAgo: 4, hours: 8, status: "present" },
  ];

  return samplePoints.map(({ daysAgo, hours, status }, index) => {
    const timestamp = new Date(now);
    timestamp.setDate(now.getDate() - daysAgo);
    timestamp.setHours(hours, 0, 0, 0);

    return {
      id: `EMP${String(index + 1).padStart(3, "0")}`,
      status,
      timestamp,
    };
  });
})();

const COLORS = ["#22c55e", "#ef4444", "#f59e0b"];

export default function DistributionChart({
  todayAttendanceTotals = { present: 128, absent: 15, late: 0 },
}) {
  const [filter, setFilter] = useState("today");
  const [open, setOpen] = useState(false); // ✅ FIX ADDED

  const selectedFilter =
    filterOptions.find((f) => f.value === filter) || filterOptions[0];

  const filteredData = useMemo(() => {
    const now = new Date();
    let startTime = new Date(now);

    if (filter === "today") startTime.setHours(0, 0, 0, 0);
    if (filter === "yesterday") startTime.setDate(now.getDate() - 1);
    if (filter === "week") startTime.setDate(now.getDate() - 7);
    if (filter === "month") startTime.setDate(now.getDate() - 30);

    return rawAttendanceData.filter((item) => {
      return item.timestamp.getTime() >= startTime.getTime();
    });
  }, [filter]);

  const statusCounts = useMemo(() => {
    if (filter === "today") return todayAttendanceTotals;

    return filteredData.reduce(
      (acc, item) => {
        acc[item.status] = (acc[item.status] || 0) + 1;
        return acc;
      },
      { present: 0, absent: 0, late: 0 }
    );
  }, [filteredData, filter, todayAttendanceTotals]);

  const totalRecords =
    statusCounts.present + statusCounts.absent + statusCounts.late;

  const totalRegisteredStudents = 143;

  const distributionData = useMemo(() => {
    return [
      {
        name: "Present",
        value: statusCounts.present,
        color: "#22c55e",
      },
      {
        name: "Absent",
        value: statusCounts.absent,
        color: "#ef4444",
      },
      {
        name: "Late",
        value: statusCounts.late,
        color: "#f59e0b",
      },
    ].filter((item) => item.value > 0);
  }, [statusCounts]);

  return (
    <div className="bg-slate-900 rounded-2xl p-5 border border-slate-700 shadow-lg">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-4">

        <div>
          <h2 className="text-white text-lg font-semibold flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span>
            Attendance Distribution
          </h2>

          <p className="text-slate-400 text-sm mt-1">
            Showing data for {selectedFilter.label}
          </p>
        </div>

        {/* ✅ MOBILE SAFE DROPDOWN FIX */}
        <div className="relative w-full sm:w-40">

          <button
            onClick={() => setOpen(!open)}
            className="w-full bg-slate-800 text-white px-4 py-2 rounded-xl border border-slate-700 flex justify-between items-center"
          >
            {selectedFilter.label}
            <span>▾</span>
          </button>

          {open && (
            <div className="absolute left-0 mt-2 w-full bg-slate-800 border border-slate-700 rounded-xl shadow-xl z-50 overflow-hidden">

              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setFilter(option.value);
                    setOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-white hover:bg-slate-700 transition"
                >
                  {option.label}
                </button>
              ))}

            </div>
          )}
        </div>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">

        <div className="rounded-xl bg-slate-800 p-4">
          <p className="text-xs uppercase text-slate-500">
            Total Students Registered
          </p>
          <p className="text-white text-2xl font-semibold">
            {totalRegisteredStudents}
          </p>
        </div>

        <div className="rounded-xl bg-slate-800 p-4">
          <p className="text-xs uppercase text-slate-500">
            Attendance Rate
          </p>
          <p className="text-white text-2xl font-semibold">
            {totalRegisteredStudents > 0
              ? Math.round(
                ((statusCounts.present + statusCounts.late) /
                  totalRegisteredStudents) *
                100
              )
              : 0}
            %
          </p>
        </div>

      </div>

      {/* DONUT CHART (UNCHANGED) */}
      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={distributionData}
              cx="50%"
              cy="50%"
              innerRadius={58}
              outerRadius={90}
              dataKey="value"
              paddingAngle={4}
            >
              {distributionData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}