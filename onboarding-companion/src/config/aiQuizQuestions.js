// Gen AI Quiz Questions
// Structured as { role, dimension, format, question, options, correctOption, explanation }
// role: 'product' | 'engineering' | 'design' | 'all'
// dimension: 'judgment' | 'craft' | 'critical_evaluation'
// format: 'scenario' | 'prompt_critique' | 'output_critique'

export const aiQuizQuestions = [
    // ─── JUDGMENT (4 questions) ───────────────────────────────────────────
    {
        id: 'j1',
        role: 'product',
        dimension: 'judgment',
        format: 'scenario',
        question:
            'You need to size the Total Addressable Market (TAM) for a new fintech vertical your client is considering. A colleague suggests asking ChatGPT for the figure. What would you do?',
        options: [
            'Use the ChatGPT figure directly — it will be accurate enough for an early-stage estimate.',
            'Use AI to synthesise publicly available reports (Statista, McKinsey, Gartner) into a structured analysis, then verify the key figures from primary sources.',
            'Avoid AI entirely — market sizing requires certified data sources only.',
            'Ask AI for the figure, round it conservatively, and flag it as an estimate in the deck.',
        ],
        correctOption: 1,
        explanation:
            'AI is excellent at synthesising public data into a structured framework (top-down/bottom-up), but should never be the primary source for specific figures. Always trace critical numbers to primary sources.',
    },
    {
        id: 'j2',
        role: 'product',
        dimension: 'judgment',
        format: 'scenario',
        question:
            "Your client asks what their top competitor announced at last week's product conference. Would you use Gen AI to answer this?",
        options: [
            'Yes — ask Claude or ChatGPT; they have up-to-date knowledge of major announcements.',
            'Yes — use AI with a web search plugin (like Perplexity or ChatGPT with Browse) to find recent announcements.',
            'No — use AI for this; rely on your own research from the competitor\'s website and press releases.',
            'No — AI cannot be trusted for any competitive intelligence.',
        ],
        correctOption: 1,
        explanation:
            'Base LLMs have a knowledge cutoff and cannot reliably answer questions about last week. AI with live web search is appropriate, but base models (ChatGPT, Claude without browsing) would likely hallucinate or give outdated information.',
    },
    {
        id: 'j3',
        role: 'product',
        dimension: 'judgment',
        format: 'scenario',
        question:
            'You need to write 10 vertically sliced user stories for a payments checkout feature. How would you approach this with AI?',
        options: [
            'Ask AI to generate all 10 stories and use them directly — AI handles story writing well.',
            'Avoid AI for story writing — it cannot understand the domain context well enough.',
            'Use AI to generate a first draft, then critically review each story to check it is truly vertical (delivers end-to-end user value), independent, and has meaningful acceptance criteria.',
            'Use AI to generate stories but ask it to make them as detailed as possible to avoid rework.',
        ],
        correctOption: 2,
        explanation:
            'AI is useful for drafting stories quickly but almost always produces horizontal slices (by technical layer) or bundles multiple user goals into one story. Expert PM judgment is required in the review step.',
    },
    {
        id: 'j4',
        role: 'product',
        dimension: 'judgment',
        format: 'scenario',
        question:
            'You have 45 minutes of user interview recordings and need to identify key pain points for a Product Review. What is the best use of AI here?',
        options: [
            'Transcribe the audio with AI and have it summarise the key themes and pain points.',
            'Read the transcripts yourself — AI cannot understand qualitative nuance in interviews.',
            'Use AI to transcribe and create a first-pass clustering of themes, then review and validate each theme against the raw transcript before drawing conclusions.',
            'Ask AI to create a persona directly from the interview content.',
        ],
        correctOption: 2,
        explanation:
            'AI is an excellent synthesis engine for qualitative data but can miss nuance, invent themes, or over-weight loud voices. The right approach is AI-assisted clustering with human validation against the source material.',
    },

    // ─── CRAFT (3 questions) ──────────────────────────────────────────────
    {
        id: 'c1',
        role: 'product',
        dimension: 'craft',
        format: 'prompt_critique',
        question:
            'A new PM submits this prompt to generate a user persona:\n\n"Create a user persona for our product."\n\nWhat are the key problems with this prompt?',
        options: [
            'It is too short — longer prompts always produce better results.',
            'It lacks context: no product description, no target segment, no research data to ground the persona in, and no format or detail level specified. The output will be generic and unusable.',
            'It should specify the AI tool to use (e.g. Claude vs ChatGPT).',
            'It should ask for multiple personas at once to save time.',
        ],
        correctOption: 1,
        explanation:
            'A good persona prompt includes: the product/domain context, the specific user segment, any known research signals, the desired format (narrative vs table), and how the persona will be used. Without these, AI produces a generic fictional character with no grounding in reality.',
    },
    {
        id: 'c2',
        role: 'product',
        dimension: 'craft',
        format: 'prompt_critique',
        question:
            'A PM asks AI to size a market using this prompt:\n\n"What is the TAM for neobanking?"\n\nIdentify the most critical gap in this prompt.',
        options: [
            'It should specify the year so the AI gives current data.',
            'It needs a geography, a time period, a market definition (consumer vs SMB vs enterprise), and should specify whether to use top-down or bottom-up methodology. Without these, any figure returned is meaningless.',
            'It is too vague — the PM should Google this instead.',
            'It should ask for multiple market sizing approaches simultaneously.',
        ],
        correctOption: 1,
        explanation:
            'Market sizing outputs are only as useful as their inputs. Without geography, segment, year, and methodology instructions, AI will produce a number with no interpretability — and it may be hallucinated.',
    },
    {
        id: 'c3',
        role: 'product',
        dimension: 'craft',
        format: 'prompt_critique',
        question:
            'A PM asks AI to write user stories with this prompt:\n\n"Write user stories for a login feature."\n\nWhat should the PM add to get genuinely useful output?',
        options: [
            'Ask for as many stories as possible to have options.',
            'Specify: the user type(s), the product context, whether stories should be vertically sliced (each delivers standalone user value), the acceptance criteria format, and any known technical constraints.',
            'Specify the exact number of stories wanted.',
            'Add "please make them detailed" to improve quality.',
        ],
        correctOption: 1,
        explanation:
            'Without specifying vertical slicing, AI will almost always produce feature-decomposed (horizontal) stories that cannot ship independently. Context about user type, product, and acceptance criteria format is equally critical for usable output.',
    },

    // ─── CRITICAL EVALUATION (3 questions) ───────────────────────────────
    {
        id: 'e1',
        role: 'product',
        dimension: 'critical_evaluation',
        format: 'output_critique',
        question:
            'AI generates this competitive analysis snippet for a client deck:\n\n"Stripe holds approximately 32% of the US online payment processing market, followed by Square at 18% and Adyen at 11% (as of Q3 2024)."\n\nWhat should you do before including this in a client presentation?',
        options: [
            'Include it — the specific percentages suggest it is precise and reliable.',
            'Round the numbers and add "approximately" to signal it is an estimate.',
            'Verify all three market share figures against primary sources (SEC filings, earnings calls, or reputable analyst reports) — LLMs frequently hallucinate specific statistics.',
            'Cross-check with one other AI tool; if they agree, the data is reliable.',
        ],
        correctOption: 2,
        explanation:
            'Specific statistics (percentages, dates, named sources) are a hallucination risk hotspot for LLMs. "Precise-sounding" data is not the same as accurate data. Always trace specific figures to primary sources — two AIs agreeing does not validate data.',
    },
    {
        id: 'e2',
        role: 'product',
        dimension: 'critical_evaluation',
        format: 'output_critique',
        question:
            'AI generates these 3 user stories for a payment flow:\n\n1. "As a user, I want to enter my card details so that I can pay."\n2. "As a user, I want the backend to process my payment so that the transaction completes."\n3. "As a user, I want to see a confirmation screen so that I know my payment succeeded."\n\nWhat is the primary problem with this set?',
        options: [
            'The stories are too short and need more acceptance criteria.',
            'Stories 1 and 2 are horizontally sliced — Story 2 is a technical task, not a user story. A user never directly interacts with "the backend processing." These cannot ship independently and deliver user value.',
            'There should be more stories — 3 is not enough for a payment flow.',
            'The stories are missing "so that" clauses on stories 1 and 2.',
        ],
        correctOption: 1,
        explanation:
            'Story 2 is a horizontal/technical slice — it describes a system action, not a user action, and cannot be tested by a user in isolation. Vertical slices each deliver observable, testable end-to-end value to a user. The correct slice here would be: "As a user, I want to complete a one-time card payment so that I can buy a product."',
    },
    {
        id: 'e3',
        role: 'product',
        dimension: 'critical_evaluation',
        format: 'output_critique',
        question:
            'You ask AI to build a prototype landing page concept using Lovable. The output looks polished and impressive. What should you do before presenting it to the client?',
        options: [
            'Present it directly — the goal of a prototype is visual quality, and this delivers it.',
            'Check that all interactive elements actually work as intended, that placeholder copy or fake data has been replaced with realistic content, and confirm the user flow matches the actual problem you are solving — not the problem the AI assumed you were solving.',
            'Ask AI to iterate once more to add more polish before presenting.',
            'Add your company branding and present — the output is AI-generated so minor errors are expected and clients understand.',
        ],
        correctOption: 1,
        explanation:
            "AI prototyping tools like Lovable accelerate concept generation but require PM validation: does the flow solve the right problem? Are edge cases handled? Is placeholder content realistic? AI assumes a 'happy path' — expert PMs interrogate what's missing.",
    },
];

export const QUESTION_COUNT = aiQuizQuestions.length;

// Filter questions by role (for when Engineering/Design support is added)
export const getQuestionsForRole = (role) =>
    aiQuizQuestions.filter(
        (q) => q.role === role || q.role === 'all'
    );
