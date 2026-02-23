import React, { useState } from 'react';
import { CheckCircle2, Circle, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { getMilestonesForRole } from '../config/milestones';

const categoryColors = {
    Setup: { color: '#ECA508', bg: 'rgba(236,165,8,0.08)', border: 'rgba(236,165,8,0.25)' },
    Communication: { color: '#262424', bg: 'rgba(38,36,36,0.06)', border: 'rgba(38,36,36,0.18)' },
    Compliance: { color: '#F97070', bg: 'rgba(249,112,112,0.08)', border: 'rgba(249,112,112,0.25)' },
    Tools: { color: '#d4920a', bg: 'rgba(212,146,10,0.08)', border: 'rgba(212,146,10,0.25)' },
    Relationships: { color: '#6b5e5e', bg: 'rgba(107,94,94,0.08)', border: 'rgba(107,94,94,0.2)' },
};

const MilestoneCard = ({ milestone, completed, onToggle }) => {
    const [expanded, setExpanded] = useState(false);
    const cat = categoryColors[milestone.category] || { color: '#9e8e8e', bg: 'rgba(38,36,36,0.05)', border: 'rgba(38,36,36,0.12)' };

    return (
        <div
            className="rounded-2xl transition-all duration-200"
            style={{
                background: completed ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.65)',
                border: `1px solid ${completed ? 'rgba(38,36,36,0.06)' : 'rgba(38,36,36,0.09)'}`,
                opacity: completed ? 0.65 : 1,
            }}
            onMouseEnter={e => { if (!completed) e.currentTarget.style.border = '1px solid rgba(236,165,8,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.border = `1px solid ${completed ? 'rgba(38,36,36,0.06)' : 'rgba(38,36,36,0.09)'}`; }}
        >
            <div className="p-5 flex items-start gap-4">
                {/* Checkbox */}
                <button
                    onClick={() => onToggle(milestone.id, completed)}
                    className="mt-0.5 shrink-0 transition-transform hover:scale-110"
                    aria-label={completed ? 'Mark incomplete' : 'Mark complete'}
                >
                    {completed
                        ? <CheckCircle2 size={22} style={{ color: '#ECA508' }} />
                        : <Circle size={22} style={{ color: 'rgba(38,36,36,0.2)' }} />
                    }
                </button>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-1">
                        <h3
                            className="font-semibold text-base leading-snug"
                            style={{ color: completed ? '#9e8e8e' : '#262424', textDecoration: completed ? 'line-through' : 'none' }}
                        >
                            {milestone.title}
                        </h3>
                        <span
                            className="shrink-0 text-xs font-medium px-2.5 py-0.5 rounded-full border"
                            style={{ color: cat.color, background: cat.bg, borderColor: cat.border }}
                        >
                            {milestone.category}
                        </span>
                    </div>

                    <button
                        onClick={() => setExpanded((p) => !p)}
                        className="flex items-center gap-1 text-xs mt-1 transition-colors"
                        style={{ color: '#9e8e8e' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#ECA508'}
                        onMouseLeave={e => e.currentTarget.style.color = '#9e8e8e'}
                    >
                        {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                        {expanded ? 'Less' : 'More info'}
                    </button>

                    {expanded && (
                        <div
                            className="mt-3 pt-3 text-sm leading-relaxed space-y-2"
                            style={{ borderTop: '1px solid rgba(38,36,36,0.07)', color: '#6b5e5e' }}
                        >
                            <p>{milestone.description}</p>
                            {milestone.notionLink && (
                                <a
                                    href={milestone.notionLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors"
                                    style={{ color: '#ECA508' }}
                                    onMouseEnter={e => e.currentTarget.style.color = '#d4920a'}
                                    onMouseLeave={e => e.currentTarget.style.color = '#ECA508'}
                                >
                                    <ExternalLink size={12} />
                                    Open in Notion
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const WeekSection = ({ week, milestones, completedMap, onToggle, progress }) => (
    <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold" style={{ color: '#262424' }}>Week {week}</h2>
                <span
                    className="text-xs font-semibold px-2.5 py-0.5 rounded-full border"
                    style={progress.percent === 100
                        ? { color: '#ECA508', background: 'rgba(236,165,8,0.08)', borderColor: 'rgba(236,165,8,0.25)' }
                        : { color: '#6b5e5e', background: 'rgba(38,36,36,0.05)', borderColor: 'rgba(38,36,36,0.12)' }
                    }
                >
                    {progress.done}/{progress.total} done
                </span>
            </div>
            {/* Mini progress bar */}
            <div className="w-32 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(38,36,36,0.08)' }}>
                <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${progress.percent}%`, background: 'linear-gradient(to right, #ECA508, #F97070)' }}
                />
            </div>
        </div>
        <div className="space-y-3">
            {milestones.map((m) => (
                <MilestoneCard
                    key={m.id}
                    milestone={m}
                    completed={!!completedMap[m.id]}
                    onToggle={onToggle}
                />
            ))}
        </div>
    </div>
);

const JourneyMap = ({ role, milestoneProgress }) => {
    const { completedMilestones, toggleMilestone, getProgress } = milestoneProgress;
    const allMilestones = getMilestonesForRole(role);

    const week1 = allMilestones.filter((m) => m.week === 1);
    const week2 = allMilestones.filter((m) => m.week === 2);

    const overallProgress = getProgress(allMilestones);
    const week1Progress = getProgress(week1);
    const week2Progress = getProgress(week2);

    const roleLabel = { engineering: 'Engineering', product: 'Product', design: 'Design' }[role] || 'Your';

    return (
        <div className="p-10 max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-3xl font-bold mb-2" style={{ color: '#262424' }}>My Journey</h1>
                <p className="mb-6" style={{ color: '#9e8e8e' }}>Your personalised {roleLabel} onboarding path — 2 weeks to full productivity.</p>

                {/* Overall progress */}
                <div
                    className="rounded-2xl p-5 flex items-center gap-6"
                    style={{ background: 'rgba(255,255,255,0.65)', border: '1px solid rgba(38,36,36,0.07)' }}
                >
                    <div className="relative w-16 h-16 shrink-0">
                        <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                            <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(38,36,36,0.08)" strokeWidth="3" />
                            <circle
                                cx="18" cy="18" r="15.9" fill="none"
                                stroke="url(#evProgressGrad)" strokeWidth="3"
                                strokeDasharray={`${overallProgress.percent} ${100 - overallProgress.percent}`}
                                strokeLinecap="round"
                            />
                            <defs>
                                <linearGradient id="evProgressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#ECA508" />
                                    <stop offset="100%" stopColor="#F97070" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-sm font-bold" style={{ color: '#262424' }}>
                            {overallProgress.percent}%
                        </span>
                    </div>
                    <div>
                        <div className="font-semibold mb-0.5" style={{ color: '#262424' }}>Overall Progress</div>
                        <div className="text-sm" style={{ color: '#9e8e8e' }}>
                            {overallProgress.done} of {overallProgress.total} milestones complete
                        </div>
                        {overallProgress.percent === 100 && (
                            <div className="text-xs font-semibold mt-1" style={{ color: '#ECA508' }}>🎉 Onboarding complete!</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Week 1 */}
            <WeekSection
                week={1}
                milestones={week1}
                completedMap={completedMilestones}
                onToggle={toggleMilestone}
                progress={week1Progress}
            />

            {/* Week 2 */}
            <WeekSection
                week={2}
                milestones={week2}
                completedMap={completedMilestones}
                onToggle={toggleMilestone}
                progress={week2Progress}
            />
        </div>
    );
};

export default JourneyMap;
