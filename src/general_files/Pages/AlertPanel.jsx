
// alerts for the syatem

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
    <div className="p-6 text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Alerts</h1>
        <button className="bg-purple-600 px-4 py-2 rounded-lg">
          Mark All as Read
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-red-500/20 p-4 rounded-xl">Critical: 5</div>
        <div className="bg-yellow-500/20 p-4 rounded-xl">Warnings: 8</div>
        <div className="bg-green-500/20 p-4 rounded-xl">Resolved: 20</div>
        <div className="bg-blue-500/20 p-4 rounded-xl">Last 24h</div>
      </div>

      {/* Alerts Table */}
      <div className="bg-[#0f172a] rounded-xl p-4">
        <table className="w-full text-sm">
          <thead className="text-gray-400">
            <tr>
              <th className="text-left">Severity</th>
              <th>Device</th>
              <th>Message</th>
              <th>Type</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((a, i) => (
              <tr key={i} className="border-t border-gray-800">
                <td>{a.severity}</td>
                <td>{a.device}</td>
                <td>{a.message}</td>
                <td>{a.type}</td>
                <td>{a.time}</td>
                <td>{a.status}</td>
                <td>
                  <button className="text-blue-400">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}