// Gen AI Quiz Prescriptions
// Prescription copy and Skill Finder mappings per dimension
// 'always' block applies to every PM regardless of score

export const SLACK_AI_CHANNEL = 'https://everest-engineering.slack.com/channels/artificial-intelligence';

export const ESSENTIAL_SKILLS = [
    { name: 'Market Research', description: 'Size markets, analyse competitors, and evaluate opportunities using AI as a synthesis engine — not a source of truth.' },
    { name: 'Story Slicing', description: 'Use AI to draft stories quickly, then apply expert judgment to ensure each story is vertical, independent, and testable.' },
    { name: 'Prototyping via Lovable', description: 'Rapidly prototype early product concepts using AI-assisted tools — then interrogate the output for assumptions and gaps.' },
];

export const DIMENSION_PRESCRIPTIONS = {
    judgment: {
        label: 'Judgment',
        weakNarrative:
            'Your results suggest opportunities to develop stronger instincts for *when* Gen AI helps vs when it misleads. The most common trap: reaching for AI for tasks that require current, verified, or domain-specific ground truth.',
        challenge:
            `This week, before every task you plan to use AI for, write one sentence: "I'm using AI here because ____." Share at least one with your mentor.`,
        skillFinderKey: 'AI & LLM Skills::Prompt Engineering',
    },
    craft: {
        label: 'Craft',
        weakNarrative:
            'Your results suggest room to grow in *how* you use Gen AI — specifically in prompt quality. Vague prompts produce vague output. Context, constraints, and format instructions are what separate useful AI output from generic filler.',
        challenge:
            'This week, for every AI task, write your first prompt — then immediately rewrite it with more context before hitting send. Compare the two outputs and note the difference.',
        skillFinderKey: 'AI & LLM Skills::Prompt Engineering',
    },
    critical_evaluation: {
        label: 'Critical Evaluation',
        weakNarrative:
            'Your results suggest an opportunity to develop stronger AI output scrutiny. In client-facing work, accepting AI output at face value is where errors — and hallucinated statistics — sneak into decks and stories.',
        challenge:
            'This week, for every AI output you plan to use in a deliverable, find and verify at least one specific claim from a primary source before using it.',
        skillFinderKey: 'AI & LLM Skills::ChatGPT/GPT-4',
    },
};

// Narrative text for each dimension at each score level (score = correct answers)
export const DIMENSION_NARRATIVE = {
    judgment: {
        high: 'You have a strong instinct for when AI accelerates PM work vs when it misleads — this is the hardest skill to develop and you\'ve got it.',
        mid: 'You\'re developing good AI judgment. Focus on the edge cases: tasks requiring current data, verified statistics, or nuanced qualitative interpretation.',
        low: 'AI judgment is about knowing what AI is bad at, not just what it\'s good at. Current data, specific statistics, and qualitative nuance are where AI most often misleads PMs.',
    },
    craft: {
        high: 'Your prompts give AI the context it needs to produce genuinely useful output. Context, constraints, and format instructions are your toolkit — and you\'re using them.',
        mid: 'You\'re getting the basics right. The next level is adding structured format instructions, explicitly specifying methodology, and constraining the output scope.',
        low: 'Vague prompts produce vague output. Every good PM prompt answers three questions: What\'s the context? What constraints apply? What format do I need?',
    },
    critical_evaluation: {
        high: 'You may be accepting AI outputs at face value in some cases. In client-facing work, this is where errors sneak into decks and stories.',
        mid: 'You\'re catching obvious issues. The next level is developing a checklist habit: verify specific statistics, check for horizontal story slicing, and confirm AI hasn\'t assumed a simpler problem than the real one.',
        low: 'Critical evaluation is your most urgent AI development area. Specific statistics, market share figures, and "precise-sounding" data are hallucination hotspots — always trace them to primary sources.',
    },
};

// Returns 'high' | 'mid' | 'low' rating for narrative lookup
export const getDimensionLevel = (score, maxScore) => {
    const ratio = score / maxScore;
    if (ratio >= 0.75) return 'high';
    if (ratio >= 0.5) return 'mid';
    return 'low';
};

// Returns the weakest dimension key based on scores object
export const getWeakestDimension = (scores) => {
    const { judgment, craft, criticalEval } = scores;
    const normalized = {
        judgment: judgment / 4,
        craft: craft / 3,
        critical_evaluation: criticalEval / 3,
    };
    return Object.entries(normalized).sort((a, b) => a[1] - b[1])[0][0];
};
