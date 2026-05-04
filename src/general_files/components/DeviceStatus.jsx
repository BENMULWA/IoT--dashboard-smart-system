// src/general_files/components/DeviceStatus.jsx
export default function DeviceStatus({ devices }) {
    return (
        <div className="bg-gray-700 p-4 rounded mt-6">
            <h3 className="text-lg font-bold mb-4">System Status</h3>
            <ul className="text-white">
                {devices.map((device, index) => (
                    <li key={index} className="flex justify-between border-b border-gray-600 py-2">
                        <span>{device.name}</span>
                        <span className={device.online ? "text-green-400" : "text-red-400"}>
                            {device.online ? "Online" : "Offline"}
                        </span>
                    </li>
                ))}
            </ul>
            <p className="text-gray-400 mt-2">Last Updated: {new Date().toLocaleTimeString()}</p>
        </div>
    );
}
