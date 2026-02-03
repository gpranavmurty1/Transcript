import React from 'react';
import { Mail, MessageSquare } from 'lucide-react';

const TeamDirectory = () => {
    const team = [
        { name: 'Sarah Connor', role: 'Staff Engineer (Your Mentor)', status: 'online', avatar: 'Sarah' },
        { name: 'Melanie (CTO)', role: 'Chief Technology Officer', status: 'busy', avatar: 'Melanie' },
        { name: 'John Smith', role: 'Product Manager', status: 'offline', avatar: 'John' },
        { name: 'Alice Chen', role: 'Frontend Lead', status: 'online', avatar: 'Alice' },
        { name: 'Bob Wilson', role: 'DevOps Engineer', status: 'offline', avatar: 'Bob' },
    ];

    return (
        <div className="p-10 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-2">Team Directory</h1>
            <p className="text-slate-400 mb-10">Key people for your onboarding journey.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {team.map((person, idx) => (
                    <div key={idx} className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 flex items-start gap-4 hover:border-slate-700 transition-colors">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${person.avatar}`} alt={person.name} className="w-14 h-14 rounded-full bg-slate-800" />
                        <div className="flex-1">
                            <div className="font-semibold text-lg text-white mb-1">{person.name}</div>
                            <div className="text-sm text-slate-400 mb-2">{person.role}</div>

                            <div className="flex items-center gap-2 mb-4">
                                <span className={`w-2 h-2 rounded-full ${person.status === 'online' ? 'bg-emerald-500' :
                                        person.status === 'busy' ? 'bg-amber-500' : 'bg-slate-600'
                                    }`}></span>
                                <span className="text-xs text-slate-500 capitalize">{person.status}</span>
                            </div>

                            <div className="flex gap-2">
                                <button className="flex-1 py-1.5 rounded-lg bg-slate-800 text-xs font-medium text-slate-300 hover:bg-slate-700 flex items-center justify-center gap-2">
                                    <MessageSquare size={14} /> Chat
                                </button>
                                <button className="flex-1 py-1.5 rounded-lg bg-slate-800 text-xs font-medium text-slate-300 hover:bg-slate-700 flex items-center justify-center gap-2">
                                    <Mail size={14} /> Email
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeamDirectory;
