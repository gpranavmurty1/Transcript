import React from 'react';
import { CheckCircle2, Circle, ExternalLink, MessageSquare, ArrowRight } from 'lucide-react';
import { getMilestonesForRole } from '../config/milestones';

const roleLabels = {
    engineering: 'Engineering',
    product: 'Product',
    design: 'Design',
};

const greetingTime = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
};

const Dashboard = ({ user, setView, milestoneProgress, role }) => {
    const { completedMilestones, toggleMilestone, getProgress } = milestoneProgress;
    const allMilestones = getMilestonesForRole(role);
    const overallProgress = getProgress(allMilestones);

    // Next 3 uncompleted milestones for "Today's Priorities"
    const upcoming = allMilestones
        .filter((m) => !completedMilestones[m.id])
        .slice(0, 3);

    // Week progress
    const week1 = allMilestones.filter((m) => m.week === 1);
    const week2 = allMilestones.filter((m) => m.week === 2);
    const week1Progress = getProgress(week1);
    const week2Progress = getProgress(week2);

    return (
        <div className="p-10 max-w-7xl mx-auto space-y-10">
            {/* Header */}
            <header>
                <div className="flex justify-between items-end flex-wrap gap-4">
                    <div>
                        <h2 className="text-slate-400 font-medium mb-1">
                            {greetingTime()}, {user?.name?.split(' ')[0]}.
                        </h2>
                        <h1 className="text-3xl font-bold text-white tracking-tight">
                            {roleLabels[role] || 'Your'} Onboarding
                        </h1>
                    </div>

                    {/* Week progress pills */}
                    <div className="flex gap-3">
                        {[{ label: 'Week 1', p: week1Progress }, { label: 'Week 2', p: week2Progress }].map(({ label, p }) => (
                            <div key={label} className="flex flex-col items-center gap-1.5">
                                <div className="w-32 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-500 ${p.percent === 100 ? 'bg-emerald-500' : 'bg-blue-500'
                                            }`}
                                        style={{ width: `${p.percent}%` }}
                                    />
                                </div>
                                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                                    {label} · {p.done}/{p.total}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </header>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left: Today's Priorities */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Overall progress bar */}
                    <section className="bg-slate-900/30 border border-slate-800 rounded-2xl p-6">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Overall Progress</h3>
                            <span className="text-sm font-semibold text-white">{overallProgress.percent}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-1">
                            <div
                                className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-700"
                                style={{ width: `${overallProgress.percent}%` }}
                            />
                        </div>
                        <p className="text-xs text-slate-500 mt-2">
                            {overallProgress.done} of {overallProgress.total} milestones complete
                            {overallProgress.percent === 100 && ' 🎉 All done!'}
                        </p>
                    </section>

                    {/* Today's Priorities */}
                    <section>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-white">Today's Priorities</h3>
                            <button
                                onClick={() => setView('journey')}
                                className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
                            >
                                View all <ArrowRight size={14} />
                            </button>
                        </div>

                        {upcoming.length === 0 ? (
                            <div className="text-center py-12 bg-slate-900/30 border border-slate-800 rounded-2xl">
                                <CheckCircle2 size={40} className="text-emerald-500 mx-auto mb-3" />
                                <p className="text-white font-semibold">All milestones complete!</p>
                                <p className="text-slate-400 text-sm mt-1">You've finished your onboarding journey 🎉</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {upcoming.map((milestone) => {
                                    const completed = !!completedMilestones[milestone.id];
                                    return (
                                        <div
                                            key={milestone.id}
                                            className="group flex items-center justify-between p-5 rounded-2xl border bg-slate-800/40 border-slate-700 hover:border-blue-500/30 hover:bg-slate-800/80 shadow-sm transition-all"
                                        >
                                            <div className="flex items-center gap-4">
                                                <button
                                                    onClick={() => toggleMilestone(milestone.id, completed)}
                                                    className="transition-transform hover:scale-110"
                                                >
                                                    {completed
                                                        ? <CheckCircle2 size={24} className="text-emerald-500" />
                                                        : <Circle size={24} className="text-slate-500 group-hover:text-blue-400 transition-colors" />
                                                    }
                                                </button>
                                                <div>
                                                    <h4 className="text-base font-medium text-slate-200">{milestone.title}</h4>
                                                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                                                        {milestone.category} · Week {milestone.week}
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => setView('journey')}
                                                className="text-sm bg-blue-600 text-white px-5 py-2 rounded-xl font-medium shadow-lg shadow-blue-900/20 hover:bg-blue-500 hover:scale-105 transition-all opacity-0 group-hover:opacity-100"
                                            >
                                                Start
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </section>
                </div>

                {/* Right: Mentor widget */}
                <div className="space-y-8">
                    <div className="p-6 rounded-3xl bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700/50">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Your Mentor</h3>
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-4">
                                <img
                                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Kshitij&sex[]=male"
                                    alt="Mentor"
                                    className="w-12 h-12 rounded-full bg-slate-700"
                                />
                                <div>
                                    <div className="font-semibold text-white">Your Mentor</div>
                                    <div className="text-xs text-emerald-400 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Available
                                    </div>
                                </div>
                            </div>
                            <div className="bg-slate-800/50 p-4 rounded-2xl text-sm text-slate-300 italic">
                                "Welcome! Reach out any time — no question is too small."
                            </div>
                            <button
                                onClick={() => setView('team')}
                                className="w-full py-2.5 rounded-xl bg-slate-700 text-white text-sm font-medium hover:bg-slate-600 transition-colors flex items-center justify-center gap-2"
                            >
                                <MessageSquare size={16} /> Find your mentor
                            </button>
                        </div>
                    </div>

                    {/* Quick links */}
                    <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Quick Links</h3>
                        <div className="space-y-2">
                            {[
                                { label: 'View full journey', view: 'journey' },
                                { label: 'Browse resources', view: 'resources' },
                                { label: 'Team directory', view: 'team' },
                            ].map(({ label, view }) => (
                                <button
                                    key={view}
                                    onClick={() => setView(view)}
                                    className="w-full text-left text-sm text-slate-400 hover:text-blue-400 flex items-center justify-between py-1.5 transition-colors group"
                                >
                                    {label}
                                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
