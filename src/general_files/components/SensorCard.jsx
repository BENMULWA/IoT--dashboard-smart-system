export default function SensorCard({ label, value, unit, status }) {
    return (
        <div className="bg-gray-700 p-4 rounded text-center text-white">
            <div className="text-xl font-bold">{value} {unit}</div>
            <div className="text-gray-400">{label}</div>
            <div className={status === "Normal" || status === "Good" ? "text-green-400" : "text-red-400"}>
                {status}
            </div>
        </div>
    );
}
