import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { roleSkills, coreSkills, domainSkills, aiSkills, SCALE_LABELS } from '../config/skills';

const STEPS = [
    { id: 'role', label: 'Your Skills' },
    { id: 'core', label: 'Core Skills' },
    { id: 'domains', label: 'Domain Experience' },
    { id: 'ai', label: 'AI & LLM' },
];

const ratingBg = (val) => {
    const colors = { 1: '#F97070', 2: '#f5a04a', 3: '#ECA508', 4: '#d4920a', 5: '#262424' };
    return colors[val];
};

const SkillRater = ({ skillKey, skillName, rating, onChange }) => (
    <div className="flex items-center justify-between py-3 gap-4 last:border-0" style={{ borderBottom: '1px solid var(--border)' }}>
        <span className="text-sm leading-snug flex-1" style={{ color: 'var(--text-primary)' }}>{skillName}</span>
        <div className="flex items-center gap-1.5 shrink-0">
            {[1, 2, 3, 4, 5].map((val) => (
                <button
                    key={val}
                    onClick={() => onChange(skillKey, val)}
                    title={SCALE_LABELS[val]}
                    className="w-8 h-8 rounded-lg text-xs font-bold transition-all border-2"
                    style={rating === val
                        ? { background: ratingBg(val), color: '#fff', borderColor: 'transparent', transform: 'scale(1.1)' }
                        : { background: 'var(--border)', color: 'var(--text-muted)', borderColor: 'var(--border)' }
                    }
                >
                    {val}
                </button>
            ))}
            {rating && <span className="text-xs ml-1 w-20 hidden sm:block" style={{ color: 'var(--text-muted)' }}>{SCALE_LABELS[rating]}</span>}
        </div>
    </div>
);

const SkillCategory = ({ category, skills, ratings, onChange }) => (
    <div className="mb-6">
        <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--accent)' }}>{category}</h3>
        <div className="rounded-2xl px-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            {skills.map((skill) => {
                const key = `${category}::${skill}`;
                return <SkillRater key={key} skillKey={key} skillName={skill} rating={ratings[key]} onChange={onChange} />;
            })}
        </div>
    </div>
);

const StepContent = ({ step, role, ratings, onChange }) => {
    if (step === 0) return <>
        <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>Rate your proficiency. <span style={{ color: 'var(--accent)' }}>1 = No experience · 5 = Expert</span></p>
        {(roleSkills[role?.toLowerCase()] || []).map(({ category, skills }) => <SkillCategory key={category} category={category} skills={skills} ratings={ratings} onChange={onChange} />)}
    </>;
    if (step === 1) return <>
        <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>Core skills for all roles. Rate each on <span style={{ color: 'var(--accent)' }}>1–5</span>.</p>
        <SkillCategory category={coreSkills.category} skills={coreSkills.skills} ratings={ratings} onChange={onChange} />
    </>;
    if (step === 2) return <>
        <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>Rate your industry domain experience.</p>
        <SkillCategory category={domainSkills.category} skills={domainSkills.skills} ratings={ratings} onChange={onChange} />
    </>;
    return <>
        <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>Rate your experience with AI tools and agent development.</p>
        <SkillCategory category={aiSkills.category} skills={aiSkills.skills} ratings={ratings} onChange={onChange} />
    </>;
};

const isStepComplete = (step, role, ratings) => {
    const keys = (cat, skills) => skills.map(s => `${cat}::${s}`);
    let required = [];
    if (step === 0) (roleSkills[role?.toLowerCase()] || []).forEach(({ category, skills }) => required.push(...keys(category, skills)));
    else if (step === 1) required = keys(coreSkills.category, coreSkills.skills);
    else if (step === 2) required = keys(domainSkills.category, domainSkills.skills);
    else required = keys(aiSkills.category, aiSkills.skills);
    return required.every(k => ratings[k] >= 1);
};

const SkillsAssessment = ({ user, role, onComplete }) => {
    const [step, setStep] = useState(0);
    const [ratings, setRatings] = useState({});
    const [saving, setSaving] = useState(false);

    const handleRate = (key, val) => setRatings(prev => ({ ...prev, [key]: val }));
    const canProceed = isStepComplete(step, role, ratings);
    const isLastStep = step === STEPS.length - 1;
    const roleLabel = { engineering: 'Engineering', product: 'Product', design: 'Design' }[role] || '';

    const handleNext = async () => {
        if (!canProceed) return;
        if (isLastStep) { setSaving(true); await onComplete(ratings); setSaving(false); }
        else setStep(s => s + 1);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-start py-10 px-6" style={{ background: 'var(--bg-primary)' }}>
            <div className="max-w-2xl w-full">
                <div className="text-center mb-8">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg" style={{ background: 'var(--accent)' }}>
                        <span className="text-lg font-bold" style={{ color: '#262424' }}>E</span>
                    </div>
                    <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Skills Proficiency</h1>
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Help us understand your background, {user?.displayName?.split(' ')[0]}. This takes ~3 minutes.</p>
                </div>

                {/* Step indicators */}
                <div className="flex items-center justify-between mb-8">
                    {STEPS.map((s, i) => (
                        <React.Fragment key={s.id}>
                            <div className="flex flex-col items-center gap-1.5">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                                    style={i < step
                                        ? { background: 'var(--accent)', color: '#262424' }
                                        : i === step
                                            ? { background: 'var(--bg-sidebar)', color: 'var(--text-sidebar)', boxShadow: '0 0 0 4px rgba(236,165,8,0.2)' }
                                            : { background: 'var(--border)', color: 'var(--text-muted)' }
                                    }
                                >
                                    {i < step ? <Check size={14} /> : i + 1}
                                </div>
                                <span className="text-xs font-medium hidden sm:block" style={{ color: i === step ? 'var(--accent)' : 'var(--text-muted)' }}>{s.label}</span>
                            </div>
                            {i < STEPS.length - 1 && (
                                <div className="flex-1 h-0.5 mx-2 rounded-full transition-all" style={{ background: i < step ? 'var(--accent)' : 'var(--border)' }} />
                            )}
                        </React.Fragment>
                    ))}
                </div>

                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Step {step + 1} of {STEPS.length}</span>
                        {step === 0 && (
                            <span className="text-xs font-bold rounded px-2 py-0.5" style={{ color: 'var(--accent)', background: 'rgba(236,165,8,0.1)', border: '1px solid var(--border-accent)' }}>{roleLabel}</span>
                        )}
                    </div>
                    <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{STEPS[step].label}</h2>
                </div>

                <StepContent step={step} role={role} ratings={ratings} onChange={handleRate} />

                <div className="flex items-center justify-between mt-8 pt-6" style={{ borderTop: '1px solid var(--border)' }}>
                    <button onClick={() => setStep(s => s - 1)} disabled={step === 0} className="flex items-center gap-2 text-sm disabled:opacity-30" style={{ color: 'var(--text-subtle)' }}>
                        <ChevronLeft size={16} /> Back
                    </button>
                    <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{Object.keys(ratings).length} skills rated</div>
                    <button
                        onClick={handleNext}
                        disabled={!canProceed || saving}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all"
                        style={canProceed && !saving
                            ? { background: 'var(--bg-sidebar)', color: 'var(--text-sidebar)' }
                            : { background: 'var(--border)', color: 'var(--text-muted)', cursor: 'not-allowed' }
                        }
                    >
                        {saving ? 'Saving…' : isLastStep ? 'Complete →' : 'Next'}
                        {!isLastStep && !saving && <ChevronRight size={16} />}
                    </button>
                </div>

                {!canProceed && (
                    <p className="text-center text-xs mt-3" style={{ color: 'var(--peach)', opacity: 0.8 }}>Rate all skills on this step to continue</p>
                )}
            </div>
        </div>
    );
};

export default SkillsAssessment;
