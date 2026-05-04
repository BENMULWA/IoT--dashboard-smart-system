///this shows all connected devices to the microcontroller system, their status, and allows for basic management actions like rebooting or updating firmware.
// It also provides a summary of device health and connectivity at a glance.

//Device page for IoT Dashboard

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import {
    Fingerprint,
    Thermometer,
    Droplets,
    Cpu,
    Wifi,
    WifiOff,
    ShieldCheck,
    Activity,
} from "lucide-react";

const devices = [
    {
        id: "FP-001",
        name: "Fingerprint Sensor 01",
        type: "Biometric Scanner",
        location: "Main Gate-Entrace/Exit",
        status: "online",
        lastSeen: "10:45 AM",
        icon: <Fingerprint size={30} className="text-violet-400 drop-shadow-[0_0_8px_rgba(139,92,246,0.7)]" />,
    },
    {
        id: "FP-002",
        name: "Fingerprint Sensor 02",
        type: "Biometric Scanner",
        location: "Office Entrance",
        status: "offline",
        lastSeen: "10:22 AM",
        icon: <Fingerprint size={30} className="text-violet-400 drop-shadow-[0_0_8px_rgba(139,92,246,0.7)]" />,
    },
    {
        id: "DHT-001",
        name: "DHT22 Sensor",
        type: "Temperature & Humidity",
        location: "Room 101",
        status: "online",
        lastSeen: "10:45 AM",
        icon: <Thermometer size={30} className="text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.7)]" />,
    },
    {
        id: "HUM-001",
        name: "Humidity Sensor",
        type: "Humidity Monitor",
        location: "Room 102",
        status: "online",
        lastSeen: "10:44 AM",
        icon: <Droplets size={30} className="text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.7)]" />,
    },
    {
        id: "TMP-001",
        name: "Temperature Sensor",
        type: "Temperature Monitor",
        location: "Server Room",
        status: "offline",
        lastSeen: "10:10 AM",
        icon: <Thermometer size={30} className="text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.7)]" />,
    },
    {
        id: "MCU-001",
        name: "ESP32 Controller",
        type: "Main Microcontroller",
        location: "Control Cabinet",
        status: "online",
        lastSeen: "10:45 AM",
        icon: <Cpu size={30} className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.7)]" />,
    },
];

export default function DevicesPage() {
    const total = devices.length;
    const online = devices.filter((d) => d.status === "online").length;
    const offline = devices.filter((d) => d.status === "offline").length;

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            <Sidebar />

            <main className="flex-1 p-6 sm:p-8 space-y-6 pt-16 lg:pt-6">
                <Navbar />

                {/* Header */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-[0_0_25px_rgba(0,0,0,0.6)]">
                    <h1 className="text-3xl font-bold text-blue-700">Device Management Store</h1>
                    <p className="text-slate-400 mt-2">
                        Monitor all connected IoT devices on the microcontroller system.
                    </p>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-700 to-slate-900 p-5 border border-slate-600 shadow-xl hover:shadow-[0_0_20px_rgba(250,211,238,0.5)] transition duration-500">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-slate-400 text-sm">Total Devices</p>
                                <h2 className="text-3xl font-bold text-white mt-2">{total}</h2>
                            </div>
                            <Cpu className="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.7)]" size={40} />
                        </div>
                    </div>

                    <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-700 to-slate-900 p-5 border border-slate-600 shadow-xl hover:shadow-[0_0_20px_rgba(250,197,94,0.5)] transition duration-500">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-slate-400 text-sm">Online Devices</p>
                                <h2 className="text-3xl font-bold text-green-300 mt-2">{online}</h2>
                            </div>
                            <Wifi className="text-green-300 drop-shadow-[0_0_10px_rgba(34,197,94,0.7)]" size={40} />
                        </div>
                    </div>

                    <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-700 to-slate-900 p-5 border border-slate-600 shadow-xl hover:shadow-[0_0_25px_rgba(239,68,68,0.5)] transition duration-500">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-slate-400 text-sm">Offline Devices</p>
                                <h2 className="text-3xl font-bold text-red-400 mt-2">{offline}</h2>
                            </div>
                            <WifiOff className="text-red-400 drop-shadow-[0_0_10px_rgba(239,68,68,0.7)]" size={40} />
                        </div>
                    </div>

                    <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-700 to-slate-900 p-5 border border-slate-600 shadow-xl hover:shadow-[0_0_25px_rgba(250,185,129,0.5)] transition duration-500">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-slate-400 text-sm">System Health</p>
                                <h2 className="text-3xl font-bold text-emerald-300 mt-2">99%</h2>
                            </div>
                            <ShieldCheck className="text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.7)]" size={40} />
                        </div>
                    </div>
                </div>

                {/* Devices Table */}
                <div className="rounded-2xl bg-slate-900 border border-slate-700 shadow-[0_0_25px_rgba(0,0,0,0.6)] overflow-hidden">
                    <div className="p-6 border-b border-slate-800">
                        <h2 className="text-xl font-semibold text-white">Connected Devices</h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-800 text-slate-300 text-xl">
                                <tr>
                                    <th className="p-5">Device</th>
                                    <th className="p-4">Type</th>
                                    <th className="p-4">Location</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Last Seen</th>
                                </tr>
                            </thead>
                            <tbody>
                                {devices.map((device) => (
                                    <tr
                                        key={device.id}
                                        className="border-b border-slate-800 hover:bg-slate-800/40 hover:shadow-[0_0_15px_rgba(99,102,241,0.4)] transition">
                                        <td className="p-4 border border-slate-800">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-lg bg-slate-800 shadow-inner">
                                                    {device.icon}
                                                </div>
                                                <div>
                                                    <p className="text-white font-medium">{device.name}</p>
                                                    <p className="text-slate-400 text-xs">{device.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                    {/* Device Type, Location, Status, Last Seen */}
                                        <td className="p-4 border border-slate-800 text-slate-400">{device.type}</td>
                                        <td className="p-4 border border-slate-800 text-slate-400">{device.location}</td>
                                        <td
                                            className={`p-4 font-medium ${
                                                device.status === "online"
                                                    ? "text-green-500"
                                                    : "text-red-400"
                                            }`}
                                        >
                                            {device.status.charAt(0).toUpperCase() +
                                                device.status.slice(1)}
                                        </td>
                                        <td className="p-4 text-slate-400">{device.lastSeen}</td>
                                    </tr>
                                ))}
                            </tbody>
                            

                        </table>
                        {/* Footer Status */}
                        <div className="rounded-2xl mt-10 bg-indigo-700 border border-slate-800 p-5 shadow-lg flex items-center">
                            <div className="flex items-center gap-3">
                                <Activity className="text-green-300 animate-pulse text-3xl" />
                                <p className="text-slate-300">
                                    System actively monitoring device heartbeat status and connection state in each Device.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}   