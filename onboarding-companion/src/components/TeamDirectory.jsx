import React from 'react';
import { Mail, Globe } from 'lucide-react';

const SLACK_WORKSPACE = 'https://everest-engineering.slack.com/team';

const productTeam = [
    {
        name: 'Kshitij Kumar',
        region: 'India',
        role: 'Senior Product Manager',
        email: 'kshitij.kumar@everest.engineering',
        bio: 'Extensive knowledge in Startups, Scaleups, and Enterprise accounts.',
        avatar: 'Kshitij',
        gender: 'male',
        slackUsername: 'kshitij.kumar',
    },
    {
        name: 'Sruthi Suresh Babu',
        region: 'UAE',
        role: 'Senior Product Manager',
        email: 'sruthi@everest.engineering',
        bio: 'Extensive knowledge in Enterprise accounts and Discovery workshops.',
        avatar: 'Sruthi',
        gender: 'female',
        slackUsername: 'shruti.babu',
    },
    {
        name: 'Gopalkrishna Bhat',
        region: 'India',
        role: 'Product Manager',
        email: 'gopalkrishna.b@everest.engineering',
        bio: '8 years industry experience. Excellent with leading small teams.',
        avatar: 'Gopalkrishna',
        gender: 'male',
        slackUsername: 'gopal',
    },
];

const crewLeads = [
    {
        name: 'Ravinder Deolal',
        region: 'India',
        role: 'Enterprise Crew Lead',
        email: 'ravinder.deolal@everest.engineering',
        bio: 'Head of Enterprise portfolio.',
        avatar: 'Ravinder',
        gender: 'male',
        slackUsername: 'rav',
    },
    {
        name: 'Ashok Kannan',
        region: 'India',
        role: 'Scale Up Crew Lead',
        email: 'ashok.gk@everest.engineering',
        bio: 'Head of Scale up portfolio.',
        avatar: 'Ashok',
        gender: 'male',
        slackUsername: 'ashok',
    },
];

const regionFlag = (region) => {
    if (region === 'India') return '🇮🇳';
    if (region === 'UAE') return '🇦🇪';
    return '🌍';
};

// Slack logo SVG
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

const MentorCard = ({ person }) => (
    <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 flex flex-col gap-4 hover:border-slate-600 hover:shadow-lg hover:shadow-black/20 transition-all duration-200 group">
        <div className="flex items-start gap-4">
            <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${person.avatar}&sex[]=${person.gender}`}
                alt={person.name}
                className="w-14 h-14 rounded-full bg-slate-800 shrink-0"
            />
            <div className="flex-1 min-w-0">
                <div className="font-semibold text-lg text-white leading-tight mb-0.5 group-hover:text-blue-400 transition-colors truncate">
                    {person.name}
                </div>
                <div className="text-sm text-blue-400 font-medium mb-1">{person.role}</div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Globe size={12} />
                    <span>{regionFlag(person.region)} {person.region}</span>
                </div>
            </div>
        </div>

        <p className="text-sm text-slate-400 leading-relaxed border-t border-slate-800 pt-4">
            {person.bio}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-2">
            <a
                href={`mailto:${person.email}`}
                className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-blue-600 text-xs font-semibold text-slate-300 hover:text-white transition-all duration-200 flex items-center justify-center gap-2"
            >
                <Mail size={14} />
                Email
            </a>
            <a
                href={`${SLACK_WORKSPACE}/${person.slackUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-[#4A154B] text-xs font-semibold text-slate-300 hover:text-white transition-all duration-200 flex items-center justify-center gap-2"
            >
                <SlackIcon />
                Slack
            </a>
        </div>
    </div>
);

const SectionHeader = ({ title, count }) => (
    <div className="flex items-center gap-3 mb-6">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <span className="px-2.5 py-0.5 rounded-full bg-blue-600/20 text-blue-400 text-xs font-semibold border border-blue-500/20">
            {count}
        </span>
    </div>
);

const TeamDirectory = () => {
    return (
        <div className="p-10 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-2">Mentor Directory</h1>
            <p className="text-slate-400 mb-10">Your go-to people for guidance throughout your onboarding journey.</p>

            {/* Product Team */}
            <div className="mb-12">
                <SectionHeader title="Product Team" count={productTeam.length} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {productTeam.map((person) => (
                        <MentorCard key={person.email} person={person} />
                    ))}
                </div>
            </div>

            {/* Crew Leads */}
            <div>
                <SectionHeader title="Crew Leads" count={crewLeads.length} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {crewLeads.map((person) => (
                        <MentorCard key={person.email} person={person} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeamDirectory;
