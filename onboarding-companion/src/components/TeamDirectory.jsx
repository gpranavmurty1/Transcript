import React, { useState } from 'react';
import { Mail, Globe, ChevronDown, ChevronUp } from 'lucide-react';
import { crews, practiceHeads, mentors } from '../config/directory';

const SLACK_WORKSPACE = 'https://everest-engineering.slack.com/team';

const regionFlag = (region) => {
    if (region === 'India') return '🇮🇳';
    if (region === 'Australia') return '🇦🇺';
    if (region === 'UAE') return '🇦🇪';
    return '🌍';
};

const SlackIcon = () => (
    <svg width="14" height="14" viewBox="0 0 122.8 122.8" xmlns="http://www.w3.org/2000/svg">
        <path d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9z" fill="currentColor" />
        <path d="M32.3 77.6c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z" fill="currentColor" />
        <path d="M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2z" fill="currentColor" />
        <path d="M45.2 32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z" fill="currentColor" />
        <path d="M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2z" fill="currentColor" />
        <path d="M90.5 45.2c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C64.7 5.8 70.5 0 77.6 0s12.9 5.8 12.9 12.9v32.3z" fill="currentColor" />
        <path d="M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9z" fill="currentColor" />
        <path d="M77.6 90.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z" fill="currentColor" />
    </svg>
);

const ContactCard = ({ person, compact = false }) => {
    const hasContact = person.email || person.slackUsername;
    const isTBD = person.name === 'TBD';

    if (isTBD) {
        return (
            <div className="bg-slate-900/20 border border-slate-800/40 border-dashed rounded-2xl p-5 flex items-center gap-3 opacity-50">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-600 text-xs font-bold shrink-0">
                    TBD
                </div>
                <div>
                    <div className="text-slate-500 text-sm font-medium">{person.role}</div>
                    <div className="flex items-center gap-1 text-xs text-slate-600 mt-0.5">
                        <Globe size={10} />
                        {regionFlag(person.region)} {person.region}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`bg-slate-900/40 border border-slate-800 rounded-2xl transition-all duration-200 hover:border-slate-600 hover:shadow-lg hover:shadow-black/20 group ${compact ? 'p-4' : 'p-5'}`}>
            <div className="flex items-start gap-3 mb-3">
                <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${person.avatar}&sex[]=${person.gender}`}
                    alt={person.name}
                    className={`rounded-full bg-slate-800 shrink-0 ${compact ? 'w-10 h-10' : 'w-12 h-12'}`}
                />
                <div className="flex-1 min-w-0">
                    <div className="font-semibold text-white text-sm leading-tight group-hover:text-blue-400 transition-colors truncate">
                        {person.name}
                    </div>
                    <div className="text-xs text-blue-400 font-medium mt-0.5 truncate">{person.role}</div>
                    <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                        <Globe size={10} />
                        {regionFlag(person.region)} {person.region}
                    </div>
                </div>
            </div>

            {!compact && person.bio && (
                <p className="text-xs text-slate-500 leading-relaxed mb-3 border-t border-slate-800 pt-3">
                    {person.bio}
                </p>
            )}

            {hasContact && (
                <div className="flex gap-2">
                    {person.email && (
                        <a
                            href={`mailto:${person.email}`}
                            className="flex-1 py-1.5 rounded-lg bg-slate-800 hover:bg-blue-600 text-xs font-semibold text-slate-300 hover:text-white transition-all flex items-center justify-center gap-1.5"
                        >
                            <Mail size={12} /> Email
                        </a>
                    )}
                    {person.slackUsername && (
                        <a
                            href={`${SLACK_WORKSPACE}/${person.slackUsername}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-1.5 rounded-lg bg-slate-800 hover:bg-[#4A154B] text-xs font-semibold text-slate-300 hover:text-white transition-all flex items-center justify-center gap-1.5"
                        >
                            <SlackIcon /> Slack
                        </a>
                    )}
                </div>
            )}
        </div>
    );
};

const SectionHeader = ({ title, count, icon }) => (
    <div className="flex items-center gap-3 mb-5">
        <span className="text-xl">{icon}</span>
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <span className="px-2.5 py-0.5 rounded-full bg-blue-600/20 text-blue-400 text-xs font-semibold border border-blue-500/20">
            {count}
        </span>
    </div>
);

const CrewSection = ({ crew }) => {
    const [open, setOpen] = useState(true);
    const activeleads = crew.leads.filter((l) => l.name !== 'TBD');
    const tbdLeads = crew.leads.filter((l) => l.name === 'TBD');

    return (
        <div className="bg-slate-900/20 border border-slate-800 rounded-2xl p-6 mb-4">
            <button
                onClick={() => setOpen((p) => !p)}
                className="w-full flex items-center justify-between mb-1"
            >
                <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold text-white">{crew.name}</h3>
                    <span className="text-xs font-semibold text-slate-500 border border-slate-700 rounded-full px-2 py-0.5">
                        {crew.leads.length} leads
                    </span>
                </div>
                {open ? <ChevronUp size={16} className="text-slate-500" /> : <ChevronDown size={16} className="text-slate-500" />}
            </button>
            <p className="text-sm text-slate-500 mb-4 text-left">{crew.description}</p>

            {open && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeleads.map((lead) => (
                        <ContactCard key={lead.email || lead.name} person={lead} compact />
                    ))}
                    {tbdLeads.map((lead, i) => (
                        <ContactCard key={`tbd-${i}`} person={lead} compact />
                    ))}
                </div>
            )}
        </div>
    );
};

const TeamDirectory = ({ role }) => {
    const practiceHead = practiceHeads[role];
    const roleMentors = mentors[role] || [];

    return (
        <div className="p-10 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-2">Team Directory</h1>
            <p className="text-slate-400 mb-10">Your key contacts for onboarding — mentors, crew leads, and practice heads.</p>

            {/* Practice Head */}
            {practiceHead && (
                <div className="mb-12">
                    <SectionHeader title="Practice Head" count={1} icon="⭐" />
                    <div className="max-w-xs">
                        <ContactCard person={practiceHead} />
                    </div>
                </div>
            )}

            {/* Mentors (role-specific) */}
            {roleMentors.length > 0 && (
                <div className="mb-12">
                    <SectionHeader title="Mentors" count={roleMentors.length} icon="🎓" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {roleMentors.map((m) => (
                            <ContactCard key={m.email} person={m} />
                        ))}
                    </div>
                </div>
            )}

            {/* Crew Leads — all three crews */}
            <div className="mb-12">
                <SectionHeader title="Crew Leads" count={crews.reduce((a, c) => a + c.leads.length, 0)} icon="👥" />
                <p className="text-slate-500 text-sm mb-6 -mt-2">
                    Each crew has two leads — one in India 🇮🇳 and one in Australia 🇦🇺.
                </p>
                {crews.map((crew) => (
                    <CrewSection key={crew.name} crew={crew} />
                ))}
            </div>
        </div>
    );
};

export default TeamDirectory;
