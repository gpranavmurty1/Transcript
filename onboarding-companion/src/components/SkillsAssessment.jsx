import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { roleSkills, coreSkills, domainSkills, aiSkills, SCALE_LABELS } from '../config/skills';

const STEPS = [
    { id: 'role', label: 'Your Skills' },
    { id: 'core', label: 'Core Skills' },
    { id: 'domains', label: 'Domain Experience' },
    { id: 'ai', label: 'AI & LLM' },
];

const ratingColors = {
    1: 'bg-red-500',
    2: 'bg-orange-400',
    3: 'bg-amber-400',
    4: 'bg-blue-500',
    5: 'bg-emerald-500',
};

const SkillRater = ({ skillKey, skillName, rating, onChange }) => {
    return (
        <div className="flex items-center justify-between py-3 border-b border-slate-800/50 last:border-0 gap-4">
            <span className="text-sm text-slate-300 leading-snug flex-1">{skillName}</span>
            <div className="flex items-center gap-1.5 shrink-0">
                {[1, 2, 3, 4, 5].map((val) => (
                    <button
                        key={val}
                        onClick={() => onChange(skillKey, val)}
                        title={SCALE_LABELS[val]}
                        className={`w-8 h-8 rounded-lg text-xs font-bold transition-all duration-150 border-2
              ${rating === val
                                ? `${ratingColors[val]} text-white border-transparent scale-110 shadow-lg`
                                : 'bg-slate-800 text-slate-500 border-slate-700 hover:border-slate-500 hover:text-slate-300'
                            }`}
                    >
                        {val}
                    </button>
                ))}
                {rating && (
                    <span className="text-xs text-slate-500 ml-1 w-20 hidden sm:block">{SCALE_LABELS[rating]}</span>
                )}
            </div>
        </div>
    );
};

const SkillCategory = ({ category, skills, ratings, onChange }) => (
    <div className="mb-6">
        <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3">{category}</h3>
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl px-5">
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
                <p className="text-slate-400 text-sm mb-6">Rate your proficiency for each skill. <span className="text-blue-400">1 = No experience · 5 = Expert</span></p>
                {categories.map(({ category, skills }) => (
                    <SkillCategory key={category} category={category} skills={skills} ratings={ratings} onChange={onChange} />
                ))}
            </div>
        );
    }
    if (step === 1) {
        return (
            <div>
                <p className="text-slate-400 text-sm mb-6">These skills apply to all roles. Rate each on <span className="text-blue-400">1–5</span>.</p>
                <SkillCategory category={coreSkills.category} skills={coreSkills.skills} ratings={ratings} onChange={onChange} />
            </div>
        );
    }
    if (step === 2) {
        return (
            <div>
                <p className="text-slate-400 text-sm mb-6">Rate your industry domain experience from <span className="text-blue-400">1 (none) to 5 (deep expertise)</span>.</p>
                <SkillCategory category={domainSkills.category} skills={domainSkills.skills} ratings={ratings} onChange={onChange} />
            </div>
        );
    }
    if (step === 3) {
        return (
            <div>
                <p className="text-slate-400 text-sm mb-6">Rate your experience with AI tools and agent development on <span className="text-blue-400">1–5</span>.</p>
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
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-start py-10 px-6">
            <div className="max-w-2xl w-full">

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/20">
                        <span className="text-lg font-bold text-white">OC</span>
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-1">Skills Proficiency</h1>
                    <p className="text-slate-400 text-sm">
                        Help us understand your background, {user?.displayName?.split(' ')[0]}. This takes ~3 minutes.
                    </p>
                </div>

                {/* Step progress */}
                <div className="flex items-center justify-between mb-8">
                    {STEPS.map((s, i) => (
                        <React.Fragment key={s.id}>
                            <div className="flex flex-col items-center gap-1.5">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all
                  ${i < step ? 'bg-emerald-500 text-white' :
                                        i === step ? 'bg-blue-600 text-white ring-4 ring-blue-500/20' :
                                            'bg-slate-800 text-slate-500'}`}
                                >
                                    {i < step ? <Check size={14} /> : i + 1}
                                </div>
                                <span className={`text-xs font-medium hidden sm:block ${i === step ? 'text-blue-400' : 'text-slate-600'}`}>
                                    {s.label}
                                </span>
                            </div>
                            {i < STEPS.length - 1 && (
                                <div className={`flex-1 h-0.5 mx-2 rounded-full transition-all ${i < step ? 'bg-emerald-500' : 'bg-slate-800'}`} />
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Step heading */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Step {step + 1} of {STEPS.length}</span>
                        {step === 0 && <span className="text-xs font-bold text-blue-400 border border-blue-500/30 rounded px-2 py-0.5 bg-blue-500/10">{roleLabel}</span>}
                    </div>
                    <h2 className="text-xl font-bold text-white">{STEPS[step].label}</h2>
                </div>

                {/* Step content */}
                <StepContent step={step} role={role} ratings={ratings} onChange={handleRate} />

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-800">
                    <button
                        onClick={() => setStep((s) => s - 1)}
                        disabled={step === 0}
                        className="flex items-center gap-2 text-sm text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft size={16} /> Back
                    </button>

                    <div className="text-xs text-slate-600">
                        {Object.keys(ratings).length} skills rated
                    </div>

                    <button
                        onClick={handleNext}
                        disabled={!canProceed || saving}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all
              ${canProceed && !saving
                                ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:from-blue-500 hover:to-violet-500 shadow-lg shadow-blue-500/20'
                                : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
                    >
                        {saving ? 'Saving…' : isLastStep ? 'Complete →' : 'Next'}
                        {!isLastStep && !saving && <ChevronRight size={16} />}
                    </button>
                </div>

                {!canProceed && (
                    <p className="text-center text-xs text-amber-500/70 mt-3">
                        Rate all skills on this step to continue
                    </p>
                )}
            </div>
        </div>
    );
};

export default SkillsAssessment;
