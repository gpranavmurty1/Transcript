import React, { useState } from 'react';
import { FileText, ExternalLink, Search, BookOpen } from 'lucide-react';
import { getResourcesForRole } from '../config/resources';

const categoryIcons = {
    Compliance: '🔒', Tools: '🛠️', Communication: '💬',
    Company: '🏢', Technical: '⚙️', Process: '📋',
    Templates: '📄', Design: '🎨',
};

const ResourceCard = ({ resource }) => {
    const hasLink = !!resource.notionUrl;
    return (
        <div
            className="group rounded-2xl p-5 transition-all duration-200"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', opacity: hasLink ? 1 : 0.55 }}
            onMouseEnter={e => { if (hasLink) e.currentTarget.style.border = '1px solid var(--border-accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.border = '1px solid var(--border)'; }}
        >
            <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                    <span className="text-lg">{categoryIcons[resource.category] || '📁'}</span>
                    <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                        {resource.category}
                    </span>
                </div>
                {!hasLink && (
                    <span className="text-[10px] font-semibold rounded px-1.5 py-0.5 shrink-0"
                        style={{ color: 'var(--text-muted)', border: '1px solid var(--border)' }}>
                        Coming soon
                    </span>
                )}
            </div>

            <h3 className="font-semibold text-base mb-2 leading-snug" style={{ color: hasLink ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                {resource.title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{resource.description}</p>

            {hasLink && (
                <a href={resource.notionUrl} target="_blank" rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold transition-colors"
                    style={{ color: 'var(--accent)' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-dark)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--accent)'}
                >
                    <BookOpen size={12} /> Open in Notion
                </a>
            )}
        </div>
    );
};

const Resources = ({ role }) => {
    const [search, setSearch] = useState('');
    const allResources = getResourcesForRole(role);
    const filtered = allResources.filter(r =>
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.description.toLowerCase().includes(search.toLowerCase()) ||
        r.category.toLowerCase().includes(search.toLowerCase())
    );
    const grouped = filtered.reduce((acc, r) => {
        if (!acc[r.category]) acc[r.category] = [];
        acc[r.category].push(r);
        return acc;
    }, {});
    const roleLabel = { engineering: 'Engineering', product: 'Product', design: 'Design' }[role] || 'Your';

    return (
        <div className="p-10 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Resources</h1>
                <p style={{ color: 'var(--text-muted)' }}>
                    Curated Notion documents for <span className="font-medium" style={{ color: 'var(--accent)' }}>{roleLabel}</span> — the only docs you need for your first 2 weeks.
                </p>
            </div>

            {/* Search */}
            <div className="relative mb-10">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
                <input
                    type="text"
                    placeholder="Search resources…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full max-w-md rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none"
                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                    onFocus={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
                />
            </div>

            {filtered.length === 0 ? (
                <div className="text-center py-16" style={{ color: 'var(--text-muted)' }}>
                    <FileText size={40} className="mx-auto mb-3 opacity-40" />
                    <p>No resources match "{search}"</p>
                </div>
            ) : (
                <div className="space-y-10">
                    {Object.entries(grouped).map(([category, items]) => (
                        <div key={category}>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-lg">{categoryIcons[category] || '📁'}</span>
                                <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{category}</h2>
                                <span className="text-xs font-semibold rounded-full px-2 py-0.5"
                                    style={{ color: 'var(--text-muted)', border: '1px solid var(--border)' }}>{items.length}</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {items.map(r => <ResourceCard key={r.id} resource={r} />)}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Resources;
