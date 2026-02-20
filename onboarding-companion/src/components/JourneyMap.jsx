import React, { useState } from 'react';
import { CheckCircle2, Circle, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { getMilestonesForRole } from '../config/milestones';

const categoryColors = {
    Setup: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    Communication: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    Compliance: 'bg-red-500/10 text-red-400 border-red-500/20',
    Tools: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    Relationships: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
};

const MilestoneCard = ({ milestone, completed, onToggle }) => {
    const [expanded, setExpanded] = useState(false);
    const colorClass = categoryColors[milestone.category] || 'bg-slate-500/10 text-slate-400 border-slate-500/20';

    return (
        <div
            className={`border rounded-2xl transition-all duration-200 ${completed
                    ? 'bg-slate-900/20 border-slate-800/50 opacity-60'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-600 hover:shadow-lg hover:shadow-black/20'
                }`}
        >
            <div className="p-5 flex items-start gap-4">
                {/* Checkbox */}
                <button
                    onClick={() => onToggle(milestone.id, completed)}
                    className="mt-0.5 shrink-0 transition-transform hover:scale-110"
                    aria-label={completed ? 'Mark incomplete' : 'Mark complete'}
                >
                    {completed
                        ? <CheckCircle2 size={22} className="text-emerald-500" />
                        : <Circle size={22} className="text-slate-600 hover:text-blue-400 transition-colors" />
                    }
                </button>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-1">
                        <h3 className={`font-semibold text-base leading-snug ${completed ? 'text-slate-500 line-through' : 'text-white'}`}>
                            {milestone.title}
                        </h3>
                        <span className={`shrink-0 text-xs font-medium px-2.5 py-0.5 rounded-full border ${colorClass}`}>
                            {milestone.category}
                        </span>
                    </div>

                    <button
                        onClick={() => setExpanded((p) => !p)}
                        className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300 transition-colors mt-1"
                    >
                        {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                        {expanded ? 'Less' : 'More info'}
                    </button>

                    {expanded && (
                        <div className="mt-3 pt-3 border-t border-slate-800 text-sm text-slate-400 leading-relaxed space-y-2">
                            <p>{milestone.description}</p>
                            {milestone.notionLink && (
                                <a
                                    href={milestone.notionLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 text-xs font-medium"
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
                <h2 className="text-xl font-bold text-white">Week {week}</h2>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${progress.percent === 100
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-blue-600/20 text-blue-400 border-blue-500/20'
                    }`}>
                    {progress.done}/{progress.total} done
                </span>
            </div>
            {/* Mini progress bar */}
            <div className="w-32 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${progress.percent}%` }}
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
                <h1 className="text-3xl font-bold text-white mb-2">My Journey</h1>
                <p className="text-slate-400 mb-6">Your personalised {roleLabel} onboarding path — 2 weeks to full productivity.</p>

                {/* Overall progress */}
                <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 flex items-center gap-6">
                    <div className="relative w-16 h-16 shrink-0">
                        <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1e293b" strokeWidth="3" />
                            <circle
                                cx="18" cy="18" r="15.9" fill="none"
                                stroke="url(#progressGrad)" strokeWidth="3"
                                strokeDasharray={`${overallProgress.percent} ${100 - overallProgress.percent}`}
                                strokeLinecap="round"
                            />
                            <defs>
                                <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#3b82f6" />
                                    <stop offset="100%" stopColor="#10b981" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">
                            {overallProgress.percent}%
                        </span>
                    </div>
                    <div>
                        <div className="text-white font-semibold mb-0.5">Overall Progress</div>
                        <div className="text-slate-400 text-sm">
                            {overallProgress.done} of {overallProgress.total} milestones complete
                        </div>
                        {overallProgress.percent === 100 && (
                            <div className="text-emerald-400 text-xs font-semibold mt-1">🎉 Onboarding complete!</div>
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
