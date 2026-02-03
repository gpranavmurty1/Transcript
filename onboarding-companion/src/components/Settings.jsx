import React from 'react';
import { User, Bell, Shield, Eye } from 'lucide-react';

const Settings = () => {
    return (
        <div className="p-10 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
            <p className="text-slate-400 mb-10">Manage your preferences and profile.</p>

            <div className="space-y-6">
                {/* Profile */}
                <div className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden">
                    <div className="p-4 border-b border-slate-800 bg-slate-900/80 font-medium text-slate-200 flex items-center gap-2">
                        <User size={18} /> Profile
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-500 flex items-center justify-center text-slate-900 font-bold text-xl">P</div>
                            <div>
                                <button className="text-sm text-blue-400 hover:text-blue-300">Change Avatar</button>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs text-slate-500 uppercase font-bold tracking-wider">Display Name</label>
                                <input type="text" value="Pranav" className="w-full mt-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none" readOnly />
                            </div>
                            <div>
                                <label className="text-xs text-slate-500 uppercase font-bold tracking-wider">Role</label>
                                <input type="text" value="Product Manager" className="w-full mt-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none" readOnly />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Notifications */}
                <div className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden">
                    <div className="p-4 border-b border-slate-800 bg-slate-900/80 font-medium text-slate-200 flex items-center gap-2">
                        <Bell size={18} /> Notifications
                    </div>
                    <div className="p-6 space-y-4">
                        {['Email digests for daily summary', 'Slack alerts for critical tasks', 'Browser push notifications'].map((label, i) => (
                            <label key={i} className="flex items-center justify-between cursor-pointer group">
                                <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{label}</span>
                                <div className={`w-10 h-6 rounded-full relative transition-colors ${i === 0 ? 'bg-blue-600' : 'bg-slate-700'}`}>
                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${i === 0 ? 'left-5' : 'left-1'}`}></div>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Accessibility */}
                <div className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden">
                    <div className="p-4 border-b border-slate-800 bg-slate-900/80 font-medium text-slate-200 flex items-center gap-2">
                        <Eye size={18} /> Appearance
                    </div>
                    <div className="p-6">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-300">Theme</span>
                            <select className="bg-slate-800 border border-slate-700 text-white text-sm rounded-lg px-3 py-1.5 focus:outline-none">
                                <option>System Default</option>
                                <option>Dark Mode</option>
                                <option>Light Mode</option>
                            </select>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Settings;
