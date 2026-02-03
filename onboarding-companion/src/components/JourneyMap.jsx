import React from 'react';
import { Lock, CheckCircle2, Circle } from 'lucide-react';

const JourneyMap = () => {
    const journey = [
        {
            day: 1,
            title: 'Orientation & Compliance',
            description: 'Complete HR paperwork, setup email/Slack, and attend company welcome.',
            status: 'completed',
            tasks: ['Sign Contract', 'Watch Security Training', 'Join Slack Channels']
        },
        {
            day: 2,
            title: 'Environment Setup',
            description: 'Install dev tools, clone repositories, and run the app locally.',
            status: 'current',
            tasks: ['Install Node/Docker', 'Clone `frontend-monorepo`', 'Setup `.env` variables']
        },
        {
            day: 3,
            title: 'First Pull Request',
            description: 'Pick a "Good First Issue" and submit your first code change.',
            status: 'locked',
            tasks: ['Identify Issue', 'Create Branch', 'Submit PR']
        },
        {
            day: 4,
            title: 'Deep Dive: Architecture',
            description: 'Understanding the core services and database schema.',
            status: 'locked',
            tasks: []
        },
        {
            day: 5,
            title: 'Ship to Production',
            description: 'monitor your changes in staging and deploy to prod.',
            status: 'locked',
            tasks: []
        }
    ];

    return (
        <div className="p-10 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-2">My Journey</h1>
            <p className="text-slate-400 mb-10">Your 30-day path to productivity.</p>

            <div className="space-y-8 relative">
                <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-slate-800"></div>

                {journey.map((step, idx) => (
                    <div key={idx} className={`relative pl-16 transition-all ${step.status === 'locked' ? 'opacity-50' : 'opacity-100'}`}>
                        {/* Timeline Dot */}
                        <div className={`absolute left-4 -translate-x-1/2 w-5 h-5 rounded-full border-4 border-slate-900 z-10 ${step.status === 'completed' ? 'bg-emerald-500' :
                                step.status === 'current' ? 'bg-blue-500 ring-4 ring-blue-500/20' :
                                    'bg-slate-700'
                            }`}></div>

                        <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl hover:bg-slate-900/60 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className={`text-xl font-semibold ${step.status === 'current' ? 'text-blue-400' : 'text-slate-200'}`}>
                                    Day {step.day}: {step.title}
                                </h3>
                                {step.status === 'completed' && <CheckCircle2 size={20} className="text-emerald-500" />}
                                {step.status === 'locked' && <Lock size={18} className="text-slate-600" />}
                            </div>
                            <p className="text-slate-400 text-sm mb-4">{step.description}</p>

                            {step.tasks.length > 0 && step.status !== 'locked' && (
                                <div className="space-y-2 mt-4 pt-4 border-t border-slate-800/50">
                                    {step.tasks.map((t, i) => (
                                        <div key={i} className="flex items-center gap-3 text-sm text-slate-300">
                                            {step.status === 'completed' ? <CheckCircle2 size={14} className="text-emerald-500" /> : <Circle size={14} className="text-slate-600" />}
                                            {t}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JourneyMap;
