// src/config/milestones.js
// All onboarding milestones by role. 'all' milestones appear for every role.
// role-specific keys: 'engineering', 'product', 'design'

export const milestones = {
    all: [
        {
            id: 'setup-email',
            week: 1,
            title: 'Set up Everest email',
            description: 'Sign in with your Everest email address and reset your temporary password immediately.',
            notionLink: null,
            category: 'Setup',
        },
        {
            id: 'enable-2fa',
            week: 1,
            title: 'Enable 2-Factor Authentication',
            description: 'Secure your Everest account with 2FA before using any company tools.',
            notionLink: null,
            category: 'Setup',
        },
        {
            id: 'join-slack',
            week: 1,
            title: 'Join the Everest Slack community',
            description: 'Once your email is activated, you will see an invite to join our Slack channel. Accept it and introduce yourself!',
            notionLink: null,
            category: 'Communication',
        },
        {
            id: 'setup-zoom',
            week: 1,
            title: 'Set up Zoom',
            description: 'For large meetings like monthly town halls, we use Zoom. Log in with your Everest email and update your profile picture.',
            notionLink: null,
            category: 'Communication',
        },
        {
            id: 'security-training',
            week: 1,
            title: 'Complete mandatory security training',
            description: 'All new hires must complete security compliance training within the first week.',
            notionLink: null,
            category: 'Compliance',
        },
        {
            id: 'tool-miro',
            week: 2,
            title: 'Get familiar with Miro',
            description: 'Miro is our primary collaboration and whiteboarding tool. Explore the workspace and join any relevant boards.',
            notionLink: null,
            category: 'Tools',
        },
        {
            id: 'tool-figma',
            week: 2,
            title: 'Get familiar with Figma',
            description: 'Figma is our design tool. Get access and explore the team files relevant to your role.',
            notionLink: null,
            category: 'Tools',
        },
        {
            id: 'tool-antigravity',
            week: 2,
            title: 'Get familiar with AntiGravity',
            description: 'AntiGravity is our AI coding assistant. Set it up and explore how your team uses it.',
            notionLink: null,
            category: 'Tools',
        },
    ],

    engineering: [
        {
            id: 'eng-1on1-crew-india',
            week: 2,
            title: '1-on-1 with India Crew Lead',
            description: 'Schedule a general introduction chat with the Engineering Crew Lead based in India.',
            notionLink: null,
            category: 'Relationships',
        },
        {
            id: 'eng-1on1-crew-australia',
            week: 2,
            title: '1-on-1 with Australia Crew Lead',
            description: 'Schedule a general introduction chat with the Engineering Crew Lead based in Australia.',
            notionLink: null,
            category: 'Relationships',
        },
        {
            id: 'eng-1on1-head',
            week: 2,
            title: '1-on-1 with Head of Engineering',
            description: 'Have a general introduction chat with the Head of Engineering.',
            notionLink: null,
            category: 'Relationships',
        },
    ],

    product: [
        {
            id: 'pm-1on1-team',
            week: 2,
            title: '1-on-1s with PMs & Designers on your team',
            description: 'Connect with every Product Manager and Designer on your immediate team to understand their working styles.',
            notionLink: null,
            category: 'Relationships',
        },
        {
            id: 'pm-1on1-crew-india',
            week: 2,
            title: '1-on-1 with India Crew Lead',
            description: 'Schedule a general introduction chat with the Product Crew Lead based in India.',
            notionLink: null,
            category: 'Relationships',
        },
        {
            id: 'pm-1on1-crew-australia',
            week: 2,
            title: '1-on-1 with Australia Crew Lead',
            description: 'Schedule a general introduction chat with the Product Crew Lead based in Australia.',
            notionLink: null,
            category: 'Relationships',
        },
        {
            id: 'pm-1on1-head',
            week: 2,
            title: '1-on-1 with Head of Product Practice',
            description: 'Have a general introduction chat with the Head of Product Practice.',
            notionLink: null,
            category: 'Relationships',
        },
    ],

    design: [
        {
            id: 'design-1on1-team',
            week: 2,
            title: '1-on-1s with PMs & Designers on your team',
            description: 'Connect with every Product Manager and Designer on your immediate team to understand their working styles.',
            notionLink: null,
            category: 'Relationships',
        },
        {
            id: 'design-1on1-crew-india',
            week: 2,
            title: '1-on-1 with India Crew Lead',
            description: 'Schedule a general introduction chat with the Design Crew Lead based in India.',
            notionLink: null,
            category: 'Relationships',
        },
        {
            id: 'design-1on1-crew-australia',
            week: 2,
            title: '1-on-1 with Australia Crew Lead',
            description: 'Schedule a general introduction chat with the Design Crew Lead based in Australia.',
            notionLink: null,
            category: 'Relationships',
        },
        {
            id: 'design-1on1-head',
            week: 2,
            title: '1-on-1 with Head of Design Practice',
            description: 'Have a general introduction chat with the Head of Design Practice.',
            notionLink: null,
            category: 'Relationships',
        },
    ],
};

// Returns merged milestone list for a given role
export const getMilestonesForRole = (role) => {
    const roleKey = role?.toLowerCase();
    const roleMilestones = milestones[roleKey] || [];
    return [...milestones.all, ...roleMilestones];
};
