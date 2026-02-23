import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { roleSkills, coreSkills, domainSkills, aiSkills, SCALE_LABELS } from '../config/skills';

const STEPS = [
    { id: 'role', label: 'Your Skills' },
    { id: 'core', label: 'Core Skills' },
    { id: 'domains', label: 'Domain Experience' },
    { id: 'ai', label: 'AI & LLM' },
];

// Maps 1–5 rating to Everest brand colors
const ratingColors = {
    1: '#F97070',
    2: '#f5a04a',
    3: '#ECA508',
    4: '#d4920a',
    5: '#262424',
};

const SkillRater = ({ skillKey, skillName, rating, onChange }) => {
    return (
        <div
            className="flex items-center justify-between py-3 gap-4 last:border-0"
            style={{ borderBottom: '1px solid rgba(38,36,36,0.07)' }}
        >
            <span className="text-sm leading-snug flex-1" style={{ color: '#262424' }}>{skillName}</span>
            <div className="flex items-center gap-1.5 shrink-0">
                {[1, 2, 3, 4, 5].map((val) => (
                    <button
                        key={val}
                        onClick={() => onChange(skillKey, val)}
                        title={SCALE_LABELS[val]}
                        className="w-8 h-8 rounded-lg text-xs font-bold transition-all duration-150 border-2"
                        style={rating === val
                            ? { background: ratingColors[val], color: '#fff', borderColor: 'transparent', transform: 'scale(1.1)' }
                            : { background: 'rgba(38,36,36,0.05)', color: '#9e8e8e', borderColor: 'rgba(38,36,36,0.1)' }
                        }
                    >
                        {val}
                    </button>
                ))}
                {rating && (
                    <span className="text-xs ml-1 w-20 hidden sm:block" style={{ color: '#9e8e8e' }}>{SCALE_LABELS[rating]}</span>
                )}
            </div>
        </div>
    );
};

const SkillCategory = ({ category, skills, ratings, onChange }) => (
    <div className="mb-6">
        <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#ECA508' }}>{category}</h3>
        <div
            className="rounded-2xl px-5"
            style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(38,36,36,0.07)' }}
        >
            {skills.map((skill) => {
                const key = `${category}::${skill}`;
                return (
                    <SkillRater
                        key={key}
                        skillKey={key}
                        skillName={skill}
                        rating={ratings[key]}
                        onChange={onChange}
                    />
                );
            })}
        </div>
    </div>
);

const StepContent = ({ step, role, ratings, onChange }) => {
    if (step === 0) {
        const categories = roleSkills[role?.toLowerCase()] || [];
        return (
            <div>
                <p className="text-sm mb-6" style={{ color: '#9e8e8e' }}>
                    Rate your proficiency for each skill. <span style={{ color: '#ECA508' }}>1 = No experience · 5 = Expert</span>
                </p>
                {categories.map(({ category, skills }) => (
                    <SkillCategory key={category} category={category} skills={skills} ratings={ratings} onChange={onChange} />
                ))}
            </div>
        );
    }
    if (step === 1) {
        return (
            <div>
                <p className="text-sm mb-6" style={{ color: '#9e8e8e' }}>
                    These skills apply to all roles. Rate each on <span style={{ color: '#ECA508' }}>1–5</span>.
                </p>
                <SkillCategory category={coreSkills.category} skills={coreSkills.skills} ratings={ratings} onChange={onChange} />
            </div>
        );
    }
    if (step === 2) {
        return (
            <div>
                <p className="text-sm mb-6" style={{ color: '#9e8e8e' }}>
                    Rate your industry domain experience from <span style={{ color: '#ECA508' }}>1 (none) to 5 (deep expertise)</span>.
                </p>
                <SkillCategory category={domainSkills.category} skills={domainSkills.skills} ratings={ratings} onChange={onChange} />
            </div>
        );
    }
    if (step === 3) {
        return (
            <div>
                <p className="text-sm mb-6" style={{ color: '#9e8e8e' }}>
                    Rate your experience with AI tools and agent development on <span style={{ color: '#ECA508' }}>1–5</span>.
                </p>
                <SkillCategory category={aiSkills.category} skills={aiSkills.skills} ratings={ratings} onChange={onChange} />
            </div>
        );
    }
    return null;
};

const isStepComplete = (step, role, ratings) => {
    const getKeys = (category, skills) => skills.map((s) => `${category}::${s}`);
    let requiredKeys = [];

    if (step === 0) {
        const categories = roleSkills[role?.toLowerCase()] || [];
        categories.forEach(({ category, skills }) => {
            requiredKeys.push(...getKeys(category, skills));
        });
    } else if (step === 1) {
        requiredKeys = getKeys(coreSkills.category, coreSkills.skills);
    } else if (step === 2) {
        requiredKeys = getKeys(domainSkills.category, domainSkills.skills);
    } else if (step === 3) {
        requiredKeys = getKeys(aiSkills.category, aiSkills.skills);
    }

    return requiredKeys.every((k) => ratings[k] >= 1);
};

const SkillsAssessment = ({ user, role, onComplete }) => {
    const [step, setStep] = useState(0);
    const [ratings, setRatings] = useState({});
    const [saving, setSaving] = useState(false);

    const handleRate = (skillKey, value) => {
        setRatings((prev) => ({ ...prev, [skillKey]: value }));
    };

    const canProceed = isStepComplete(step, role, ratings);
    const isLastStep = step === STEPS.length - 1;
    const roleLabel = { engineering: 'Engineering', product: 'Product', design: 'Design' }[role] || '';

    const handleNext = async () => {
        if (!canProceed) return;
        if (isLastStep) {
            setSaving(true);
            await onComplete(ratings);
            setSaving(false);
        } else {
            setStep((s) => s + 1);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-start py-10 px-6" style={{ background: '#F9EFDF' }}>
            <div className="max-w-2xl w-full">

                {/* Header */}
                <div className="text-center mb-8">
                    <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                        style={{ background: '#ECA508' }}
                    >
                        <span className="text-lg font-bold" style={{ color: '#262424' }}>E</span>
                    </div>
                    <h1 className="text-2xl font-bold mb-1" style={{ color: '#262424' }}>Skills Proficiency</h1>
                    <p className="text-sm" style={{ color: '#9e8e8e' }}>
                        Help us understand your background, {user?.displayName?.split(' ')[0]}. This takes ~3 minutes.
                    </p>
                </div>

                {/* Step progress */}
                <div className="flex items-center justify-between mb-8">
                    {STEPS.map((s, i) => (
                        <React.Fragment key={s.id}>
                            <div className="flex flex-col items-center gap-1.5">
                                <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                                    style={i < step
                                        ? { background: '#ECA508', color: '#262424' }
                                        : i === step
                                            ? { background: '#262424', color: '#F9EFDF', boxShadow: '0 0 0 4px rgba(236,165,8,0.2)' }
                                            : { background: 'rgba(38,36,36,0.08)', color: '#9e8e8e' }
                                    }
                                >
                                    {i < step ? <Check size={14} /> : i + 1}
                                </div>
                                <span
                                    className="text-xs font-medium hidden sm:block"
                                    style={{ color: i === step ? '#ECA508' : 'rgba(38,36,36,0.3)' }}
                                >
                                    {s.label}
                                </span>
                            </div>
                            {i < STEPS.length - 1 && (
                                <div
                                    className="flex-1 h-0.5 mx-2 rounded-full transition-all"
                                    style={{ background: i < step ? '#ECA508' : 'rgba(38,36,36,0.1)' }}
                                />
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Step heading */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#9e8e8e' }}>Step {step + 1} of {STEPS.length}</span>
                        {step === 0 && (
                            <span
                                className="text-xs font-bold rounded px-2 py-0.5"
                                style={{ color: '#ECA508', background: 'rgba(236,165,8,0.1)', border: '1px solid rgba(236,165,8,0.3)' }}
                            >
                                {roleLabel}
                            </span>
                        )}
                    </div>
                    <h2 className="text-xl font-bold" style={{ color: '#262424' }}>{STEPS[step].label}</h2>
                </div>

                {/* Step content */}
                <StepContent step={step} role={role} ratings={ratings} onChange={handleRate} />

                {/* Navigation */}
                <div
                    className="flex items-center justify-between mt-8 pt-6"
                    style={{ borderTop: '1px solid rgba(38,36,36,0.08)' }}
                >
                    <button
                        onClick={() => setStep((s) => s - 1)}
                        disabled={step === 0}
                        className="flex items-center gap-2 text-sm transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        style={{ color: '#6b5e5e' }}
                    >
                        <ChevronLeft size={16} /> Back
                    </button>

                    <div className="text-xs" style={{ color: '#9e8e8e' }}>
                        {Object.keys(ratings).length} skills rated
                    </div>

                    <button
                        onClick={handleNext}
                        disabled={!canProceed || saving}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all"
                        style={canProceed && !saving
                            ? { background: '#262424', color: '#F9EFDF', boxShadow: '0 4px 16px rgba(38,36,36,0.15)' }
                            : { background: 'rgba(38,36,36,0.08)', color: 'rgba(38,36,36,0.3)', cursor: 'not-allowed' }
                        }
                    >
                        {saving ? 'Saving…' : isLastStep ? 'Complete →' : 'Next'}
                        {!isLastStep && !saving && <ChevronRight size={16} />}
                    </button>
                </div>

                {!canProceed && (
                    <p className="text-center text-xs mt-3" style={{ color: '#F97070', opacity: 0.8 }}>
                        Rate all skills on this step to continue
                    </p>
                )}
            </div>
        </div>
    );
};

export default SkillsAssessment;
