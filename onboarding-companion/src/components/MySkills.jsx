import React, { useState } from 'react';
import { Pencil, Check, X } from 'lucide-react';
import { roleSkills, coreSkills, domainSkills, aiSkills, SCALE_LABELS } from '../config/skills';

const ratingColor = (r) => {
    const c = { 1: '#F97070', 2: '#f5a04a', 3: '#ECA508', 4: '#d4920a', 5: '#262424' };
    return c[r] || 'var(--border)';
};

const SkillRow = ({ skillName, category, rating, onUpdate }) => {
    const [editing, setEditing] = useState(false);
    const [tempRating, setTempRating] = useState(rating);
    const skillKey = `${category}::${skillName}`;

    const handleSave = () => { onUpdate(skillKey, tempRating); setEditing(false); };
    const handleCancel = () => { setTempRating(rating); setEditing(false); };

    return (
        <div className="flex items-center justify-between py-3 gap-3 group last:border-0" style={{ borderBottom: '1px solid var(--border)' }}>
            <span className="text-sm flex-1 leading-snug" style={{ color: 'var(--text-primary)' }}>{skillName}</span>
            {editing ? (
                <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((v) => (
                        <button key={v} onClick={() => setTempRating(v)}
                            className="w-7 h-7 rounded-lg text-xs font-bold transition-all border-2"
                            style={tempRating === v
                                ? { background: ratingColor(v), color: '#fff', borderColor: 'transparent', transform: 'scale(1.1)' }
                                : { background: 'var(--border)', color: 'var(--text-muted)', borderColor: 'var(--border)' }
                            }
                        >{v}</button>
                    ))}
                    <button onClick={handleSave} className="ml-2 p-1.5 rounded-lg" style={{ background: 'var(--accent)', color: '#262424' }}><Check size={12} /></button>
                    <button onClick={handleCancel} className="p-1.5 rounded-lg" style={{ background: 'var(--border)', color: 'var(--text-muted)' }}><X size={12} /></button>
                </div>
            ) : (
                <div className="flex items-center gap-2">
                    <div className="flex gap-0.5 items-center">
                        {[1, 2, 3, 4, 5].map((v) => (
                            <div key={v} className="h-1.5 w-5 rounded-full transition-all" style={{ background: v <= (rating || 0) ? ratingColor(rating) : 'var(--border)' }} />
                        ))}
                    </div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full border min-w-[80px] text-center"
                        style={{ color: rating ? ratingColor(rating) : 'var(--text-muted)', background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                        {rating ? SCALE_LABELS[rating] : 'Not rated'}
                    </span>
                    <button onClick={() => setEditing(true)} className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg transition-all" style={{ color: 'var(--text-muted)' }}
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                        <Pencil size={12} />
                    </button>
                </div>
            )}
        </div>
    );
};

const CategorySection = ({ category, skills, skillRatings, onUpdate }) => {
    const rated = skills.filter(s => skillRatings[`${category}::${s}`]).length;
    const avg = skills.map(s => skillRatings[`${category}::${s}`] || 0).filter(r => r > 0).reduce((a, b, _, arr) => a + b / arr.length, 0);
    return (
        <div className="rounded-2xl p-5 mb-4" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>{category}</h3>
                <div className="flex items-center gap-3">
                    {avg > 0 && <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Avg: <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{avg.toFixed(1)}</span></span>}
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{rated}/{skills.length} rated</span>
                </div>
            </div>
            {skills.map(skill => <SkillRow key={skill} skillName={skill} category={category} rating={skillRatings[`${category}::${skill}`]} onUpdate={onUpdate} />)}
        </div>
    );
};

const MySkills = ({ role, skillRatings, onUpdate }) => {
    const roleLabel = { engineering: 'Engineering', product: 'Product', design: 'Design' }[role] || '';
    const roleCategories = roleSkills[role?.toLowerCase()] || [];
    const allKeys = [
        ...roleCategories.flatMap(({ category, skills }) => skills.map(s => `${category}::${s}`)),
        ...coreSkills.skills.map(s => `${coreSkills.category}::${s}`),
        ...domainSkills.skills.map(s => `${domainSkills.category}::${s}`),
        ...aiSkills.skills.map(s => `${aiSkills.category}::${s}`),
    ];
    const ratedKeys = allKeys.filter(k => skillRatings[k]);
    const overallAvg = ratedKeys.length > 0 ? (ratedKeys.reduce((sum, k) => sum + skillRatings[k], 0) / ratedKeys.length).toFixed(1) : '-';

    return (
        <div className="p-10 max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>My Skills</h1>
                <p className="mb-6" style={{ color: 'var(--text-muted)' }}>Your proficiency profile — hover any skill to update your rating.</p>
                <div className="grid grid-cols-3 gap-4">
                    {[['Skills Rated', `${ratedKeys.length}/${allKeys.length}`], ['Overall Average', overallAvg], ['Role', roleLabel]].map(([label, value]) => (
                        <div key={label} className="rounded-2xl p-4 text-center" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                            <div className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{value}</div>
                            <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{label}</div>
                        </div>
                    ))}
                </div>
            </div>
            {roleCategories.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>{roleLabel} Skills</h2>
                    {roleCategories.map(({ category, skills }) => <CategorySection key={category} category={category} skills={skills} skillRatings={skillRatings} onUpdate={onUpdate} />)}
                </div>
            )}
            <div className="mb-8">
                <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Core Skills</h2>
                <CategorySection category={coreSkills.category} skills={coreSkills.skills} skillRatings={skillRatings} onUpdate={onUpdate} />
            </div>
            <div className="mb-8">
                <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Domain Experience</h2>
                <CategorySection category={domainSkills.category} skills={domainSkills.skills} skillRatings={skillRatings} onUpdate={onUpdate} />
            </div>
            <div className="mb-8">
                <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>AI / LLM Skills</h2>
                <CategorySection category={aiSkills.category} skills={aiSkills.skills} skillRatings={skillRatings} onUpdate={onUpdate} />
            </div>
        </div>
    );
};

export default MySkills;
