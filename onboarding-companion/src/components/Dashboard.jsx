import React from 'react';
import { CheckCircle2, Circle, ExternalLink, MessageSquare, ArrowRight } from 'lucide-react';
import { getMilestonesForRole } from '../config/milestones';

const roleLabels = { engineering: 'Engineering', product: 'Product', design: 'Design' };

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
    const upcoming = allMilestones.filter((m) => !completedMilestones[m.id]).slice(0, 3);
    const week1 = allMilestones.filter((m) => m.week === 1);
    const week2 = allMilestones.filter((m) => m.week === 2);
    const week1Progress = getProgress(week1);
    const week2Progress = getProgress(week2);

    return (
        <div className="p-10 max-w-7xl mx-auto space-y-10">
            <header>
                <div className="flex justify-between items-end flex-wrap gap-4">
                    <div>
                        <h2 className="font-medium mb-1" style={{ color: 'var(--text-muted)' }}>
                            {greetingTime()}, {user?.name?.split(' ')[0]}.
                        </h2>
                        <h1 className="text-3xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                            {roleLabels[role] || 'Your'} Onboarding
                        </h1>
                    </div>
                    <div className="flex gap-3">
                        {[{ label: 'Week 1', p: week1Progress }, { label: 'Week 2', p: week2Progress }].map(({ label, p }) => (
                            <div key={label} className="flex flex-col items-center gap-1.5">
                                <div className="w-32 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
                                    <div
                                        className="h-full rounded-full transition-all duration-500"
                                        style={{ width: `${p.percent}%`, background: p.percent === 100 ? 'var(--accent)' : 'var(--peach)' }}
                                    />
                                </div>
                                <span className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                                    {label} · {p.done}/{p.total}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Overall progress */}
                    <section className="rounded-2xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Overall Progress</h3>
                            <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{overallProgress.percent}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full overflow-hidden mb-1" style={{ background: 'var(--border)' }}>
                            <div
                                className="h-full rounded-full transition-all duration-700"
                                style={{ width: `${overallProgress.percent}%`, background: 'linear-gradient(to right, var(--accent), var(--peach))' }}
                            />
                        </div>
                        <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
                            {overallProgress.done} of {overallProgress.total} milestones complete
                            {overallProgress.percent === 100 && ' 🎉 All done!'}
                        </p>
                    </section>

                    {/* Today's Priorities */}
                    <section>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Today's Priorities</h3>
                            <button
                                onClick={() => setView('journey')}
                                className="text-sm flex items-center gap-1 transition-colors font-medium"
                                style={{ color: 'var(--accent)' }}
                            >
                                View all <ArrowRight size={14} />
                            </button>
                        </div>
                        {upcoming.length === 0 ? (
                            <div className="text-center py-12 rounded-2xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                                <CheckCircle2 size={40} className="mx-auto mb-3" style={{ color: 'var(--accent)' }} />
                                <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>All milestones complete!</p>
                                <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>You've finished your onboarding journey 🎉</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {upcoming.map((milestone) => {
                                    const completed = !!completedMilestones[milestone.id];
                                    return (
                                        <div
                                            key={milestone.id}
                                            className="group flex items-center justify-between p-5 rounded-2xl shadow-sm transition-all"
                                            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                                            onMouseEnter={e => { e.currentTarget.style.border = '1px solid var(--border-accent)'; e.currentTarget.style.background = 'var(--bg-card-hover)'; }}
                                            onMouseLeave={e => { e.currentTarget.style.border = '1px solid var(--border)'; e.currentTarget.style.background = 'var(--bg-card)'; }}
                                        >
                                            <div className="flex items-center gap-4">
                                                <button onClick={() => toggleMilestone(milestone.id, completed)} className="transition-transform hover:scale-110">
                                                    {completed
                                                        ? <CheckCircle2 size={24} style={{ color: 'var(--accent)' }} />
                                                        : <Circle size={24} style={{ color: 'var(--border)' }} />
                                                    }
                                                </button>
                                                <div>
                                                    <h4 className="text-base font-medium" style={{ color: 'var(--text-primary)' }}>{milestone.title}</h4>
                                                    <p className="text-xs font-medium mt-0.5" style={{ color: 'var(--text-muted)' }}>
                                                        {milestone.category} · Week {milestone.week}
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => setView('journey')}
                                                className="text-sm px-5 py-2 rounded-xl font-medium shadow-sm hover:scale-105 transition-all opacity-0 group-hover:opacity-100"
                                                style={{ background: 'var(--accent)', color: '#262424' }}
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

                {/* Right: Mentor + Quick links */}
                <div className="space-y-8">
                    <div className="p-6 rounded-3xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                        <h3 className="text-sm font-bold uppercase tracking-wider mb-6" style={{ color: 'var(--text-muted)' }}>Your Mentor</h3>
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-4">
                                <img
                                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Kshitij&sex[]=male"
                                    alt="Mentor"
                                    className="w-12 h-12 rounded-full"
                                    style={{ background: 'var(--border)' }}
                                />
                                <div>
                                    <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>Your Mentor</div>
                                    <div className="text-xs flex items-center gap-1" style={{ color: 'var(--accent)' }}>
                                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }}></span> Available
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 rounded-2xl text-sm italic" style={{ background: 'var(--border)', color: 'var(--text-subtle)' }}>
                                "Welcome! Reach out any time — no question is too small."
                            </div>
                            <button
                                onClick={() => setView('team')}
                                className="w-full py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                                style={{ background: 'var(--bg-sidebar)', color: 'var(--text-sidebar)' }}
                            >
                                <MessageSquare size={16} /> Find your mentor
                            </button>
                        </div>
                    </div>

                    <div className="rounded-2xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                        <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--text-muted)' }}>Quick Links</h3>
                        <div className="space-y-2">
                            {[{ label: 'View full journey', view: 'journey' }, { label: 'Browse resources', view: 'resources' }, { label: 'Team directory', view: 'team' }].map(({ label, view }) => (
                                <button
                                    key={view}
                                    onClick={() => setView(view)}
                                    className="w-full text-left text-sm flex items-center justify-between py-1.5 transition-colors group font-medium"
                                    style={{ color: 'var(--text-subtle)' }}
                                    onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-subtle)'}
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
