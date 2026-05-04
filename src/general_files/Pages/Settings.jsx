import { useState } from "react";

/* ---------------------- CARD WRAPPER ---------------------- */
const Card = ({ title, children }) => (
  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg">
    <h2 className="text-lg font-semibold mb-4 text-white">{title}</h2>
    {children}
  </div>
);

/* ---------------------- USER SETTINGS ---------------------- */
export function UserSettings() {
  const [role, setRole] = useState("Admin");
  const [devices, setDevices] = useState([]);
  const [deviceName, setDeviceName] = useState("");


  //Logic to add and remove a device from the syatem 


  //Add handler
  const handleAddDevice = () => {
    if (deviceName.trim() === "") return;
    setDevices([...devices, deviceName.trim()]);
    setDeviceName("");
  }
}

// Remove hanlder

const handleRemoveDevice = (name) => {
  setDevices(devices.filter(d => d !== name));

  return (
    <Card title="User & Role Settings">
      <label className="text-sm text-slate-400">Select Role</label>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full mt-2 p-3 rounded-xl bg-white/10 border border-white/10 text-white"
      >
        <option>Admin</option>
        <option>User</option>
        <option>Technician</option>
      </select>

      <p className="text-xs text-slate-400 mt-3">
        Controls system access permissions.
      </p>
    </Card>
  );
}

/* ---------------------- BIOMETRIC SETTINGS ---------------------- */
export function BiometricSettings() {
  return (
    <Card title="Biometric Attendance">
      <div className="grid gap-3">
        <input className="p-3 rounded-xl bg-white/10" placeholder="Device ID" />
        <input className="p-3 rounded-xl bg-white/10" placeholder="Working Hours Start" />
        <input className="p-3 rounded-xl bg-white/10" placeholder="Working Hours End" />
      </div>
      <p className="text-xs text-slate-400 mt-3">
        Configures fingerprint attendance system.
      </p>
    </Card>
  );
}

/* ---------------------- ENVIRONMENT SETTINGS ---------------------- */
export function EnvironmentSettings() {
  return (
    <Card title="Environment Monitoring">
      <div className="grid grid-cols-2 gap-3">
        <input className="p-3 rounded-xl bg-white/10" placeholder="Max Temp (°C)" />
        <input className="p-3 rounded-xl bg-white/10" placeholder="Max Humidity (%)" />
      </div>
      <input className="w-full mt-3 p-3 rounded-xl bg-white/10" placeholder="Sampling Interval (sec)" />
      <p className="text-xs text-slate-400 mt-3">
        Controls DHT sensor thresholds.
      </p>
    </Card>
  );
}

/* ---------------------- DEVICE SETTINGS ---------------------- */
export function DeviceSettings() {
  return (
    <Card title="Device Management">
      <input className="w-full p-3 rounded-xl bg-white/10" placeholder="Offline Timeout (sec)" />
      <input className="w-full mt-3 p-3 rounded-xl bg-white/10" placeholder="Device Location" />

      <div className="mt-3 flex gap-2">
        <button className="px-4 py-2 bg-green-600 rounded-xl">Add Device</button>
        <button className="px-4 py-2 bg-red-600 rounded-xl">Remove</button>
      </div>
    </Card>
  );
}

/* ---------------------- ALERT SETTINGS ---------------------- */
export function AlertSettings() {
  return (
    <Card title="Alerts & Notifications">
      <label className="flex items-center gap-2">
        <input type="checkbox" /> Enable Alerts
      </label>

      <input className="w-full mt-3 p-3 rounded-xl bg-white/10" placeholder="Alert Threshold Delay (sec)" />

      <select className="w-full mt-3 p-3 rounded-xl bg-white/10">
        <option>Dashboard Only</option>
        <option>Email (future)</option>
        <option>SMS (future)</option>
      </select>

      <p className="text-xs text-slate-400 mt-3">
        Controls alert triggers and notifications.
      </p>
    </Card>
  );
}

/* ---------------------- SYSTEM SETTINGS ---------------------- */
export function SystemSettings() {
  return (
    <Card title="System Configuration">
      <input className="w-full p-3 rounded-xl bg-white/10" placeholder="API Base URL" />
      <input className="w-full mt-3 p-3 rounded-xl bg-white/10" placeholder="Timezone" />

      <input className="w-full mt-3 p-3 rounded-xl bg-white/10" placeholder="Auto Refresh Interval" />

      <button className="mt-4 px-4 py-2 bg-indigo-600 rounded-xl">
        Save Configuration
      </button>
    </Card>
  );
}

/* ---------------------- MAIN SETTINGS PAGE ---------------------- */
export default function SettingsPage() {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <h1 className="text-4xl sm:text-3xl font-bold font-['arial'] mb-6">IoT System Settings</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <UserSettings />
        <BiometricSettings />
        <EnvironmentSettings />
        <DeviceSettings />
        <AlertSettings />
        <SystemSettings />
      </div>
    </div>
  );
}
