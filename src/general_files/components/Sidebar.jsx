import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import UserRolePanel from "./UserRolePanel";
import { LayoutDashboard, Fingerprint, Leaf, Cpu, Bell, FileText, Settings, ListChevronsUpDown, X, Wifi, Database, Clock} from 'lucide-react'

const items = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { label: 'Biometric Attendance', icon: Fingerprint, path: '/biometric-attendance' },
    { label: 'Environment Monitor', icon: Leaf, path: '/environment' },
    { label: 'Devices', icon: Cpu, path: '/devices' },
    { label: 'Alerts', icon: Bell, path: '/alerts' },
    { label: 'Reports', icon: FileText, path: '/reports' },
    { label: 'Settings', icon: Settings, path: '/settings' },
]


// navigation link 
export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const [role, setRole] = useState('Admin'); // This can be dynamic based on user authentication

    const handleSwitch = (newRole) => {
        setRole(newRole);
    };

    const handleLogout = () => {
        // Implement logout logic here (e.g., clear auth tokens, redirect to login page)
        console.log("User logged out");
    }
    const status = [
        { name: "IoT Gateway", icon: Cpu, state: "Online" },
        { name: "MQTT Broker", icon: Wifi, state: "Online" },
        { name: "Database", icon: Database, state: "Online" },
    ];


    return (
        <>
            {/* Hamburger Button - Mobile Only */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className='fixed top-3 left-4 z-40 lg:hidden p-2 rounded-xl bg-green-500 text-white hover:bg-slate-700'
            >
                {isOpen ? <X size={35} /> : <ListChevronsUpDown size={35} />}
            </button>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className='fixed inset-0 bg-black/50 z-30 lg:hidden'
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={` flex flex-col 
                fixed lg:static inset-y-0 left-0 z-40 w-72 bg-slate-950 border-r border-slate-800 min-h-screen p-4
                transition-transform duration-300 lg:translate-x-0
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="text-white mt-5 ml-4 text-2xl font-semibold mb-6 lg:mb-8 flex items-center justify-between font-['Arial']">
                    <span>Data Analytics System</span>
                    <button
                        onClick={() => setIsOpen(false)}
                        className='lg:hidden p-1 text-4xl bg-green-500 hover:bg-red-500 rounded-lg'
                    >
                        <X size={35} />
                    </button>
                </div>

            {/* Navigation Links on click icon */}

                <div className='space-y-4 mt-10'>
                    {items.map(({ label, icon: Icon, path }) => (
                        <NavLink
                            key={label}
                            to={path}
                            end={path === '/'}
                            className={({ isActive }) =>
                                `w-full flex items-center gap-3 px-4 py-4 rounded-2xl transition-colors ${
                                    isActive
                                        ? 'bg-indigo-600 text-white'
                                        : 'text-slate-300 hover:bg-green-500 hover:text-white'
                                }`
                            }
                            onClick={() => setIsOpen(false)}
                        >
                            <Icon size={20} />
                            <span>{label}</span>
                        </NavLink>
                    ))}
                </div>

            
                {/* Footer */}
                <div className="mt-14 sm:mt-20 ">
                    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 text-white space-y-8 space-x-4">

                        <h3 className="text-slate-400 text-xs uppercase">System Status</h3>

                        {status.map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Icon size={16} className="text-emerald-400" />
                                        <span className="text-sm">{item.name}</span>
                                    </div>

                                    <span className="text-emerald-400 text-xs">
                                        {item.state}
                                    </span>
                                </div>
                            );
                        })}

                        <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs text-slate-400">
                            <span className="flex items-center gap-1">
                                <Clock size={16} /> Last Updated
                            </span>
                            <span>Just now</span>
                        </div>

                    </div>
                </div>
                

            {/* User Role Panel */}

            <UserRolePanel role={role} onSwitch={handleSwitch} onLogout={handleLogout} />
            
            
            </aside>
        </>
    )
}

