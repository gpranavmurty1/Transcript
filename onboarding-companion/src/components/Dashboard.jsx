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
                        <h2 className="font-medium mb-1" style={{ color: '#9e8e8e' }}>
                            {greetingTime()}, {user?.name?.split(' ')[0]}.
                        </h2>
                        <h1 className="text-3xl font-bold tracking-tight" style={{ color: '#262424' }}>
                            {roleLabels[role] || 'Your'} Onboarding
                        </h1>
                    </div>

                    {/* Week progress pills */}
                    <div className="flex gap-3">
                        {[{ label: 'Week 1', p: week1Progress }, { label: 'Week 2', p: week2Progress }].map(({ label, p }) => (
                            <div key={label} className="flex flex-col items-center gap-1.5">
                                <div className="w-32 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(38,36,36,0.1)' }}>
                                    <div
                                        className="h-full rounded-full transition-all duration-500"
                                        style={{
                                            width: `${p.percent}%`,
                                            background: p.percent === 100 ? '#ECA508' : '#F97070',
                                        }}
                                    />
                                </div>
                                <span className="text-xs font-medium uppercase tracking-wider" style={{ color: '#9e8e8e' }}>
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
                    <section
                        className="rounded-2xl p-6"
                        style={{ background: 'rgba(38,36,36,0.04)', border: '1px solid rgba(38,36,36,0.08)' }}
                    >
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: '#9e8e8e' }}>Overall Progress</h3>
                            <span className="text-sm font-semibold" style={{ color: '#262424' }}>{overallProgress.percent}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full overflow-hidden mb-1" style={{ background: 'rgba(38,36,36,0.1)' }}>
                            <div
                                className="h-full rounded-full transition-all duration-700"
                                style={{ width: `${overallProgress.percent}%`, background: 'linear-gradient(to right, #ECA508, #F97070)' }}
                            />
                        </div>
                        <p className="text-xs mt-2" style={{ color: '#9e8e8e' }}>
                            {overallProgress.done} of {overallProgress.total} milestones complete
                            {overallProgress.percent === 100 && ' 🎉 All done!'}
                        </p>
                    </section>

                    {/* Today's Priorities */}
                    <section>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold" style={{ color: '#262424' }}>Today's Priorities</h3>
                            <button
                                onClick={() => setView('journey')}
                                className="text-sm flex items-center gap-1 transition-colors font-medium"
                                style={{ color: '#ECA508' }}
                            >
                                View all <ArrowRight size={14} />
                            </button>
                        </div>

                        {upcoming.length === 0 ? (
                            <div
                                className="text-center py-12 rounded-2xl"
                                style={{ background: 'rgba(38,36,36,0.04)', border: '1px solid rgba(38,36,36,0.08)' }}
                            >
                                <CheckCircle2 size={40} className="mx-auto mb-3" style={{ color: '#ECA508' }} />
                                <p className="font-semibold" style={{ color: '#262424' }}>All milestones complete!</p>
                                <p className="text-sm mt-1" style={{ color: '#9e8e8e' }}>You've finished your onboarding journey 🎉</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {upcoming.map((milestone) => {
                                    const completed = !!completedMilestones[milestone.id];
                                    return (
                                        <div
                                            key={milestone.id}
                                            className="group flex items-center justify-between p-5 rounded-2xl shadow-sm transition-all"
                                            style={{
                                                background: 'rgba(255,255,255,0.6)',
                                                border: '1px solid rgba(38,36,36,0.08)',
                                            }}
                                            onMouseEnter={e => {
                                                e.currentTarget.style.border = '1px solid rgba(236,165,8,0.35)';
                                                e.currentTarget.style.background = 'rgba(255,255,255,0.85)';
                                            }}
                                            onMouseLeave={e => {
                                                e.currentTarget.style.border = '1px solid rgba(38,36,36,0.08)';
                                                e.currentTarget.style.background = 'rgba(255,255,255,0.6)';
                                            }}
                                        >
                                            <div className="flex items-center gap-4">
                                                <button
                                                    onClick={() => toggleMilestone(milestone.id, completed)}
                                                    className="transition-transform hover:scale-110"
                                                >
                                                    {completed
                                                        ? <CheckCircle2 size={24} style={{ color: '#ECA508' }} />
                                                        : <Circle size={24} style={{ color: 'rgba(38,36,36,0.25)' }} />
                                                    }
                                                </button>
                                                <div>
                                                    <h4 className="text-base font-medium" style={{ color: '#262424' }}>{milestone.title}</h4>
                                                    <p className="text-xs font-medium mt-0.5" style={{ color: '#9e8e8e' }}>
                                                        {milestone.category} · Week {milestone.week}
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => setView('journey')}
                                                className="text-sm px-5 py-2 rounded-xl font-medium shadow-sm hover:scale-105 transition-all opacity-0 group-hover:opacity-100"
                                                style={{ background: '#ECA508', color: '#262424' }}
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
                    <div
                        className="p-6 rounded-3xl"
                        style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(38,36,36,0.08)' }}
                    >
                        <h3 className="text-sm font-bold uppercase tracking-wider mb-6" style={{ color: '#9e8e8e' }}>Your Mentor</h3>
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-4">
                                <img
                                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Kshitij&sex[]=male"
                                    alt="Mentor"
                                    className="w-12 h-12 rounded-full"
                                    style={{ background: 'rgba(38,36,36,0.06)' }}
                                />
                                <div>
                                    <div className="font-semibold" style={{ color: '#262424' }}>Your Mentor</div>
                                    <div className="text-xs flex items-center gap-1" style={{ color: '#ECA508' }}>
                                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#ECA508' }}></span> Available
                                    </div>
                                </div>
                            </div>
                            <div
                                className="p-4 rounded-2xl text-sm italic"
                                style={{ background: 'rgba(38,36,36,0.04)', color: '#6b5e5e' }}
                            >
                                "Welcome! Reach out any time — no question is too small."
                            </div>
                            <button
                                onClick={() => setView('team')}
                                className="w-full py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                                style={{ background: '#262424', color: '#F9EFDF' }}
                                onMouseEnter={e => e.currentTarget.style.background = '#3a3636'}
                                onMouseLeave={e => e.currentTarget.style.background = '#262424'}
                            >
                                <MessageSquare size={16} /> Find your mentor
                            </button>
                        </div>
                    </div>

                    {/* Quick links */}
                    <div
                        className="rounded-2xl p-5"
                        style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(38,36,36,0.08)' }}
                    >
                        <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: '#9e8e8e' }}>Quick Links</h3>
                        <div className="space-y-2">
                            {[
                                { label: 'View full journey', view: 'journey' },
                                { label: 'Browse resources', view: 'resources' },
                                { label: 'Team directory', view: 'team' },
                            ].map(({ label, view }) => (
                                <button
                                    key={view}
                                    onClick={() => setView(view)}
                                    className="w-full text-left text-sm flex items-center justify-between py-1.5 transition-colors group font-medium"
                                    style={{ color: '#6b5e5e' }}
                                    onMouseEnter={e => e.currentTarget.style.color = '#ECA508'}
                                    onMouseLeave={e => e.currentTarget.style.color = '#6b5e5e'}
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
