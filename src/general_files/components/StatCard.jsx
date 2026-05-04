export default function StatCard({ title, value, status, color, animationDelay = '', icon, bgGradient = '', iconBgColor = 'bg-purple-600' }) {
    return (
        <div className={`rounded-2xl border border-slate-800 p-5 fade-in ${animationDelay} relative overflow-hidden`}
             style={{
                background: bgGradient || 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.8) 100%)'
             }}>
            {/* Icon in top left with colored background */}
            {icon && (
                <div className={`${iconBgColor} w-12 h-12 rounded-xl flex items-center justify-center mb-3`}>
                    {icon}
                </div>
            )}
            
            <p className='text-slate-400 text-sm'>{title}</p>
            <h3 className='text-white text-3xl font-bold mt-2'>{value}</h3>
            <p className={`mt-3 text-sm ${color} flex items-center gap-1`}>{status}</p>
        </div>
    )
}
