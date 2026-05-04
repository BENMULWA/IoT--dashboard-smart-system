import { useState } from "react";
import { MoreVertical, User, Shield, LogOut } from "lucide-react";

export default function UserRolePanel({ role = "admin", onSwitch, onLogout }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="mt-auto pt-4 relative">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex items-center justify-between text-white">

                {/* Profile */}
                <div className="flex items-center gap-2">
                    <div className="w-12 h-13 rounded-full overflow-hidden">
                        <img src="https://i.pravatar.cc/100?img=13" alt="avatar-image" className =" w-full h-full object-cover" />
                       
                       
                    </div>

                    <div  className= "gap-3 space-y-1 hidden sm:flex flex-col  ml-2">
                        <p className="text-sm">
                            {role === "admin" ? "Admin User" : "Standard User"}
                        </p>
                        <p className="text-xs text-slate-400">
                            {role === "admin" ? "System Administrator" : "Limited Access"}
                        </p>
                    </div>
                </div>

                {/* Menu Button */}
                <button
                    onClick={() => setOpen(!open)}
                    className="text-slate-400 hover:text-white"
                >
                    <MoreVertical size={18} />
                </button>
            </div>

            {/* Dropdown */}
            {open && (
                <div className="absolute right-0 mt-2 w-44 bg-slate-900 border border-slate-800 rounded-xl shadow-lg overflow-hidden z-50">

                    <button
                        onClick={() => {
                            onSwitch("admin");
                            setOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-slate-800 flex items-center gap-2"
                    >
                        <Shield size={16} /> Admin
                    </button>

                    <button
                        onClick={() => {
                            onSwitch("user");
                            setOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-slate-800 flex items-center gap-2"
                    >
                        <User size={16} /> User
                    </button>

                    <div className="border-t border-slate-800" />

                    <button
                        onClick={() => {
                            onLogout();
                            setOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-slate-800 flex items-center gap-2"
                    >
                        <LogOut size={16} /> Logout
                    </button>

                </div>
            )}
        </div>
    );
}