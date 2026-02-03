import React from 'react';
import { FileText, Database, Code2, Book, ExternalLink } from 'lucide-react';

const Resources = () => {
    const categories = [
        {
            title: 'Core Architecture',
            icon: Database,
            items: [
                { name: 'Auth Service Documentation', tag: 'Must Read' },
                { name: 'Database Schema V4', tag: 'Reference' },
                { name: 'API Gateway Config', tag: 'Technical' }
            ]
        },
        {
            title: 'Development Guides',
            icon: Code2,
            items: [
                { name: 'Local Environment Setup V2', tag: 'Updated' },
                { name: 'Coding Standards & Linting', tag: 'Guide' },
                { name: 'Testing Strategy (Unit/E2E)', tag: 'Guide' }
            ]
        },
        {
            title: 'Company Handbook',
            icon: Book,
            items: [
                { name: 'Expense Policy', tag: 'HR' },
                { name: 'Holiday Schedule 2026', tag: 'General' }
            ]
        }
    ];

    return (
        <div className="p-10 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-2">Resources</h1>
            <p className="text-slate-400 mb-10">Curated documentation specific to your role.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((cat, idx) => (
                    <div key={idx} className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
                                <cat.icon size={24} />
                            </div>
                            <h3 className="font-semibold text-lg text-slate-200">{cat.title}</h3>
                        </div>
                        <div className="space-y-3">
                            {cat.items.map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-800/50 cursor-pointer group transition-colors">
                                    <div className="flex items-center gap-3">
                                        <FileText size={16} className="text-slate-500 group-hover:text-slate-300" />
                                        <span className="text-sm text-slate-300 group-hover:text-white">{item.name}</span>
                                    </div>
                                    <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 text-slate-500" />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Resources;
