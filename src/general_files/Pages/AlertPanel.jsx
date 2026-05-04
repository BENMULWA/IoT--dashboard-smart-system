import React from "react";

const alerts = [
  {
    severity: "Critical",
    device: "POWER-001",
    message: "Device offline",
    type: "Power",
    time: "10:40 AM",
    status: "Active",
  },
  {
    severity: "Warning",
    device: "DHT-002",
    message: "Temperature high (42°C)",
    type: "Temperature",
    time: "10:38 AM",
    status: "Active",
  },
];

export default function AlertsPage() {
  return (
    <div className="p-4 sm:p-6 text-white">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">

        <h1 className="text-xl sm:text-2xl font-bold">
          🚨 System Alerts
        </h1>

        <button className="bg-purple-600 hover:bg-purple-700 transition px-4 py-2 rounded-lg text-sm">
          Mark All as Read
        </button>

      </div>

      {/* SUMMARY CARDS (RESPONSIVE FIX) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">

        <div className="bg-red-500/20 border border-red-500/30 p-3 sm:p-4 rounded-xl">
          <p className="text-xs text-red-300">Critical</p>
          <p className="text-lg font-bold">5</p>
        </div>

        <div className="bg-yellow-500/20 border border-yellow-500/30 p-3 sm:p-4 rounded-xl">
          <p className="text-xs text-yellow-300">Warnings</p>
          <p className="text-lg font-bold">8</p>
        </div>

        <div className="bg-green-500/20 border border-green-500/30 p-3 sm:p-4 rounded-xl">
          <p className="text-xs text-green-300">Resolved</p>
          <p className="text-lg font-bold">20</p>
        </div>

        <div className="bg-blue-500/20 border border-blue-500/30 p-3 sm:p-4 rounded-xl">
          <p className="text-xs text-blue-300">Last 24h</p>
          <p className="text-lg font-bold">12</p>
        </div>

      </div>

      {/* ALERT LIST (MOBILE FRIENDLY INSTEAD OF TABLE) */}
      <div className="space-y-3">

        {alerts.map((a, i) => (
          <div
            key={i}
            className="bg-[#0f172a] border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
          >

            {/* LEFT */}
            <div className="flex flex-col gap-1">

              <div className="flex items-center gap-2">

                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium
                    ${a.severity === "Critical"
                      ? "bg-red-500/20 text-red-400"
                      : "bg-yellow-500/20 text-yellow-400"
                    }`}
                >
                  {a.severity}
                </span>

                <span className="text-xs text-slate-400">
                  {a.device}
                </span>

              </div>

              <p className="text-sm text-white font-medium">
                {a.message}
              </p>

              <p className="text-xs text-slate-400">
                {a.type} • {a.time}
              </p>

            </div>

            {/* RIGHT */}
            <div className="flex items-center justify-between sm:justify-end gap-4">

              <span className="text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-400">
                {a.status}
              </span>

              <button className="text-sm text-blue-400 hover:text-blue-300">
                View
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}