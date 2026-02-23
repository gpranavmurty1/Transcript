import React from 'react';
import { CheckCircle2, Circle, MessageSquare, ArrowRight, Calendar, Briefcase, Clock } from 'lucide-react';
import { getMilestonesForRole } from '../config/milestones';

// PRD-specified official role display names
const ROLE_DISPLAY = {
    product: 'Product Manager',
    design: 'Product Designer',
    engineering: 'Software Craftsperson',
};

const greetingTime = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
};

const formatDate = (isoString) => {
    if (!isoString) return 'Not recorded';
    return new Date(isoString).toLocaleDateString('en-AU', {
        day: 'numeric', month: 'long', year: 'numeric',
    });
};

const daysSince = (isoString) => {
    if (!isoString) return null;
    const ms = new Date() - new Date(isoString);
    return Math.max(1, Math.floor(ms / (1000 * 60 * 60 * 24)) + 1);
};

// Stat chip shown in the Onboarding Context banner
const StatChip = ({ icon: Icon, label, value, accent }) => (
    <div
        className="flex items-center gap-3 rounded-2xl px-5 py-4 flex-1 min-w-[160px]"
        style={{ background: accent ? 'var(--accent)' : 'var(--bg-card)', border: '1px solid var(--border)' }}
    >
        <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: accent ? 'rgba(38,36,36,0.12)' : 'rgba(236,165,8,0.1)' }}
        >
            <Icon size={18} style={{ color: accent ? '#262424' : 'var(--accent)' }} />
        </div>
        <div>
            <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color: accent ? 'rgba(38,36,36,0.6)' : 'var(--text-muted)' }}>
                {label}
            </div>
            <div className="text-sm font-semibold leading-tight mt-0.5" style={{ color: accent ? '#262424' : 'var(--text-primary)' }}>
                {value}
            </div>
        </div>
    </div>
);

const Dashboard = ({ user, setView, milestoneProgress, role }) => {
    const { completedMilestones, toggleMilestone, getProgress } = milestoneProgress;
    const allMilestones = getMilestonesForRole(role);
    const overallProgress = getProgress(allMilestones);
    const upcoming = allMilestones.filter((m) => !completedMilestones[m.id]).slice(0, 3);
    const week1 = allMilestones.filter((m) => m.week === 1);
    const week2 = allMilestones.filter((m) => m.week === 2);
    const week1Progress = getProgress(week1);
    const week2Progress = getProgress(week2);

    const roleDisplay = ROLE_DISPLAY[role] || 'Team Member';
    const dayNumber = daysSince(user?.joinedAt);
    const onboardingDayOfTotal = dayNumber ? `Day ${Math.min(dayNumber, 14)} of 14` : 'Day 1 of 14';
    const timePercent = dayNumber ? Math.min(Math.round((dayNumber / 14) * 100), 100) : 0;

    return (
        <div className="p-10 max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <header>
                <h2 className="font-medium mb-1" style={{ color: 'var(--text-muted)' }}>
                    {greetingTime()}, {user?.name?.split(' ')[0]}.
                </h2>
                <h1 className="text-3xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                    {roleDisplay} Onboarding
                </h1>
            </header>

            {/* ── Onboarding Context Banner ── */}
            <section className="rounded-2xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>
                    Your Onboarding at a Glance
                </h3>
                <div className="flex flex-wrap gap-3">
                    {/* Joining Date */}
                    <StatChip
                        icon={Calendar}
                        label="Date of Joining"
                        value={formatDate(user?.joinedAt)}
                    />
                    {/* Role */}
                    <StatChip
                        icon={Briefcase}
                        label="Your Role"
                        value={roleDisplay}
                        accent
                    />
                    {/* Current Date */}
                    <StatChip
                        icon={Clock}
                        label="Today"
                        value={new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}
                    />
                </div>

                {/* Time-based onboarding progress */}
                {dayNumber && (
                    <div className="mt-5 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                                {onboardingDayOfTotal}
                                {dayNumber >= 14 && (
                                    <span className="ml-2 text-xs px-2 py-0.5 rounded-full font-semibold"
                                        style={{ background: 'rgba(236,165,8,0.12)', color: 'var(--accent)' }}>
                                        Complete 🎉
                                    </span>
                                )}
                            </span>
                            <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Time elapsed</span>
                        </div>
                        <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
                            <div
                                className="h-full rounded-full transition-all duration-700"
                                style={{
                                    width: `${timePercent}%`,
                                    background: 'linear-gradient(to right, var(--accent), var(--peach))',
                                }}
                            />
                        </div>
                        <p className="text-xs mt-1.5" style={{ color: 'var(--text-muted)' }}>
                            Joined {formatDate(user?.joinedAt)} · Today is{' '}
                            {new Date().toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'short' })}
                        </p>
                    </div>
                )}
            </section>

            {/* ── Week Progress + Main Grid ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Milestone Progress */}
                    <section className="rounded-2xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Milestone Progress</h3>
                            <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{overallProgress.percent}%</span>
                        </div>
                        <div className="space-y-3">
                            {[{ label: 'Week 1', p: week1Progress }, { label: 'Week 2', p: week2Progress }].map(({ label, p }) => (
                                <div key={label}>
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{label}</span>
                                        <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{p.done}/{p.total}</span>
                                    </div>
                                    <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
                                        <div
                                            className="h-full rounded-full transition-all duration-500"
                                            style={{ width: `${p.percent}%`, background: p.percent === 100 ? 'var(--accent)' : 'var(--peach)' }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="text-xs mt-3" style={{ color: 'var(--text-muted)' }}>
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
