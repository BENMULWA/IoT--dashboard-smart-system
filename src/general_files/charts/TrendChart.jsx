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
  Legend,
} from "recharts";
import { useMemo, useState } from "react";

/* 🌍 ROOM DATA */
const rooms = [
  { name: "Lecture Hall", baseTemp: 28.6, baseHumidity: 62.4 },
  { name: "Laboratory", baseTemp: 30.2, baseHumidity: 58.7 },
  { name: "Outdoor", baseTemp: 32.8, baseHumidity: 54.1 },
  { name: "Library", baseTemp: 25.4, baseHumidity: 66.8 },
  { name: "Office", baseTemp: 27.5, baseHumidity: 61.2 },
  { name: "Cafeteria", baseTemp: 29.7, baseHumidity: 64.5 },
];

/* 🌄 Generate mountain-style data */
const generateWave = (room) => {
  const data = [];

  for (let i = 0; i < 30; i++) {
    const wave = Math.sin(i * 0.5) * 3;

    data.push({
      time: `T${i}`,
      temp: Number((room.baseTemp + wave + Math.random()).toFixed(1)),
      humidity: Number((room.baseHumidity + wave * 1.2 + Math.random()).toFixed(1)),
    });
  }

  return data;
};

export default function TrendChart() {
  const [selected, setSelected] = useState(rooms[0]);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(generateWave(rooms[0]));

  const handleSelect = (room) => {
    setSelected(room);
    setData(generateWave(room));
    setOpen(false);
  };

  /* 📊 ANALYTICS */
  const summary = useMemo(() => {
    const temps = data.map((d) => d.temp);
    const hums = data.map((d) => d.humidity);

    return {
      avgTemp: (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1),
      avgHumidity: (hums.reduce((a, b) => a + b, 0) / hums.length).toFixed(1),
      peakTemp: Math.max(...temps).toFixed(1),
    };
  }, [data]);

  return (
    <div className="bg-slate-900 p-4 rounded-2xl border border-slate-700 shadow-lg w-full">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">

        <div>
          <h2 className="text-white text-lg font-semibold">
            🌡️ Mountain Environmental Analysis
          </h2>
          <p className="text-slate-400 text-sm">
            Room: {selected.name}
          </p>
        </div>

        {/* DROPDOWN */}
        <div className="relative w-44">

          <button
            onClick={() => setOpen(!open)}
            className="bg-slate-800 text-white px-3 py-2 rounded-xl border border-slate-700 w-full flex justify-between"
          >
            {selected.name}
            <span>▾</span>
          </button>

          {open && (
            <div className="absolute top-full mt-2 w-full bg-slate-800 border border-slate-700 rounded-xl z-50">

              {rooms.map((r) => (
                <button
                  key={r.name}
                  onClick={() => handleSelect(r)}
                  className="w-full text-left px-3 py-2 text-white hover:bg-slate-700"
                >
                  {r.name}
                </button>
              ))}

            </div>
          )}
        </div>

      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <Stat label="Avg Temp" value={`${summary.avgTemp}°C`} />
        <Stat label="Avg Humidity" value={`${summary.avgHumidity}%`} />
        <Stat label="Peak Temp" value={`${summary.peakTemp}°C`} />
      </div>

      {/* CHART WITH MOBILE SCROLL FIX */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[700px] sm:min-w-full h-[280px]">

          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>

              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />

              <XAxis dataKey="time" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />

              <Tooltip />

              <Legend />

              {/*  TEMPERATURE MOUNTAIN CURVE */}
              <Line
                type="monotone"
                dataKey="temp"
                stroke="#22c55e"
                strokeWidth={3}
                dot={false}
              />

              {/* 💧 HUMIDITY MOUNTAIN CURVE */}
              <Line
                type="monotone"
                dataKey="humidity"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={false}
              />

            </LineChart>
          </ResponsiveContainer>

        </div>
      </div>

    </div>
  );
}

/* 📦 STAT CARD */
function Stat({ label, value }) {
  return (
    <div className="bg-slate-800 p-3 rounded-xl">
      <p className="text-xs text-slate-500 uppercase">{label}</p>
      <p className="text-white font-semibold">{value}</p>
    </div>
  );
}