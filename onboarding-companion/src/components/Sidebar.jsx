import React from 'react';
import { LayoutDashboard, Map, Library, Users, Settings } from 'lucide-react';

const Sidebar = ({ currentView, setView }) => {
    const menuItems = [
        { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
        { id: 'journey', label: 'My Journey', icon: Map },
        { id: 'resources', label: 'Resources', icon: Library },
        { id: 'team', label: 'Team Directory', icon: Users },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
        <div className="w-64 bg-slate-900 border-r border-slate-800 h-screen sticky top-0 flex flex-col pt-8 pb-6 px-4 shrink-0 transition-all duration-300 ease-in-out">
            {/* Brand */}
            <div className="mb-10 px-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-900/50">OC</div>
                <div className="font-bold text-lg tracking-tight text-white leading-tight">Onboarding<br />Companion</div>
            </div>

            {/* Navigation */}
            <nav className="space-y-1.5 flex-1">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-4">Menu</div>
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setView(item.id)}
                        className={`w-full text-left px-4 py-2.5 rounded-lg flex items-center gap-3 transition-all duration-200 font-medium ${currentView === item.id
                            ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                            }`}
                    >
                        <item.icon size={18} />
                        <span>{item.label}</span>
                    </button>
                ))}
            </nav>

            {/* User Profile */}
            <div className="mt-auto pt-6 border-t border-slate-800/50 px-2">
                <button className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800 transition-colors w-full">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-500 flex items-center justify-center text-slate-900 font-bold text-sm shadow-lg">P</div>
                    <div className="text-left flex-1">
                        <div className="text-sm font-semibold text-white">Pranav</div>
                        <div className="text-xs text-slate-500">Product Manager</div>
                    </div>
                    <div className="text-slate-500 text-xs">•••</div>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
