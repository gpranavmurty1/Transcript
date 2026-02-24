import React, { useState, useMemo } from 'react';
import { Search, Users, Slack } from 'lucide-react';
import { getAllSkillKeys } from '../config/skills';
import { useAllUsersSkills } from '../hooks/useAllUsersSkills';
import { SCALE_LABELS } from '../config/skills';

const SLACK_WORKSPACE = 'https://everest-engineering.slack.com/team';

const ROLE_DISPLAY = {
    product: 'Product Manager',
    design: 'Product Designer',
    engineering: 'Software Craftsperson',
};

// The three tiers shown in the directory
const TIERS = [
    { label: 'Expert', rating: 5, icon: '⭐', accentVar: '--accent' },
    { label: 'Proficient', rating: 4, icon: '🔷', accentVar: '--peach' },
    { label: 'Familiar', rating: 3, icon: '🔹', accentVar: '--text-muted' },
];

const PersonCard = ({ person }) => {
    const slackUrl = person.slackUsername
        ? `${SLACK_WORKSPACE}/${person.slackUsername}`
        : `https://everest-engineering.slack.com`;

    return (
        <div
            className="flex items-center justify-between p-4 rounded-2xl transition-all"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
            onMouseEnter={e => e.currentTarget.style.border = '1px solid var(--border-accent)'}
            onMouseLeave={e => e.currentTarget.style.border = '1px solid var(--border)'}
        >
            <div className="flex items-center gap-3">
                <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${person.name}`}
                    alt={person.name}
                    className="w-10 h-10 rounded-full shrink-0"
                    style={{ background: 'var(--border)' }}
                />
                <div>
                    <div className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                        {person.name}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                        {ROLE_DISPLAY[person.role] || person.role}
                    </div>
                </div>
            </div>
            <a
                href={slackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all hover:scale-105"
                style={{ background: 'rgba(236,165,8,0.1)', color: 'var(--accent)' }}
            >
                <Slack size={13} /> Message
            </a>
        </div>
    );
};

const TierSection = ({ tier, people }) => {
    if (people.length === 0) return null;

    return (
        <section>
            <div className="flex items-center gap-2 mb-3">
                <span className="text-base">{tier.icon}</span>
                <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                    {tier.label}
                </h3>
                <span
                    className="text-xs px-2 py-0.5 rounded-full font-semibold ml-1"
                    style={{ background: 'rgba(236,165,8,0.1)', color: 'var(--accent)' }}
                >
                    {people.length}
                </span>
            </div>
            <div className="space-y-2">
                {people.map(person => <PersonCard key={person.uid} person={person} />)}
            </div>
        </section>
    );
};

const SkillDirectory = () => {
    const [search, setSearch] = useState('');
    const [selectedKey, setSelectedKey] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);

    const { allUsers, loading } = useAllUsersSkills();
    const allSkillKeys = useMemo(() => getAllSkillKeys(), []);

    // Filter dropdown options by search term
    const filteredSkills = useMemo(() =>
        search.length > 0
            ? allSkillKeys.filter(s => s.label.toLowerCase().includes(search.toLowerCase()))
            : allSkillKeys,
        [search, allSkillKeys]
    );

    // Group users by tier for the selected skill
    const tierResults = useMemo(() => {
        if (!selectedKey) return null;
        const result = {};
        TIERS.forEach(tier => {
            result[tier.rating] = allUsers.filter(
                u => (u.skills?.[selectedKey] ?? 0) === tier.rating
            );
        });
        return result;
    }, [selectedKey, allUsers]);

    const selectedSkill = allSkillKeys.find(s => s.key === selectedKey);
    const totalResults = tierResults
        ? Object.values(tierResults).reduce((sum, arr) => sum + arr.length, 0)
        : 0;

    const handleSelect = (key, label) => {
        setSelectedKey(key);
        setSearch(label);
        setShowDropdown(false);
    };

    return (
        <div className="p-10 max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <header>
                <h1 className="text-3xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                    Skill Finder
                </h1>
                <p className="mt-1" style={{ color: 'var(--text-muted)' }}>
                    Search for a skill to find colleagues by proficiency level.
                </p>
            </header>

            {/* Search Input */}
            <div className="relative">
                <div
                    className="flex items-center gap-3 rounded-2xl px-4 py-3"
                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                >
                    <Search size={18} style={{ color: 'var(--text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search skills — e.g. Facilitation, React, Figma…"
                        value={search}
                        onChange={e => { setSearch(e.target.value); setShowDropdown(true); setSelectedKey(null); }}
                        onFocus={() => setShowDropdown(true)}
                        className="flex-1 bg-transparent outline-none text-sm"
                        style={{ color: 'var(--text-primary)' }}
                    />
                    {search && (
                        <button
                            onClick={() => { setSearch(''); setSelectedKey(null); setShowDropdown(false); }}
                            className="text-xs font-medium px-2 py-1 rounded-lg"
                            style={{ color: 'var(--text-muted)', background: 'var(--border)' }}
                        >
                            Clear
                        </button>
                    )}
                </div>

                {/* Dropdown */}
                {showDropdown && filteredSkills.length > 0 && (
                    <div
                        className="absolute z-20 w-full mt-1 rounded-2xl shadow-xl overflow-hidden max-h-72 overflow-y-auto"
                        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                    >
                        {/* Group by category */}
                        {Array.from(new Set(filteredSkills.map(s => s.category))).map(cat => (
                            <div key={cat}>
                                <div className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest"
                                    style={{ color: 'var(--text-muted)', background: 'var(--bg-primary)' }}>
                                    {cat}
                                </div>
                                {filteredSkills.filter(s => s.category === cat).map(skill => (
                                    <button
                                        key={skill.key}
                                        onClick={() => handleSelect(skill.key, skill.label)}
                                        className="w-full text-left px-4 py-2.5 text-sm transition-colors"
                                        style={{ color: 'var(--text-primary)' }}
                                        onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-card-hover)'}
                                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                    >
                                        {skill.label}
                                    </button>
                                ))}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Click away to close dropdown */}
            {showDropdown && (
                <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)} />
            )}

            {/* Results */}
            {loading && (
                <div className="text-center py-16" style={{ color: 'var(--text-muted)' }}>
                    <div className="animate-spin w-8 h-8 border-2 border-current border-t-transparent rounded-full mx-auto mb-3"
                        style={{ borderColor: 'var(--accent)', borderTopColor: 'transparent' }} />
                    Loading team skills…
                </div>
            )}

            {!loading && !selectedKey && (
                <div className="text-center py-20 rounded-2xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                    <Users size={40} className="mx-auto mb-4" style={{ color: 'var(--text-muted)' }} />
                    <p className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>Find the right person</p>
                    <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                        Search for a skill above to see who's an Expert, Proficient, or Familiar.
                    </p>
                </div>
            )}

            {!loading && selectedKey && totalResults === 0 && (
                <div className="text-center py-20 rounded-2xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                    <Search size={40} className="mx-auto mb-4" style={{ color: 'var(--text-muted)' }} />
                    <p className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>No results for "{selectedSkill?.label}"</p>
                    <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                        No team members have rated themselves Familiar or above for this skill yet.
                    </p>
                </div>
            )}

            {!loading && selectedKey && totalResults > 0 && (
                <div className="space-y-8">
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                            {selectedSkill?.label}
                        </h2>
                        <span className="text-sm px-2 py-0.5 rounded-full" style={{ background: 'var(--border)', color: 'var(--text-muted)' }}>
                            {selectedSkill?.category}
                        </span>
                        <span className="text-sm ml-auto" style={{ color: 'var(--text-muted)' }}>
                            {totalResults} {totalResults === 1 ? 'person' : 'people'} found
                        </span>
                    </div>
                    {TIERS.map(tier => (
                        <TierSection
                            key={tier.rating}
                            tier={tier}
                            people={tierResults[tier.rating] || []}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SkillDirectory;
