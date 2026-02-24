// src/config/skills.js
// All skill definitions for the 4-step proficiency assessment.
// Scale: 1 = No experience, 2 = Beginner, 3 = Familiar, 4 = Proficient, 5 = Expert

export const SCALE_LABELS = {
    1: 'No experience',
    2: 'Beginner',
    3: 'Familiar',
    4: 'Proficient',
    5: 'Expert',
};

// Step 1: Role-specific skills
export const roleSkills = {
    product: [
        {
            category: 'Delivery',
            skills: [
                'Discovery Workshops',
                'Scope Management',
                'Estimations',
                'Outcome-based Roadmaps',
                'Iteration Planning',
                'Release Planning',
                'Systems Thinking',
                'Testing',
            ],
        },
        {
            category: 'Product',
            skills: [
                'User Research',
                'Understanding Customer, Business & Commercial',
                'Market / Marketing a Product',
                'Feasibility Assessments',
                'Product Strategy',
                'Experiment-based Product Development',
            ],
        },
        {
            category: 'Program',
            skills: [
                'Process Design & Optimisation',
                'Change Management',
                'Problem Identification & Resolution',
                'Risk Management',
                'Contract Management',
                'Pre-sales',
            ],
        },
    ],

    design: [
        {
            category: 'Design Skills',
            skills: [
                'UX Research',
                'UI Design',
                'Figma',
                'Design Systems',
                'Prototyping',
                'Usability Testing',
                'Content Design',
            ],
        },
    ],

    engineering: [
        {
            category: 'Engineering Skills',
            skills: [
                'React',
                'Node.js',
                'Python',
                'AWS',
                'DevOps / CI-CD',
                'System Design',
                'Mobile',
                'APIs',
                'SQL',
            ],
        },
    ],
};

// Step 2: Core skills — all roles
export const coreSkills = {
    category: 'Core Skills',
    skills: [
        'Stakeholder Management',
        'Teaming',
        'Facilitation',
        'Advanced Communication',
        'Coaching',
        'Negotiation',
        'Conflict Resolution',
    ],
};

// Step 3: Domain experience — all roles
export const domainSkills = {
    category: 'Domain Experience',
    skills: [
        'Fintech',
        'Healthtech',
        'Enterprise SaaS',
        'E-commerce',
        'EdTech',
        'Logistics',
        'Government',
    ],
};

// Step 4: AI / LLM skills — all roles
export const aiSkills = {
    category: 'AI / LLM Skills',
    skills: [
        'Prompt Engineering',
        'GitHub Copilot',
        'ChatGPT / GPT-4',
        'Claude',
        'Cursor',
        'AntiGravity',
        'Building AI Agents',
        'LangChain / CrewAI',
    ],
};

// Returns a flat list of all skill IDs for a role (used for Firestore structure)
export const getAllSkillIds = (role) => {
    const roleCategories = roleSkills[role?.toLowerCase()] || [];
    const allIds = [];
    roleCategories.forEach(({ category, skills }) =>
        skills.forEach((s) => allIds.push(`${category}::${s}`))
    );
    [coreSkills, domainSkills, aiSkills].forEach(({ category, skills }) =>
        skills.forEach((s) => allIds.push(`${category}::${s}`)
        ));
    return allIds;
};

// Returns all possible skill keys across ALL roles, for the Skill Directory dropdown.
// Each entry: { key: 'Category::SkillName', label: 'SkillName', category: 'Category' }
export const getAllSkillKeys = () => {
    const seen = new Set();
    const result = [];

    const add = (category, skillsList) => {
        skillsList.forEach((s) => {
            const key = `${category}::${s}`;
            if (!seen.has(key)) {
                seen.add(key);
                result.push({ key, label: s, category });
            }
        });
    };

    // All role-specific skills (union across product, design, engineering)
    Object.values(roleSkills).forEach((categories) =>
        categories.forEach(({ category, skills }) => add(category, skills))
    );

    // Shared skill categories
    [coreSkills, domainSkills, aiSkills].forEach(({ category, skills }) =>
        add(category, skills)
    );

    return result;
};

