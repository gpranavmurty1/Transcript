// src/config/resources.js
// Curated Notion resources by role.
// Add notionUrl for each resource once the Notion links are confirmed.
// Items with notionUrl: null are shown as "Coming soon".

export const resources = {
    all: [
        {
            id: 'res-security-policy',
            title: 'Security Policy & Compliance Guide',
            description: 'Everything you need to know about security requirements, 2FA, and compliance training.',
            category: 'Compliance',
            notionUrl: 'https://www.notion.so/everestengineering/Security-Awareness-Training-Moodle-4525bd8271fc4e41be4dc2de26e5931c?source=copy_link',
        },
        {
            id: 'res-tools-guide',
            title: 'Tools Overview: Miro, Figma & AntiGravity',
            description: 'Quick-start guides for the three core tools used across all teams.',
            category: 'Tools',
            notionUrl: null,
        },
        {
            id: 'res-slack-guide',
            title: 'Slack Workspace Guide',
            description: 'Key channels to join, Slack etiquette, and how we communicate asynchronously.',
            category: 'Communication',
            notionUrl: null,
        },
        {
            id: 'res-org-overview',
            title: 'Everest Organisation Overview',
            description: 'Company structure, mission, values, and the three service lines: Enterprise, Scaleups, Startups.',
            category: 'Company',
            notionUrl: null,
        },
    ],

    engineering: [
        {
            id: 'eng-tech-stack',
            title: 'Engineering Tech Stack & Standards',
            description: 'Languages, frameworks, tooling, and coding standards used across engineering crews.',
            category: 'Technical',
            notionUrl: null,
        },
        {
            id: 'eng-local-setup',
            title: 'Local Development Environment Setup',
            description: 'Step-by-step guide to getting your dev environment running on Day 1.',
            category: 'Technical',
            notionUrl: null,
        },
        {
            id: 'eng-git-workflow',
            title: 'Git Workflow & PR Process',
            description: 'Branching strategy, PR review process, and CI/CD pipeline overview.',
            category: 'Technical',
            notionUrl: null,
        },
    ],

    product: [
        {
            id: 'pm-discovery-playbook',
            title: 'Product Discovery Playbook',
            description: 'How we run discovery workshops with clients. Templates, frameworks, and examples.',
            category: 'Process',
            notionUrl: null,
        },
        {
            id: 'pm-prd-template',
            title: 'PRD Template',
            description: 'Standard PRD template used across product teams.',
            category: 'Templates',
            notionUrl: null,
        },
        {
            id: 'pm-roadmap-guide',
            title: 'Roadmap & Prioritisation Guide',
            description: 'How we build and communicate roadmaps across Enterprise, Scaleup, and Startup accounts.',
            category: 'Process',
            notionUrl: null,
        },
    ],

    design: [
        {
            id: 'design-system',
            title: 'Everest Design System',
            description: 'Our shared design system: components, tokens, and usage guidelines in Figma.',
            category: 'Design',
            notionUrl: null,
        },
        {
            id: 'design-process',
            title: 'Design Process & Workflow',
            description: 'How design fits into our delivery process, from discovery to handoff.',
            category: 'Process',
            notionUrl: null,
        },
        {
            id: 'design-ux-research',
            title: 'UX Research Templates',
            description: 'Interview guides, usability test scripts, and synthesis frameworks.',
            category: 'Templates',
            notionUrl: null,
        },
    ],
};

// Returns merged resources for a given role
export const getResourcesForRole = (role) => {
    const roleKey = role?.toLowerCase();
    const roleResources = resources[roleKey] || [];
    return [...resources.all, ...roleResources];
};
