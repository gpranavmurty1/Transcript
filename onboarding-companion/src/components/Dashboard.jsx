import React from 'react';
import { Check, Circle, ExternalLink, MessageSquare, CheckCircle2 } from 'lucide-react';

const Dashboard = ({ user, setView }) => {
    const days = [
        { day: 1, title: 'Orientation', status: 'completed' },
        { day: 2, title: 'Env Setup', status: 'current' },
        { day: 3, title: 'First PR', status: 'locked' },
        { day: 4, title: 'Deep Dive', status: 'locked' },
        { day: 5, title: 'Ship It', status: 'locked' },
    ];

    const tasks = [
        { id: 1, title: 'Set up mac machine', type: 'Critical', duration: 'Done', status: 'completed' },
        { id: 2, title: 'Complete security training', type: 'Compliance', duration: '1h', status: 'pending' },
        { id: 3, title: 'Set up Slack on the mac machine', type: 'Setup', duration: '15m', status: 'pending' },
        { id: 4, title: 'Connect with Mentor (Ganesh)', type: 'Social', duration: '30m', status: 'pending' },
        { id: 5, title: 'Connect with the practice', type: 'Social', duration: '30m', status: 'pending' },
    ];

    const quickDocs = [
        { title: 'The Holy Grail: Auth_Service', tag: 'Architecture', trusted: true },
        { title: 'Deployment Pipeline', tag: 'DevOps', trusted: true },
        { title: 'Q1 2026 Roadmap', tag: 'Context', trusted: true },
    ];

    return (
        <div className="p-10 max-w-7xl mx-auto space-y-10">
            {/* Header & Journey Map */}
            <header className="space-y-8">
                <div className="flex justify-between items-end">
                    <div>
                        <h2 className="text-slate-400 font-medium mb-1">Good morning, {user.name}.</h2>
                        <h1 className="text-3xl font-bold text-white tracking-tight">Day 2: Environment Setup</h1>
                    </div>
                    <div className="flex gap-2">
                        {days.map((d) => (
                            <div key={d.day} className={`flex flex-col items-center gap-2 group cursor-pointer ${d.status === 'locked' ? 'opacity-30' : ''}`}>
                                <div className={`w-28 h-1 rounded-full transition-all ${d.status === 'completed' ? 'bg-emerald-500' :
                                    d.status === 'current' ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-slate-700'
                                    }`}></div>
                                <span className={`text-xs font-medium uppercase tracking-wider ${d.status === 'current' ? 'text-blue-400' : 'text-slate-500'
                                    }`}>Day {d.day}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </header>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Col: Main Focus */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Day 1 Recap (Requested Feature) */}
                    <section className="bg-slate-900/30 border border-slate-800 rounded-2xl p-6 opacity-75 hover:opacity-100 transition-opacity">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-slate-300 flex items-center gap-2">
                                <CheckCircle2 size={20} className="text-emerald-500" /> Yesterday's Recap (Day 1)
                            </h3>
                            <button
                                onClick={() => setView('journey')}
                                className="text-sm text-blue-400 hover:text-blue-300"
                            >
                                View Detail
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 bg-slate-800/50 rounded-lg text-sm text-slate-400 line-through">HR Compliance Training</div>
                            <div className="p-3 bg-slate-800/50 rounded-lg text-sm text-slate-400 line-through">Slack & Email Setup</div>
                        </div>
                    </section>

                    {/* Today's Focus */}
                    <section>
                        <h3 className="text-lg font-semibold text-white mb-4">Today's Priorities</h3>
                        <div className="space-y-3">
                            {tasks.map(task => (
                                <div key={task.id} className={`group flex items-center justify-between p-5 rounded-2xl border transition-all ${task.status === 'pending'
                                    ? 'bg-slate-800/40 border-slate-700 hover:border-blue-500/30 hover:bg-slate-800/80 shadow-sm'
                                    : 'bg-slate-900/20 border-transparent opacity-60'
                                    }`}>
                                    <div className="flex items-center gap-4">
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${task.status === 'completed'
                                            ? 'text-emerald-500'
                                            : 'text-slate-500 group-hover:text-blue-400'
                                            }`}>
                                            {task.status === 'completed' ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                                        </div>
                                        <div>
                                            <h4 className={`text-base font-medium ${task.status === 'completed' ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
                                                {task.title}
                                            </h4>
                                            <p className="text-xs text-slate-500 font-medium mt-1">
                                                {task.type} • {task.duration}
                                            </p>
                                        </div>
                                    </div>

                                    {task.status === 'pending' && (
                                        <button className="text-sm bg-blue-600 text-white px-5 py-2 rounded-xl font-medium shadow-lg shadow-blue-900/20 hover:bg-blue-500 hover:scale-105 transition-all">
                                            Start
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Context */}
                    <section>
                        <h3 className="text-lg font-semibold text-white mb-4">Relevant Context</h3>
                        <div className="grid grid-cols-3 gap-4">
                            {quickDocs.map((doc, i) => (
                                <div key={i} className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-600 cursor-pointer transition-all group">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="text-[10px] uppercase font-bold text-slate-500">{doc.tag}</div>
                                        <ExternalLink size={14} className="text-slate-600 group-hover:text-slate-400 transition-colors" />
                                    </div>
                                    <div className="text-sm font-medium text-slate-300 group-hover:text-blue-400 transition-colors leading-snug">{doc.title}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Col: Companion Widget Space */}
                <div className="space-y-8">
                    <div className="p-6 rounded-3xl bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700/50">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Onboarding Buddy</h3>
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-4">
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ganesh" alt="Ganesh" className="w-12 h-12 rounded-full bg-slate-700" />
                                <div>
                                    <div className="font-semibold text-white">Ganesh</div>
                                    <div className="text-xs text-emerald-400 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Online Now
                                    </div>
                                </div>
                            </div>
                            <div className="bg-slate-800/50 p-4 rounded-2xl text-sm text-slate-300 italic relative">
                                <div className="absolute -top-1 -left-1 w-2 h-2 bg-slate-800 rotate-45"></div>
                                "Hey! I'm free at 2pm if you get stuck on the Figma export."
                            </div>
                            <button className="w-full py-2.5 rounded-xl bg-slate-700 text-white text-sm font-medium hover:bg-slate-600 transition-colors flex items-center justify-center gap-2">
                                <MessageSquare size={16} /> Send Message
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
