// src/config/directory.js
// Team directory data: crews (Enterprise, Scaleups, Startups) and practice heads.
// Update this file to add/remove contacts — no component changes needed.

export const crews = [
    {
        name: 'Enterprise',
        description: 'Focused on large enterprise accounts and portfolios.',
        leads: [
            {
                name: 'Ravinder Deolal',
                region: 'India',
                role: 'Enterprise Crew Lead',
                email: 'ravinder.deolal@everest.engineering',
                slackUsername: 'rav',
                bio: 'Head of Enterprise portfolio.',
                avatar: 'Ravinder',
                gender: 'male',
            },
            {
                name: 'TBD',
                region: 'Australia',
                role: 'Enterprise Crew Lead (Australia)',
                email: '',
                slackUsername: '',
                bio: 'Australia-based Enterprise Crew Lead.',
                avatar: 'EnterpriseAU',
                gender: 'male',
            },
        ],
    },
    {
        name: 'Scaleups',
        description: 'Focused on high-growth scaleup accounts.',
        leads: [
            {
                name: 'Ashok Kannan',
                region: 'India',
                role: 'Scale Up Crew Lead',
                email: 'ashok.gk@everest.engineering',
                slackUsername: 'ashok',
                bio: 'Head of Scale up portfolio.',
                avatar: 'Ashok',
                gender: 'male',
            },
            {
                name: 'TBD',
                region: 'Australia',
                role: 'Scale Up Crew Lead (Australia)',
                email: '',
                slackUsername: '',
                bio: 'Australia-based Scaleup Crew Lead.',
                avatar: 'ScaleupAU',
                gender: 'male',
            },
        ],
    },
    {
        name: 'Startups',
        description: 'Focused on early-stage startup accounts.',
        leads: [
            {
                name: 'TBD',
                region: 'India',
                role: 'Startup Crew Lead (India)',
                email: '',
                slackUsername: '',
                bio: 'India-based Startup Crew Lead.',
                avatar: 'StartupIN',
                gender: 'male',
            },
            {
                name: 'TBD',
                region: 'Australia',
                role: 'Startup Crew Lead (Australia)',
                email: '',
                slackUsername: '',
                bio: 'Australia-based Startup Crew Lead.',
                avatar: 'StartupAU',
                gender: 'male',
            },
        ],
    },
];

export const practiceHeads = {
    engineering: {
        name: 'TBD',
        role: 'Head of Engineering',
        email: '',
        slackUsername: '',
        bio: 'Head of Engineering Practice.',
        avatar: 'HeadEng',
        gender: 'male',
    },
    product: {
        name: 'TBD',
        role: 'Head of Product Practice',
        email: '',
        slackUsername: '',
        bio: 'Head of Product Practice.',
        avatar: 'HeadProduct',
        gender: 'male',
    },
    design: {
        name: 'TBD',
        role: 'Head of Design Practice',
        email: '',
        slackUsername: '',
        bio: 'Head of Design Practice.',
        avatar: 'HeadDesign',
        gender: 'male',
    },
};

export const mentors = {
    product: [
        {
            name: 'Kshitij Kumar',
            region: 'India',
            role: 'Senior Product Manager',
            email: 'kshitij.kumar@everest.engineering',
            slackUsername: 'kshitij.kumar',
            bio: 'Extensive knowledge in Startups, Scaleups, and Enterprise accounts.',
            avatar: 'Kshitij',
            gender: 'male',
        },
        {
            name: 'Sruthi Suresh Babu',
            region: 'UAE',
            role: 'Senior Product Manager',
            email: 'sruthi@everest.engineering',
            slackUsername: 'shruti.babu',
            bio: 'Extensive knowledge in Enterprise accounts and Discovery workshops.',
            avatar: 'Sruthi',
            gender: 'female',
        },
        {
            name: 'Gopalkrishna Bhat',
            region: 'India',
            role: 'Product Manager',
            email: 'gopalkrishna.b@everest.engineering',
            slackUsername: 'gopal',
            bio: '8 years industry experience. Excellent with leading small teams.',
            avatar: 'Gopalkrishna',
            gender: 'male',
        },
    ],
    design: [],
    engineering: [],
};
