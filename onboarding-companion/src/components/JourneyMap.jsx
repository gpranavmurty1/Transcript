import React, { useState } from 'react';
import { CheckCircle2, Circle, ChevronDown, ChevronUp, ExternalLink, Clock, Calendar, AlertCircle } from 'lucide-react';
import { getMilestonesForRole } from '../config/milestones';

const categoryColors = {
    Setup: { color: '#ECA508', bg: 'rgba(236,165,8,0.08)', border: 'rgba(236,165,8,0.25)' },
    Communication: { color: '#6b5e5e', bg: 'rgba(107,94,94,0.08)', border: 'rgba(107,94,94,0.2)' },
    Compliance: { color: '#F97070', bg: 'rgba(249,112,112,0.08)', border: 'rgba(249,112,112,0.25)' },
    Tools: { color: '#d4920a', bg: 'rgba(212,146,10,0.08)', border: 'rgba(212,146,10,0.25)' },
    Relationships: { color: '#9e8e8e', bg: 'rgba(158,142,142,0.08)', border: 'rgba(158,142,142,0.2)' },
};

const isOverdue = (milestone, joinedAt) => {
    if (!joinedAt) return false;
    const joined = new Date(joinedAt);
    const now = new Date();
    const daysSince = (now - joined) / (1000 * 60 * 60 * 24);
    if (milestone.week === 1 && daysSince > 7) return true;
    if (milestone.week === 2 && daysSince > 14) return true;
    return false;
};

const MilestoneCard = ({ milestone, completed, onToggle, userJoinedAt }) => {
    const [expanded, setExpanded] = useState(false);
    const cat = categoryColors[milestone.category] || { color: 'var(--text-muted)', bg: 'var(--border)', border: 'var(--border)' };
    
    const overdue = !completed && isOverdue(milestone, userJoinedAt);
    const borderColor = overdue ? '#F97070' : 'var(--border)';

    return (
        <div className="rounded-2xl transition-all duration-200" 
             style={{ 
                background: overdue ? 'rgba(249,112,112,0.02)' : 'var(--bg-card)', 
                border: `1px solid ${borderColor}`, 
                opacity: completed ? 0.55 : 1 
             }}
             onMouseEnter={e => { if (!completed && !overdue) e.currentTarget.style.border = '1px solid var(--border-accent)'; }}
             onMouseLeave={e => { if (!completed && !overdue) e.currentTarget.style.border = '1px solid var(--border)'; }}>
            <div className="p-5 flex items-start gap-4">
                <button onClick={() => onToggle(milestone.id, completed)} className="mt-0.5 shrink-0 hover:scale-110 transition-transform">
                    {completed ? <CheckCircle2 size={22} style={{ color: 'var(--accent)' }} /> : <Circle size={22} style={{ color: overdue ? '#F97070' : 'var(--border)' }} />}
                </button>
                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
                        <div className="flex items-center gap-2">
                           <h3 className="font-semibold text-base leading-snug" style={{ color: 'var(--text-primary)', textDecoration: completed ? 'line-through' : 'none', opacity: completed ? 0.7 : 1 }}>{milestone.title}</h3>
                           {overdue && (
                               <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded" style={{ color: '#F97070', background: 'rgba(249,112,112,0.1)' }}>
                                   <AlertCircle size={10} /> Overdue
                               </span>
                           )}
                        </div>
                        <span className="shrink-0 text-xs font-medium px-2.5 py-0.5 rounded-full border" style={{ color: cat.color, background: cat.bg, borderColor: cat.border }}>{milestone.category}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mt-2 text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                        <div className="flex items-center gap-1.5">
                            <Calendar size={13} /> {milestone.timeframe || `By Week ${milestone.week}`}
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock size={13} /> {milestone.estimatedTime || '15 mins'}
                        </div>
                    </div>

                    <button onClick={() => setExpanded(p => !p)} className="flex items-center gap-1 text-xs mt-3" style={{ color: 'var(--text-muted)' }}
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                        {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />} {expanded ? 'Less info' : 'View instructions'}
                    </button>
                    {expanded && (
                        <div className="mt-3 pt-3 text-sm leading-relaxed" style={{ borderTop: '1px solid var(--border)', color: 'var(--text-subtle)' }}>
                            <p className="mb-2">{milestone.description}</p>
                            {milestone.notionLink && (
                                <a href={milestone.notionLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-medium" style={{ color: 'var(--accent)' }}>
                                    <ExternalLink size={12} /> Open in Notion
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const CollapsibleSection = ({ title, milestones, completedMap, onToggle, progress, userJoinedAt }) => {
    const [isOpen, setIsOpen] = useState(true);
    
    if (milestones.length === 0) return null;

    return (
        <div className="mb-8">
            <button 
               onClick={() => setIsOpen(!isOpen)}
               className="w-full flex items-center justify-between mb-4 group text-left"
            >
                <div className="flex items-center gap-3">
                    <div style={{ color: 'var(--text-muted)' }} className="transition-transform duration-200 group-hover:text-[var(--accent)]">
                        {isOpen ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
                    </div>
                    <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{title}</h2>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full border transition-colors"
                        style={progress.percent === 100
                            ? { color: 'var(--accent)', background: 'rgba(236,165,8,0.08)', borderColor: 'var(--border-accent)' }
                            : { color: 'var(--text-muted)', background: 'var(--bg-card)', borderColor: 'var(--border)' }
                        }>{progress.done}/{progress.total} done</span>
                </div>
                <div className="w-32 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress.percent}%`, background: 'linear-gradient(to right, var(--accent), var(--peach))' }} />
                </div>
            </button>
            <div className={`space-y-3 overflow-hidden transition-all duration-300 ${isOpen ? 'opacity-100' : 'max-h-0 opacity-0'}`}>
                {milestones.map(m => <MilestoneCard key={m.id} milestone={m} completed={!!completedMap[m.id]} onToggle={onToggle} userJoinedAt={userJoinedAt} />)}
            </div>
        </div>
    );
};

const JourneyMap = ({ role, milestoneProgress, user }) => {
    const { completedMilestones, toggleMilestone, getProgress } = milestoneProgress;
    const allMilestones = getMilestonesForRole(role);
    
    // Define the distinct groups as per Acceptance Criteria
    const foundations = allMilestones.filter(m => m.week === 1 && m.originalSource === 'all');
    const coreSystems = allMilestones.filter(m => m.week === 2 && m.originalSource === 'all');
    const roleSpecific = allMilestones.filter(m => m.week === 2 && m.originalSource !== 'all');

    const overallProgress = getProgress(allMilestones);
    const roleLabel = { engineering: 'Engineering', product: 'Product', design: 'Design' }[role] || 'Your';

    return (
        <div className="p-10 max-w-4xl mx-auto">
            <div className="mb-10">
                <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>My Journey</h1>
                <p className="mb-6" style={{ color: 'var(--text-muted)' }}>Your personalised {roleLabel} onboarding path — 2 weeks to full productivity.</p>
                <div className="rounded-2xl p-5 flex items-center gap-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                    <div className="relative w-16 h-16 shrink-0">
                        <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                            <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--border)" strokeWidth="3" />
                            <circle cx="18" cy="18" r="15.9" fill="none" stroke="url(#evProg)" strokeWidth="3"
                                strokeDasharray={`${overallProgress.percent} ${100 - overallProgress.percent}`} strokeLinecap="round" />
                            <defs>
                                <linearGradient id="evProg" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#ECA508" /><stop offset="100%" stopColor="#F97070" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{overallProgress.percent}%</span>
                    </div>
                    <div>
                        <div className="font-semibold mb-0.5" style={{ color: 'var(--text-primary)' }}>Overall Progress</div>
                        <div className="text-sm" style={{ color: 'var(--text-muted)' }}>{overallProgress.done} of {overallProgress.total} milestones complete</div>
                        {overallProgress.percent === 100 && <div className="text-xs font-semibold mt-1" style={{ color: 'var(--accent)' }}>🎉 Onboarding complete!</div>}
                    </div>
                </div>
            </div>
            
            <CollapsibleSection title="Week 1: Foundations" milestones={foundations} completedMap={completedMilestones} onToggle={toggleMilestone} progress={getProgress(foundations)} userJoinedAt={user?.joinedAt} />
            <CollapsibleSection title="Week 1-2: Core Systems" milestones={coreSystems} completedMap={completedMilestones} onToggle={toggleMilestone} progress={getProgress(coreSystems)} userJoinedAt={user?.joinedAt} />
            <CollapsibleSection title="Week 1-2: Role-Specific Training" milestones={roleSpecific} completedMap={completedMilestones} onToggle={toggleMilestone} progress={getProgress(roleSpecific)} userJoinedAt={user?.joinedAt} />
        </div>
    );
};

export default JourneyMap;
