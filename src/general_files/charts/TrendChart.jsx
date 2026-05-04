//trend chart component
// connects data collected by the Iot and Visualizes it on the dashboard for analysis

// We will use the MQTT protocol to connect eith fastapi that for data visualization


// We will use the ComposedChart to combine both line and bar charts for better visualization of trends


/*

import {
    ComposedChart,
    Bar,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    Legend
} from "recharts";

const data = [
    { time: "08:00", temp: 26, humidity: 55 },
    { time: "09:00", temp: 27, humidity: 58 },
    { time: "10:00", temp: 28, humidity: 60 },
    { time: "11:00", temp: 29, humidity: 63 },
    { time: "12:00", temp: 28.6, humidity: 62.4 },
];

export default function TrendChart() {
    return (
        <div className="bg-slate-900 rounded-2xl p-5 h-[380px] shadow-lg">
            <h2 className="text-white text-lg font-semibold mb-4">
                Environmental Trends
            </h2>

            <ResponsiveContainer width="100%" height="90%">
                <ComposedChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

                    <XAxis dataKey="time" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />

                    <Tooltip />
                    <Legend />

                    <Bar
                        dataKey="humidity"
                        fill="#3b82f6"
                        radius={[5, 5, 0, 0]}
                        name="Humidity %"
                    />

                    <Line
                        type="monotone"
                        dataKey="temp"
                        stroke="#22c55e"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                        name="Temperature °C"
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
}

*/


import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from "recharts";

import { useMemo, useState } from "react";

const filterOptions = [
  { value: "today", label: "Today", rangeMs: 1000 * 60 * 60 * 24 },
  { value: "24h", label: "Last 24 Hours", rangeMs: 1000 * 60 * 60 * 24 },
  { value: "week", label: "Last 7 Days", rangeMs: 1000 * 60 * 60 * 24 * 7 },
  { value: "month", label: "Last 30 Days", rangeMs: 1000 * 60 * 60 * 24 * 30 },
];

const rawData = (() => {
  const now = new Date();
  const samplePoints = [
    { daysAgo: 0, hours: 8, temp: 28.5, humidity: 61 },
    { daysAgo: 0, hours: 10, temp: 28.9, humidity: 62 },
    { daysAgo: 0, hours: 12, temp: 29.3, humidity: 64 },
    { daysAgo: 0, hours: 14, temp: 29.0, humidity: 63 },
    { daysAgo: 0, hours: 18, temp: 28.7, humidity: 62 },
    { daysAgo: 1, hours: 8, temp: 28.6, humidity: 62 },
    { daysAgo: 1, hours: 10, temp: 28.9, humidity: 63 },
    { daysAgo: 1, hours: 11, temp: 29.2, humidity: 64 },
    { daysAgo: 1, hours: 14, temp: 29.0, humidity: 63 },
    { daysAgo: 1, hours: 18, temp: 28.7, humidity: 62 },
    { daysAgo: 2, hours: 8, temp: 28.5, humidity: 61 },
    { daysAgo: 3, hours: 10, temp: 28.9, humidity: 62 },
    { daysAgo: 4, hours: 12, temp: 29.3, humidity: 64 },
    { daysAgo: 5, hours: 14, temp: 29.0, humidity: 63 },
    { daysAgo: 6, hours: 18, temp: 28.7, humidity: 62 },
    { daysAgo: 7, hours: 8, temp: 28.6, humidity: 62 },
    { daysAgo: 10, hours: 10, temp: 28.9, humidity: 63 },
    { daysAgo: 15, hours: 11, temp: 29.2, humidity: 64 },
    { daysAgo: 20, hours: 14, temp: 29.0, humidity: 63 },
    { daysAgo: 25, hours: 18, temp: 28.7, humidity: 62 },
  ];

  return samplePoints.map(({ daysAgo, hours, temp, humidity }) => {
    const timestamp = new Date(now);
    timestamp.setDate(now.getDate() - daysAgo);
    timestamp.setHours(hours, 0, 0, 0);
    return { timestamp, temp, humidity };
  });
})();

function formatLabel(timestamp) {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  return `${month} ${day} ${hours}:${minutes}`;
}

export default function TrendChart() {
  const [filter, setFilter] = useState("week");

  const filteredData = useMemo(() => {
    const now = Date.now();
    const selectedRange = filterOptions.find((option) => option.value === filter)?.rangeMs ?? 0;
    const rawFiltered = rawData
      .filter((item) => now - item.timestamp.getTime() <= selectedRange)
      .sort((a, b) => a.timestamp - b.timestamp);

    console.log('Filter:', filter, 'Range:', selectedRange, 'Filtered data length:', rawFiltered.length);

    return rawFiltered.map((item) => ({
      time: formatLabel(item.timestamp),
      temp: item.temp,
      humidity: item.humidity,
    }));
  }, [filter]);

  const summary = useMemo(() => {
    if (!filteredData.length) {
      return {
        avgTemp: "-",
        avgHumidity: "-",
        maxTemp: "-",
        entries: 0,
      };
    }

    const totalTemp = filteredData.reduce((sum, item) => sum + item.temp, 0);
    const totalHumidity = filteredData.reduce((sum, item) => sum + item.humidity, 0);
    const maxTemp = Math.max(...filteredData.map((item) => item.temp));
    return {
      avgTemp: (totalTemp / filteredData.length).toFixed(1),
      avgHumidity: Math.round(totalHumidity / filteredData.length),
      maxTemp: maxTemp.toFixed(1),
      entries: filteredData.length,
    };
  }, [filteredData]);

  const selectLabel = filterOptions.find((option) => option.value === filter)?.label ?? "Today";

  return (
    <div className="bg-slate-900 rounded-2xl py-14 px-6 border border-slate-700 shadow-lg">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
        <div className= "ml-4"> 
          <h2 className="text-white text-lg font-semibold flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-purple-500 inline-block"></span>
            Environmental Trends
          </h2>
          <p className="text-slate-400 text-sm mt-1">Showing data distribution for {selectLabel}</p>
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-slate-800 text-white px-3 py-3 rounded-md border border-slate-700 focus:outline-none"
        >
          {filterOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <div className="rounded-xl bg-slate-800 p-3">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Avg Temp</p>
          <p className="text-white text-lg font-semibold">{summary.avgTemp}°C</p>
        </div>
        <div className="rounded-xl bg-slate-800 p-3">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Avg Humidity</p>
          <p className="text-white text-lg font-semibold">{summary.avgHumidity}%</p>
        </div>
        <div className="rounded-xl bg-slate-800 p-3">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Peak Temp</p>
          <p className="text-white text-lg font-semibold">{summary.maxTemp}°C</p>
        </div>
        <div className="rounded-xl bg-slate-800 p-3">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Records</p>
          <p className="text-white text-lg font-semibold">{summary.entries}</p>
        </div>
      </div>

      <div className="min-h-[320px]">
        {filteredData.length > 0 ? (
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="time" stroke="#94a3b8" tick={{fontSize: 12}} />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155" }} />
            <Legend wrapperStyle={{ color: "#94a3b8" }} />
            <Line
              type="monotone"
              dataKey="temp"
              stroke="#22c55e"
              strokeWidth={3}
              dot={{ r: 4 }}
              name="Temperature °C"
            />
            <Line
              type="monotone"
              dataKey="humidity"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 4 }}
              name="Humidity %"
            />
              </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-slate-400">
            No data available for the selected time range
          </div>
        )}
      </div>
    </div>
  );
}
