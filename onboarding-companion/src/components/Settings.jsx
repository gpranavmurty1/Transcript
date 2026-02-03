import React from 'react';
import { User, Bell, Shield, Eye } from 'lucide-react';

const Settings = () => {
    const [slackConnected, setSlackConnected] = React.useState(false);

    const handleConnectSlack = () => {
        setSlackConnected(!slackConnected);
    };

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

                {/* Integrations (NEW) */}
                <div className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden">
                    <div className="p-4 border-b border-slate-800 bg-slate-900/80 font-medium text-slate-200 flex items-center gap-2">
                        <div className="w-4 h-4 flex items-center justify-center">#</div> Integrations
                    </div>
                    <div className="p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${slackConnected ? 'bg-[#4A154B]' : 'bg-slate-800'}`}>
                                    {/* Slack Logo SVG */}
                                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                                        <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-3.791h-.001zm8.834 5.042a2.528 2.528 0 0 1-2.521-2.521A2.528 2.528 0 0 1 15.147 15.165h2.522a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521h-2.522zm0-1.27v-5.042a2.528 2.528 0 0 1 2.521-2.521 2.528 2.528 0 0 1 2.521 2.521v5.042a2.528 2.528 0 0 1-2.521 2.521 2.528 2.528 0 0 1-2.521-2.521zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522 2.521A2.528 2.528 0 0 1 18.956 13.876h-2.521V11.355a2.528 2.528 0 0 1 2.521-2.521zM15.147 6.313a2.528 2.528 0 0 1 2.521-2.521 2.528 2.528 0 0 1 2.521 2.521v2.52h-5.042a2.528 2.528 0 0 1-2.52-2.52z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white">Slack</h4>
                                    <p className="text-xs text-slate-400">Receive daily digests and critical alerts.</p>
                                </div>
                            </div>
                            <button
                                onClick={handleConnectSlack}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${slackConnected
                                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
                                        : 'bg-white text-slate-900 hover:bg-slate-200'
                                    }`}
                            >
                                {slackConnected ? 'Connected' : 'Connect Account'}
                            </button>
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
                            <label key={i} className={`flex items-center justify-between cursor-pointer group ${i === 1 && !slackConnected ? 'opacity-50 pointer-events-none' : ''}`}>
                                <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{label}</span>
                                <div className={`w-10 h-6 rounded-full relative transition-colors ${i === 0 || (i === 1 && slackConnected) ? 'bg-blue-600' : 'bg-slate-700'}`}>
                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${i === 0 || (i === 1 && slackConnected) ? 'left-5' : 'left-1'}`}></div>
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
