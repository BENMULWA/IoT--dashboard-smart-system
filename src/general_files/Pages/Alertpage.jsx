import React, { useEffect, useState } from "react";

// 🔌 Simulated real-time alerts (replace with WebSocket later)
const mockStream = (callback) => {
    const devices = [
        "Fingerprint Sensor",
        "DHT22 Sensor",
        "Humidity Sensor",
        "Microcontroller Node Main Brigde",
    ];

    const messages = [
        "Unauthorized access attempt",
        "Temperature exceeded threshold",
        "Humidity dropped",
        "Device went offline",
    ];

    const severities = ["high", "medium", "low"];

    setInterval(() => {
        const newAlert = {
            id: Date.now(),
            device: devices[Math.floor(Math.random() * devices.length)],
            message: messages[Math.floor(Math.random() * messages.length)],
            severity: severities[Math.floor(Math.random() * severities.length)],
            time: "just now",
            status: "active",
        };

        callback(newAlert);
    }, 15000); // every 15 seconds
};

const severityStyles = {
    high: "border-red-500 bg-red-50 animate-pulse",
    medium: "border-yellow-500 bg-yellow-50",
    low: "border-green-500 bg-green-50",
};

const statusStyles = {
    active: "bg-red-100 text-red-600",
    resolved: "bg-green-100 text-green-600",
};

export default function AlertsDashboard() {
    const [alerts, setAlerts] = useState([]);
    const [filter, setFilter] = useState("all");
    const [connected, setConnected] = useState(false);

    // 🚀 Simulate real-time connection
    useEffect(() => {
        setConnected(true);

        mockStream((newAlert) => {
            setAlerts((prev) => [newAlert, ...prev]);
        });
    }, []);

    const filteredAlerts = alerts.filter((a) =>
        filter === "all" ? true : a.status === filter
    );

    const markResolved = (id) => {
        setAlerts((prev) =>
            prev.map((a) =>
                a.id === id ? { ...a, status: "resolved" } : a
            )
        );
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white p-6">
            {/* Header */}
            <div className="flex justify-between p-5 items-center mb-6">
                <div>
                    <h1 className="text-3xl  font-bold">🚨 Live Device Alerts</h1>
                    <p className="text-sm text-slate-400">
                        Real-time monitoring of IoT devices
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    {/* Connection Status */}
                    <div className="flex items-center gap-2">
                        <span
                            className={`w-3 h-3 rounded-full ${connected ? "bg-green-500" : "bg-red-500"
                                }`}
                        />
                        <span className="text-sm">
                            {connected ? "Connected" : "Disconnected"}
                        </span>
                    </div>

                    {/* Filters */}
                    <div className="flex gap-2">
                        {["all", "active", "resolved"].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-2 rounded-lg text-sm capitalize transition ${filter === f
                                        ? "bg-blue-600"
                                        : "bg-slate-700 hover:bg-slate-600"
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-800 p-4 rounded-xl">
                    <p className="text-sm text-slate-400">Total Alerts</p>
                    <h2 className="text-2xl font-bold">{alerts.length}</h2>
                </div>
                <div className="bg-slate-800 p-4 rounded-xl">
                    <p className="text-sm text-slate-400">Active</p>
                    <h2 className="text-2xl font-bold">
                        {alerts.filter((a) => a.status === "active").length}
                    </h2>
                </div>
                <div className="bg-slate-800 p-4 rounded-xl">
                    <p className="text-sm text-slate-400">Resolved</p>
                    <h2 className="text-2xl font-bold">
                        {alerts.filter((a) => a.status === "resolved").length}
                    </h2>
                </div>
            </div>

            {/* Alerts List */}
            <div className="space-y-4">
                {filteredAlerts.map((alert) => (
                    <div
                        key={alert.id}
                        className={`rounded-2xl p-4 border-l-4 shadow-md flex justify-between items-center ${severityStyles[alert.severity]}`}
                    >
                        <div>
                            <div className="flex items-center gap-3">
                                <h2 className="font-semibold text-lg text-slate-800">
                                    {alert.device}
                                </h2>
                                <span className="text-xs px-2 py-1 rounded-full bg-slate-200 text-slate-700">
                                    {alert.severity}
                                </span>
                            </div>

                            <p className="text-sm text-slate-700 mt-1">
                                {alert.message}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">{alert.time}</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <span
                                className={`text-xs px-3 py-1 rounded-full font-medium ${statusStyles[alert.status]}`}
                            >
                                {alert.status}
                            </span>

                            {alert.status === "active" && (
                                <button
                                    onClick={() => markResolved(alert.id)}
                                    className="px-3 py-1 text-sm border rounded-lg text-slate-700 hover:bg-slate-200"
                                >
                                    Resolve
                                </button>
                            )}
                        </div>
                    </div>
                ))}

                {alerts.length === 0 && (
                    <p className="text-center text-slate-500 mt-10">
                        Waiting for device alerts...
                    </p>
                )}
            </div>
        </div>
    );
}
