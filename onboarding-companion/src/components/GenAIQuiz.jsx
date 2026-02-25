import React, { useState, useEffect } from 'react';
import { Zap, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { getQuestionsForRole } from '../config/aiQuizQuestions';
import QuizQuestion from './QuizQuestion';

const GenAIQuiz = ({ user, role, quizData, onComplete, saveProgress, clearInProgress, isInProgressStale, onSkip }) => {
    const questions = getQuestionsForRole(role);

    // Detect stale in-progress retake and clear it on mount
    useEffect(() => {
        if (isInProgressStale()) {
            clearInProgress();
        }
    }, []); // eslint-disable-line

    // Resume from saved state if available
    const savedIndex = (quizData?.inProgressAnswers?.length > 0 && !isInProgressStale())
        ? (quizData.inProgressQuestionIndex ?? 0)
        : 0;
    const savedAnswers = (quizData?.inProgressAnswers?.length > 0 && !isInProgressStale())
        ? quizData.inProgressAnswers
        : Array(questions.length).fill(null);

    const [currentIndex, setCurrentIndex] = useState(savedIndex);
    const [answers, setAnswers] = useState(savedAnswers);
    const [showResult, setShowResult] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const q = questions[currentIndex];
    const selectedOption = answers[currentIndex];
    const isLast = currentIndex === questions.length - 1;
    const answered = selectedOption !== null && selectedOption !== undefined;

    const handleSelect = (optionIndex) => {
        if (showResult) return;
        const updated = [...answers];
        updated[currentIndex] = optionIndex;
        setAnswers(updated);
        setShowResult(true);
        saveProgress(updated, currentIndex);
    };

    const handleNext = async () => {
        setShowResult(false);
        if (isLast) {
            setSubmitting(true);
            await onComplete(answers);
            setSubmitting(false);
        } else {
            const nextIndex = currentIndex + 1;
            setCurrentIndex(nextIndex);
            saveProgress(answers, nextIndex);
        }
    };

    const handleBack = () => {
        if (currentIndex === 0 || showResult) return;
        setCurrentIndex(i => i - 1);
    };

    const progress = ((currentIndex + (showResult ? 1 : 0)) / questions.length) * 100;

    return (
        <div className="min-h-screen flex flex-col items-center justify-start py-10 px-6" style={{ background: 'var(--bg-primary)' }}>
            <div className="max-w-2xl w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                        style={{ background: 'var(--accent)' }}>
                        <Zap size={22} style={{ color: '#262424' }} />
                    </div>
                    <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Gen AI Proficiency</h1>
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                        10 questions · ~5 minutes · {user?.displayName?.split(' ')[0] ? `Just for you, ${user.displayName.split(' ')[0]}` : 'Understanding how you work with AI'}
                    </p>
                </div>

                {/* Progress bar */}
                <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                        Question {currentIndex + 1} of {questions.length}
                    </span>
                    <span className="text-xs font-semibold" style={{ color: 'var(--accent)' }}>
                        {Math.round(progress)}% complete
                    </span>
                </div>
                <div className="w-full h-2 rounded-full mb-8" style={{ background: 'var(--border)' }}>
                    <div className="h-2 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%`, background: 'var(--accent)' }} />
                </div>

                {/* Step dots */}
                <div className="flex items-center gap-1.5 mb-8 justify-center flex-wrap">
                    {questions.map((_, i) => {
                        const done = answers[i] !== null && answers[i] !== undefined;
                        const active = i === currentIndex;
                        return (
                            <div key={i} className="w-2.5 h-2.5 rounded-full transition-all"
                                style={{
                                    background: done ? 'var(--accent)' : active ? 'var(--text-muted)' : 'var(--border)',
                                    transform: active ? 'scale(1.3)' : 'scale(1)',
                                }} />
                        );
                    })}
                </div>

                {/* Question card */}
                <div className="rounded-3xl p-8 mb-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                    <QuizQuestion
                        question={q}
                        selectedOption={selectedOption}
                        onSelect={handleSelect}
                        showResult={showResult}
                    />
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={handleBack}
                        disabled={currentIndex === 0 || showResult}
                        className="flex items-center gap-2 text-sm disabled:opacity-30"
                        style={{ color: 'var(--text-subtle)' }}
                    >
                        <ChevronLeft size={16} /> Back
                    </button>

                    {showResult && (
                        <button
                            onClick={handleNext}
                            disabled={submitting}
                            className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all hover:scale-105"
                            style={{ background: 'var(--bg-sidebar)', color: 'var(--text-sidebar)' }}
                        >
                            {submitting ? 'Saving…' : isLast ? <><Check size={16} className="mr-1" />View Results</> : <>Next <ChevronRight size={16} /></>}
                        </button>
                    )}

                    {!showResult && !answered && (
                        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Select an answer to continue</span>
                    )}
                </div>

                {/* Validation nudge */}
                {!showResult && !answered && currentIndex > 0 && (
                    <p className="text-center text-xs mt-3" style={{ color: 'var(--peach)', opacity: 0.8 }}>
                        Please select an answer to continue
                    </p>
                )}

                {/* Skip option */}
                {!showResult && onSkip && (
                    <div className="text-center mt-6">
                        <button
                            onClick={onSkip}
                            className="text-xs transition-all hover:opacity-100"
                            style={{ color: 'var(--text-muted)', opacity: 0.6, textDecoration: 'underline', textUnderlineOffset: '3px' }}
                        >
                            Skip for now — I'll take this later from My Skills
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GenAIQuiz;
