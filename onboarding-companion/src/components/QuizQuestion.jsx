import React from 'react';
import { Brain, CheckCircle, XCircle } from 'lucide-react';

const formatMap = {
    scenario: 'Scenario',
    prompt_critique: 'Prompt Critique',
    output_critique: 'Output Critique',
};

const dimensionColor = (dim) => {
    if (dim === 'judgment') return { color: '#6366f1', bg: 'rgba(99,102,241,0.1)' };
    if (dim === 'craft') return { color: '#10b981', bg: 'rgba(16,185,129,0.1)' };
    return { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' };
};

const QuizQuestion = ({ question, selectedOption, onSelect, showResult }) => {
    const { color, bg } = dimensionColor(question.dimension);
    const isCorrect = selectedOption === question.correctOption;

    return (
        <div>
            {/* Metadata chips */}
            <div className="flex items-center gap-2 mb-5">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: bg, color }}>
                    {question.dimension.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{ background: 'var(--border)', color: 'var(--text-muted)' }}>
                    {formatMap[question.format]}
                </span>
            </div>

            {/* Question text — preserve line breaks for prompts */}
            <p className="text-base font-medium leading-relaxed mb-6 whitespace-pre-line"
                style={{ color: 'var(--text-primary)' }}>
                {question.question}
            </p>

            {/* Options */}
            <div className="flex flex-col gap-3 mb-4">
                {question.options.map((opt, i) => {
                    const isSelected = selectedOption === i;
                    const isRight = showResult && i === question.correctOption;
                    const isWrong = showResult && isSelected && !isCorrect;

                    let borderColor = 'var(--border)';
                    let bg2 = 'var(--bg-card)';
                    let textColor = 'var(--text-primary)';

                    if (isRight) { borderColor = '#10b981'; bg2 = 'rgba(16,185,129,0.08)'; }
                    else if (isWrong) { borderColor = '#f87171'; bg2 = 'rgba(248,113,113,0.08)'; }
                    else if (isSelected && !showResult) { borderColor = color; bg2 = bg; }

                    return (
                        <button
                            key={i}
                            onClick={() => !showResult && onSelect(i)}
                            disabled={showResult}
                            className="text-left p-4 rounded-2xl transition-all flex items-start gap-3"
                            style={{ border: `2px solid ${borderColor}`, background: bg2, color: textColor, cursor: showResult ? 'default' : 'pointer' }}
                        >
                            <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                                style={{ background: isSelected || isRight ? borderColor : 'var(--border)', color: isSelected || isRight ? '#fff' : 'var(--text-muted)' }}>
                                {String.fromCharCode(65 + i)}
                            </span>
                            <span className="text-sm leading-relaxed">{opt}</span>
                            {showResult && isRight && <CheckCircle size={16} className="flex-shrink-0 ml-auto mt-0.5" style={{ color: '#10b981' }} />}
                            {showResult && isWrong && <XCircle size={16} className="flex-shrink-0 ml-auto mt-0.5" style={{ color: '#f87171' }} />}
                        </button>
                    );
                })}
            </div>

            {/* Explanation (shown after answer) */}
            {showResult && (
                <div className="rounded-2xl p-4 mt-2"
                    style={{ background: isCorrect ? 'rgba(16,185,129,0.08)' : 'rgba(245,158,11,0.08)', border: `1px solid ${isCorrect ? '#10b981' : 'var(--border-accent)'}` }}>
                    <div className="flex items-center gap-2 mb-1.5">
                        <Brain size={14} style={{ color: isCorrect ? '#10b981' : 'var(--accent)' }} />
                        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: isCorrect ? '#10b981' : 'var(--accent)' }}>
                            {isCorrect ? 'Correct!' : 'Not quite'}
                        </span>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                        {question.explanation}
                    </p>
                </div>
            )}
        </div>
    );
};

export default QuizQuestion;
