import React, { useState } from 'react';
import { FileText, ExternalLink, Search, BookOpen } from 'lucide-react';
import { getResourcesForRole } from '../config/resources';

const categoryIcons = {
    Compliance: '🔒',
    Tools: '🛠️',
    Communication: '💬',
    Company: '🏢',
    Technical: '⚙️',
    Process: '📋',
    Templates: '📄',
    Design: '🎨',
};

const roleLabels = {
    engineering: 'Engineering',
    product: 'Product',
    design: 'Design',
};

const ResourceCard = ({ resource }) => {
    const hasLink = !!resource.notionUrl;

    return (
        <div
            className="group rounded-2xl p-5 transition-all duration-200"
            style={{
                background: hasLink ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.35)',
                border: '1px solid rgba(38,36,36,0.08)',
                opacity: hasLink ? 1 : 0.6,
                cursor: hasLink ? 'pointer' : 'default',
            }}
            onMouseEnter={e => { if (hasLink) e.currentTarget.style.border = '1px solid rgba(236,165,8,0.35)'; }}
            onMouseLeave={e => { e.currentTarget.style.border = '1px solid rgba(38,36,36,0.08)'; }}
        >
            <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                    <span className="text-lg">{categoryIcons[resource.category] || '📁'}</span>
                    <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#9e8e8e' }}>
                        {resource.category}
                    </span>
                </div>
                {hasLink
                    ? <ExternalLink size={14} className="shrink-0 mt-0.5 transition-colors" style={{ color: 'rgba(38,36,36,0.2)' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#ECA508'}
                        onMouseLeave={e => e.currentTarget.style.color = 'rgba(38,36,36,0.2)'}
                    />
                    : <span
                        className="text-[10px] font-semibold rounded px-1.5 py-0.5 shrink-0"
                        style={{ color: '#9e8e8e', border: '1px solid rgba(38,36,36,0.1)' }}
                    >Coming soon</span>
                }
            </div>

            <h3
                className="font-semibold text-base mb-2 leading-snug transition-colors"
                style={{ color: hasLink ? '#262424' : '#9e8e8e' }}
            >
                {resource.title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: '#9e8e8e' }}>{resource.description}</p>

            {hasLink && (
                <a
                    href={resource.notionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold transition-colors"
                    style={{ color: '#ECA508' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#d4920a'}
                    onMouseLeave={e => e.currentTarget.style.color = '#ECA508'}
                >
                    <BookOpen size={12} />
                    Open in Notion
                </a>
            )}
        </div>
    );
};

const Resources = ({ role }) => {
    const [search, setSearch] = useState('');
    const allResources = getResourcesForRole(role);

    const filtered = allResources.filter(
        (r) =>
            r.title.toLowerCase().includes(search.toLowerCase()) ||
            r.description.toLowerCase().includes(search.toLowerCase()) ||
            r.category.toLowerCase().includes(search.toLowerCase())
    );

    // Group by category
    const grouped = filtered.reduce((acc, r) => {
        if (!acc[r.category]) acc[r.category] = [];
        acc[r.category].push(r);
        return acc;
    }, {});

    const roleLabel = roleLabels[role] || 'Your';

    return (
        <div className="p-10 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2" style={{ color: '#262424' }}>Resources</h1>
                <p style={{ color: '#9e8e8e' }}>
                    Curated Notion documents for <span className="font-medium" style={{ color: '#ECA508' }}>{roleLabel}</span> —
                    the only docs you need for your first 2 weeks.
                </p>
            </div>

            {/* Search */}
            <div className="relative mb-10">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#9e8e8e' }} />
                <input
                    type="text"
                    placeholder="Search resources…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full max-w-md rounded-xl pl-10 pr-4 py-2.5 text-sm transition-colors focus:outline-none"
                    style={{
                        background: 'rgba(255,255,255,0.6)',
                        border: '1px solid rgba(38,36,36,0.1)',
                        color: '#262424',
                    }}
                    onFocus={e => e.currentTarget.style.borderColor = '#ECA508'}
                    onBlur={e => e.currentTarget.style.borderColor = 'rgba(38,36,36,0.1)'}
                />
            </div>

            {filtered.length === 0 ? (
                <div className="text-center py-16" style={{ color: '#9e8e8e' }}>
                    <FileText size={40} className="mx-auto mb-3 opacity-40" />
                    <p>No resources match "{search}"</p>
                </div>
            ) : (
                <div className="space-y-10">
                    {Object.entries(grouped).map(([category, items]) => (
                        <div key={category}>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-lg">{categoryIcons[category] || '📁'}</span>
                                <h2 className="text-lg font-bold" style={{ color: '#262424' }}>{category}</h2>
                                <span
                                    className="text-xs font-semibold rounded-full px-2 py-0.5"
                                    style={{ color: '#9e8e8e', border: '1px solid rgba(38,36,36,0.1)' }}
                                >
                                    {items.length}
                                </span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {items.map((r) => <ResourceCard key={r.id} resource={r} />)}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Resources;
