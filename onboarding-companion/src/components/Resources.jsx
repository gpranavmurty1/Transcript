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
        <div className={`group bg-slate-900/40 border rounded-2xl p-5 transition-all duration-200
      ${hasLink
                ? 'border-slate-800 hover:border-slate-600 hover:shadow-lg hover:shadow-black/20 cursor-pointer'
                : 'border-slate-800/50 opacity-60'
            }`}
        >
            <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                    <span className="text-lg">{categoryIcons[resource.category] || '📁'}</span>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        {resource.category}
                    </span>
                </div>
                {hasLink
                    ? <ExternalLink size={14} className="text-slate-600 group-hover:text-blue-400 transition-colors shrink-0 mt-0.5" />
                    : <span className="text-[10px] font-semibold text-slate-600 border border-slate-700 rounded px-1.5 py-0.5 shrink-0">Coming soon</span>
                }
            </div>

            <h3 className={`font-semibold text-base mb-2 leading-snug transition-colors
        ${hasLink ? 'text-white group-hover:text-blue-400' : 'text-slate-500'}`}>
                {resource.title}
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">{resource.description}</p>

            {hasLink && (
                <a
                    href={resource.notionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
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
                <h1 className="text-3xl font-bold text-white mb-2">Resources</h1>
                <p className="text-slate-400">
                    Curated Notion documents for <span className="text-blue-400 font-medium">{roleLabel}</span> —
                    the only docs you need for your first 2 weeks.
                </p>
            </div>

            {/* Search */}
            <div className="relative mb-10">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                    type="text"
                    placeholder="Search resources…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full max-w-md bg-slate-900/50 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                />
            </div>

            {filtered.length === 0 ? (
                <div className="text-center py-16 text-slate-500">
                    <FileText size={40} className="mx-auto mb-3 opacity-40" />
                    <p>No resources match "{search}"</p>
                </div>
            ) : (
                <div className="space-y-10">
                    {Object.entries(grouped).map(([category, items]) => (
                        <div key={category}>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-lg">{categoryIcons[category] || '📁'}</span>
                                <h2 className="text-lg font-bold text-white">{category}</h2>
                                <span className="text-xs font-semibold text-slate-500 border border-slate-700 rounded-full px-2 py-0.5">{items.length}</span>
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
