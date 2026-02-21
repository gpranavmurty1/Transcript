import React, { useState } from 'react';
import { Pencil, Check, X } from 'lucide-react';
import { roleSkills, coreSkills, domainSkills, aiSkills, SCALE_LABELS } from '../config/skills';

const ratingColors = {
    0: 'bg-slate-800',
    1: 'bg-red-500',
    2: 'bg-orange-400',
    3: 'bg-amber-400',
    4: 'bg-blue-500',
    5: 'bg-emerald-500',
};

const ratingBg = {
    0: 'border-slate-700 text-slate-500',
    1: 'border-red-500/30 text-red-400 bg-red-500/5',
    2: 'border-orange-400/30 text-orange-400 bg-orange-400/5',
    3: 'border-amber-400/30 text-amber-400 bg-amber-400/5',
    4: 'border-blue-500/30 text-blue-400 bg-blue-500/5',
    5: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5',
};

const SkillRow = ({ skillName, category, rating, onUpdate }) => {
    const [editing, setEditing] = useState(false);
    const [tempRating, setTempRating] = useState(rating);
    const skillKey = `${category}::${skillName}`;

    const handleSave = () => {
        onUpdate(skillKey, tempRating);
        setEditing(false);
    };

    const handleCancel = () => {
        setTempRating(rating);
        setEditing(false);
    };

    return (
        <div className="flex items-center justify-between py-3 border-b border-slate-800/40 last:border-0 gap-3 group">
            <span className="text-sm text-slate-300 flex-1 leading-snug">{skillName}</span>

            {editing ? (
                <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((v) => (
                        <button
                            key={v}
                            onClick={() => setTempRating(v)}
                            className={`w-7 h-7 rounded-lg text-xs font-bold transition-all border-2
                ${tempRating === v
                                    ? `${ratingColors[v]} text-white border-transparent scale-110`
                                    : 'bg-slate-800 text-slate-500 border-slate-700 hover:border-slate-500'
                                }`}
                        >
                            {v}
                        </button>
                    ))}
                    <button onClick={handleSave} className="ml-2 p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors">
                        <Check size={12} />
                    </button>
                    <button onClick={handleCancel} className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-400 transition-colors">
                        <X size={12} />
                    </button>
                </div>
            ) : (
                <div className="flex items-center gap-2">
                    {/* Progress bar */}
                    <div className="flex gap-0.5 items-center">
                        {[1, 2, 3, 4, 5].map((v) => (
                            <div
                                key={v}
                                className={`h-1.5 w-5 rounded-full transition-all ${v <= (rating || 0) ? ratingColors[rating || 0] : 'bg-slate-800'}`}
                            />
                        ))}
                    </div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border min-w-[80px] text-center ${ratingBg[rating || 0]}`}>
                        {rating ? SCALE_LABELS[rating] : 'Not rated'}
                    </span>
                    <button
                        onClick={() => setEditing(true)}
                        className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-slate-300 transition-all"
                    >
                        <Pencil size={12} />
                    </button>
                </div>
            )}
        </div>
    );
};

const CategorySection = ({ category, skills, skillRatings, onUpdate }) => {
    const rated = skills.filter((s) => skillRatings[`${category}::${s}`]).length;
    const avg = skills
        .map((s) => skillRatings[`${category}::${s}`] || 0)
        .filter((r) => r > 0)
        .reduce((a, b, _, arr) => a + b / arr.length, 0);

    return (
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 mb-4">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-blue-400 uppercase tracking-widest">{category}</h3>
                <div className="flex items-center gap-3">
                    {avg > 0 && (
                        <span className="text-xs text-slate-500">
                            Avg: <span className="text-white font-semibold">{avg.toFixed(1)}</span>
                        </span>
                    )}
                    <span className="text-xs text-slate-500">{rated}/{skills.length} rated</span>
                </div>
            </div>
            {skills.map((skill) => (
                <SkillRow
                    key={skill}
                    skillName={skill}
                    category={category}
                    rating={skillRatings[`${category}::${skill}`]}
                    onUpdate={onUpdate}
                />
            ))}
        </div>
    );
};

const MySkills = ({ role, skillRatings, onUpdate }) => {
    const roleLabel = { engineering: 'Engineering', product: 'Product', design: 'Design' }[role] || '';
    const roleCategories = roleSkills[role?.toLowerCase()] || [];

    // Overall stats
    const allKeys = [
        ...roleCategories.flatMap(({ category, skills }) => skills.map((s) => `${category}::${s}`)),
        ...coreSkills.skills.map((s) => `${coreSkills.category}::${s}`),
        ...domainSkills.skills.map((s) => `${domainSkills.category}::${s}`),
        ...aiSkills.skills.map((s) => `${aiSkills.category}::${s}`),
    ];
    const ratedKeys = allKeys.filter((k) => skillRatings[k]);
    const overallAvg = ratedKeys.length > 0
        ? (ratedKeys.reduce((sum, k) => sum + skillRatings[k], 0) / ratedKeys.length).toFixed(1)
        : '-';

    return (
        <div className="p-10 max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">My Skills</h1>
                <p className="text-slate-400 mb-6">Your proficiency profile — hover any skill to update your rating.</p>

                {/* Summary stats */}
                <div className="grid grid-cols-3 gap-4">
                    {[
                        { label: 'Skills Rated', value: `${ratedKeys.length}/${allKeys.length}` },
                        { label: 'Overall Average', value: overallAvg },
                        { label: 'Role', value: roleLabel },
                    ].map(({ label, value }) => (
                        <div key={label} className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4 text-center">
                            <div className="text-2xl font-bold text-white mb-1">{value}</div>
                            <div className="text-xs text-slate-500 uppercase tracking-wider">{label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Role-specific skills */}
            {roleCategories.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-lg font-bold text-white mb-4">
                        {roleLabel} Skills
                    </h2>
                    {roleCategories.map(({ category, skills }) => (
                        <CategorySection
                            key={category}
                            category={category}
                            skills={skills}
                            skillRatings={skillRatings}
                            onUpdate={onUpdate}
                        />
                    ))}
                </div>
            )}

            {/* Core skills */}
            <div className="mb-8">
                <h2 className="text-lg font-bold text-white mb-4">Core Skills</h2>
                <CategorySection
                    category={coreSkills.category}
                    skills={coreSkills.skills}
                    skillRatings={skillRatings}
                    onUpdate={onUpdate}
                />
            </div>

            {/* Domain experience */}
            <div className="mb-8">
                <h2 className="text-lg font-bold text-white mb-4">Domain Experience</h2>
                <CategorySection
                    category={domainSkills.category}
                    skills={domainSkills.skills}
                    skillRatings={skillRatings}
                    onUpdate={onUpdate}
                />
            </div>

            {/* AI / LLM skills */}
            <div className="mb-8">
                <h2 className="text-lg font-bold text-white mb-4">AI / LLM Skills</h2>
                <CategorySection
                    category={aiSkills.category}
                    skills={aiSkills.skills}
                    skillRatings={skillRatings}
                    onUpdate={onUpdate}
                />
            </div>
        </div>
    );
};

export default MySkills;
