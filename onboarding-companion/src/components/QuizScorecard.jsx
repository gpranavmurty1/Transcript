import React from 'react';
import { Zap, MessageCircle, Hash, RotateCcw, ArrowRight, Star, TrendingUp, Eye } from 'lucide-react';
import {
    SLACK_AI_CHANNEL,
    ESSENTIAL_SKILLS,
    DIMENSION_PRESCRIPTIONS,
    DIMENSION_NARRATIVE,
    getDimensionLevel,
    getWeakestDimension,
} from '../config/aiQuizPrescriptions';

const SLACK_WORKSPACE = 'https://everest-engineering.slack.com';

const dimensionConfig = {
    judgment: { label: 'Judgment', icon: TrendingUp, maxScore: 4, color: '#6366f1', bg: 'rgba(99,102,241,0.1)' },
    craft: { label: 'Craft', icon: Star, maxScore: 3, color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
    critical_evaluation: { label: 'Critical Evaluation', icon: Eye, maxScore: 3, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
};

const ScorePill = ({ score, maxScore, color }) => {
    const pct = (score / maxScore) * 100;
    return (
        <div className="flex items-center gap-2 mt-2">
            <div className="flex-1 h-1.5 rounded-full" style={{ background: 'var(--border)' }}>
                <div className="h-1.5 rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
            </div>
            <span className="text-xs font-bold" style={{ color }}>{score}/{maxScore}</span>
        </div>
    );
};

const DimensionCard = ({ dimKey, score }) => {
    const cfg = dimensionConfig[dimKey];
    const Icon = cfg.icon;
    const level = getDimensionLevel(score, cfg.maxScore);
    const narrative = DIMENSION_NARRATIVE[dimKey][level];

    return (
        <div className="rounded-2xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: cfg.bg }}>
                    <Icon size={16} style={{ color: cfg.color }} />
                </div>
                <div>
                    <div className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{cfg.label}</div>
                    <div className="text-xs font-semibold capitalize" style={{ color: cfg.color }}>{level}</div>
                </div>
            </div>
            <ScorePill score={score} maxScore={cfg.maxScore} color={cfg.color} />
            <p className="text-xs leading-relaxed mt-3" style={{ color: 'var(--text-muted)' }}>{narrative}</p>
        </div>
    );
};

const QuizScorecard = ({ quizData, mentorSlackHandle, onRetake }) => {
    if (!quizData?.completedAt) {
        return (
            <div className="rounded-3xl p-8 text-center" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <Zap size={28} className="mx-auto mb-3" style={{ color: 'var(--accent)' }} />
                <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>You haven't taken the Gen AI Proficiency quiz yet.</p>
                <button onClick={onRetake}
                    className="px-5 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                    style={{ background: 'var(--accent)', color: '#262424' }}>
                    Take the Quiz
                </button>
            </div>
        );
    }

    const scores = {
        judgment: quizData.judgmentScore ?? 0,
        craft: quizData.craftScore ?? 0,
        criticalEval: quizData.criticalEvalScore ?? 0,
    };
    const weakest = getWeakestDimension(scores);
    const weakPrescription = DIMENSION_PRESCRIPTIONS[weakest];
    const lastTaken = new Date(quizData.lastAttemptAt || quizData.completedAt).toLocaleDateString('en-GB', {
        day: 'numeric', month: 'short', year: 'numeric',
    });

    const mentorUrl = mentorSlackHandle
        ? `${SLACK_WORKSPACE}/team/${mentorSlackHandle}`
        : null;

    return (
        <div className="rounded-3xl p-8" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Zap size={18} style={{ color: 'var(--accent)' }} />
                        <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Gen AI Proficiency</h3>
                    </div>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Last taken: {lastTaken}</p>
                </div>
                <button onClick={onRetake}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all hover:scale-105"
                    style={{ background: 'var(--border)', color: 'var(--text-muted)' }}>
                    <RotateCcw size={12} /> Retake
                </button>
            </div>

            {/* Dimension score cards */}
            <div className="grid grid-cols-1 gap-3 mb-8">
                <DimensionCard dimKey="judgment" score={scores.judgment} />
                <DimensionCard dimKey="craft" score={scores.craft} />
                <DimensionCard dimKey="critical_evaluation" score={scores.criticalEval} />
            </div>

            {/* Focus area */}
            <div className="rounded-2xl p-5 mb-6" style={{ background: 'rgba(236,165,8,0.07)', border: '1px solid var(--border-accent)' }}>
                <div className="flex items-center gap-2 mb-2">
                    <TrendingUp size={14} style={{ color: 'var(--accent)' }} />
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
                        This Week's Focus
                    </span>
                </div>
                <p className="text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>{weakPrescription.challenge}</p>
            </div>

            {/* Prescriptions */}
            <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>
                    Your Action Plan
                </h4>
                <div className="flex flex-col gap-2.5">
                    {/* Mentor */}
                    <div className="flex items-center justify-between p-3.5 rounded-2xl"
                        style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)' }}>
                        <div className="flex items-center gap-3">
                            <MessageCircle size={15} style={{ color: 'var(--accent)' }} />
                            <span className="text-sm" style={{ color: 'var(--text-primary)' }}>
                                Talk to your mentor about your results
                            </span>
                        </div>
                        {mentorUrl ? (
                            <a href={mentorUrl} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg transition-all hover:scale-105"
                                style={{ background: 'rgba(236,165,8,0.1)', color: 'var(--accent)' }}>
                                Message <ArrowRight size={11} />
                            </a>
                        ) : (
                            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Ask your team lead to assign a mentor</span>
                        )}
                    </div>

                    {/* Slack channel */}
                    <div className="flex items-center justify-between p-3.5 rounded-2xl"
                        style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)' }}>
                        <div className="flex items-center gap-3">
                            <Hash size={15} style={{ color: 'var(--accent)' }} />
                            <span className="text-sm" style={{ color: 'var(--text-primary)' }}>
                                Join <span className="font-semibold">#artificial-intelligence</span>
                            </span>
                        </div>
                        <a href={SLACK_AI_CHANNEL} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg transition-all hover:scale-105"
                            style={{ background: 'rgba(236,165,8,0.1)', color: 'var(--accent)' }}>
                            Join <ArrowRight size={11} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Essential AI Skills */}
            <div>
                <h4 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>
                    Essential PM AI Skills to Master
                </h4>
                <div className="flex flex-col gap-2">
                    {ESSENTIAL_SKILLS.map(skill => (
                        <div key={skill.name} className="p-3.5 rounded-2xl"
                            style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)' }}>
                            <div className="text-sm font-semibold mb-0.5" style={{ color: 'var(--text-primary)' }}>{skill.name}</div>
                            <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{skill.description}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QuizScorecard;
