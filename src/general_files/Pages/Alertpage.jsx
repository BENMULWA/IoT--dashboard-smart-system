import React, { useEffect, useState } from "react";

/* 🔌 Real-time simulation */
const mockStream = (callback) => {
    const devices = [
        "Fingerprint Sensor",
        "DHT22 Sensor",
        "Humidity Sensor",
        "Microcontroller Node",
    ];

    const messages = [
        "Unauthorized access attempt",
        "Temperature exceeded threshold",
        "Humidity dropped below safe level",
        "Device went offline",
    ];

    const severities = ["high", "medium", "low"];

    setInterval(() => {
        const level = severities[Math.floor(Math.random() * severities.length)];

        const newAlert = {
            id: Date.now(),
            device: devices[Math.floor(Math.random() * devices.length)],
            message: messages[Math.floor(Math.random() * messages.length)],
            severity: level,
            time: "just now",
            status: "active",
        };

        callback(newAlert);
    }, 12000);
};

/* 🎨 Severity mapping (clear meaning now) */
const severityUI = {
    high: {
        label: "CRITICAL",
        style: "bg-red-500/10 text-red-400 border-red-500/30",
    },
    medium: {
        label: "WARNING",
        style: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
    },
    low: {
        label: "INFO",
        style: "bg-green-500/10 text-green-400 border-green-500/30",
    },
};

export default function AlertsDashboard() {
    const [alerts, setAlerts] = useState([]);
    const [filter, setFilter] = useState("all");
    const [connected, setConnected] = useState(false);

    /* 🚀 live stream */
    useEffect(() => {
        setConnected(true);
        mockStream((newAlert) => {
            setAlerts((prev) => [newAlert, ...prev]);
        });
    }, []);

    const filtered = alerts.filter((a) =>
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
        <div className="min-h-screen bg-slate-900 text-white p-4 sm:p-6">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">

                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold">
                        🚨 Live IoT Alerts Center
                    </h1>
                    <p className="text-slate-400 text-sm">
                        Real-time monitoring of campus devices
                    </p>
                </div>

                {/* CONNECTION + FILTER */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">

                    {/* connection */}
                    <div className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${connected ? "bg-green-500" : "bg-red-500"}`} />
                        <span className="text-sm text-slate-300">
                            {connected ? "Live Connected" : "Disconnected"}
                        </span>
                    </div>

                    {/* filters */}
                    <div className="flex gap-2">
                        {["all", "active", "resolved"].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-3 py-1 rounded-lg text-xs sm:text-sm capitalize transition
                ${filter === f ? "bg-blue-600" : "bg-slate-700 hover:bg-slate-600"}`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                </div>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-3 mb-6 text-center">

                <div className="bg-slate-800 p-3 rounded-xl">
                    <p className="text-xs text-slate-400">Total</p>
                    <p className="text-xl font-bold">{alerts.length}</p>
                </div>

                <div className="bg-slate-800 p-3 rounded-xl">
                    <p className="text-xs text-slate-400">Active</p>
                    <p className="text-xl font-bold">
                        {alerts.filter(a => a.status === "active").length}
                    </p>
                </div>

                <div className="bg-slate-800 p-3 rounded-xl">
                    <p className="text-xs text-slate-400">Resolved</p>
                    <p className="text-xl font-bold">
                        {alerts.filter(a => a.status === "resolved").length}
                    </p>
                </div>

            </div>

            {/* ALERT LIST */}
            <div className="space-y-3">

                {filtered.map((a) => {
                    const ui = severityUI[a.severity];

                    return (
                        <div
                            key={a.id}
                            className={`border rounded-xl p-4 flex flex-col sm:flex-row sm:justify-between gap-3 ${ui.style}`}
                        >

                            {/* LEFT */}
                            <div className="space-y-1">

                                <div className="flex items-center gap-2 flex-wrap">

                                    <span className="text-sm font-semibold text-white">
                                        {a.device}
                                    </span>

                                    <span className="text-xs px-2 py-1 rounded-full border">
                                        {ui.label}
                                    </span>

                                </div>

                                <p className="text-sm text-slate-200">
                                    {a.message}
                                </p>

                                <p className="text-xs text-slate-400">
                                    {a.time}
                                </p>

                            </div>

                            {/* RIGHT */}
                            <div className="flex items-center justify-between sm:justify-end gap-3">

                                <span className={`text-xs px-2 py-1 rounded-full bg-slate-800`}>
                                    {a.status}
                                </span>

                                {a.status === "active" && (
                                    <button
                                        onClick={() => markResolved(a.id)}
                                        className="px-3 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700"
                                    >
                                        Resolve
                                    </button>
                                )}

                            </div>

                        </div>
                    );
                })}

                {alerts.length === 0 && (
                    <p className="text-center text-slate-500 mt-10">
                        Waiting for IoT device alerts...
                    </p>
                )}

            </div>

        </div>
    );
}