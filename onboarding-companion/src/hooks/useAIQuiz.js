import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { getQuestionsForRole } from '../config/aiQuizQuestions';

export const useAIQuiz = (firebaseUser, role) => {
    const [quizData, setQuizData] = useState(null);
    const [quizLoading, setQuizLoading] = useState(true);

    useEffect(() => {
        if (!firebaseUser) { setQuizLoading(false); return; }
        const fetchQuizData = async () => {
            try {
                const ref = doc(db, 'users', firebaseUser.uid);
                const snap = await getDoc(ref);
                if (snap.exists()) {
                    setQuizData(snap.data().aiQuiz || null);
                }
            } catch (err) {
                console.error('Error fetching quiz data:', err);
            } finally {
                setQuizLoading(false);
            }
        };
        fetchQuizData();
    }, [firebaseUser]);

    // Persist answers on each question answer (save-on-exit support)
    const saveProgress = async (answers, currentIndex) => {
        if (!firebaseUser) return;
        try {
            const ref = doc(db, 'users', firebaseUser.uid);
            await updateDoc(ref, {
                'aiQuiz.inProgressAnswers': answers,
                'aiQuiz.inProgressQuestionIndex': currentIndex,
                'aiQuiz.inProgressStartedAt': quizData?.inProgressStartedAt || new Date().toISOString(),
            });
        } catch (err) {
            console.error('Error saving quiz progress:', err);
        }
    };

    // Calculate scores and write final results
    const submitQuiz = async (answers) => {
        if (!firebaseUser) return;
        const questions = getQuestionsForRole(role);
        let judgment = 0, craft = 0, criticalEval = 0;
        questions.forEach((q, i) => {
            const correct = answers[i] === q.correctOption;
            if (q.dimension === 'judgment') judgment += correct ? 1 : 0;
            else if (q.dimension === 'craft') craft += correct ? 1 : 0;
            else if (q.dimension === 'critical_evaluation') criticalEval += correct ? 1 : 0;
        });

        const now = new Date().toISOString();
        const result = {
            completedAt: quizData?.completedAt || now,  // preserve first completion date
            lastAttemptAt: now,
            judgmentScore: judgment,
            craftScore: craft,
            criticalEvalScore: criticalEval,
            inProgressAnswers: [],
            inProgressQuestionIndex: 0,
            inProgressStartedAt: null,
        };

        try {
            const ref = doc(db, 'users', firebaseUser.uid);
            const snap = await getDoc(ref);
            if (snap.exists()) {
                await updateDoc(ref, { aiQuiz: result, aiQuizCompleted: true });
            } else {
                await setDoc(ref, { aiQuiz: result, aiQuizCompleted: true }, { merge: true });
            }
            setQuizData(result);
            return result;
        } catch (err) {
            console.error('Error submitting quiz:', err);
            throw err;
        }
    };

    // Clear stale in-progress retake state (>24h old)
    const clearInProgress = async () => {
        if (!firebaseUser) return;
        try {
            const ref = doc(db, 'users', firebaseUser.uid);
            await updateDoc(ref, {
                'aiQuiz.inProgressAnswers': [],
                'aiQuiz.inProgressQuestionIndex': 0,
                'aiQuiz.inProgressStartedAt': null,
            });
            setQuizData(prev => prev ? { ...prev, inProgressAnswers: [], inProgressQuestionIndex: 0, inProgressStartedAt: null } : prev);
        } catch (err) {
            console.error('Error clearing in-progress quiz:', err);
        }
    };

    // Determine if an in-progress retake is stale (>24h)
    const isInProgressStale = () => {
        if (!quizData?.inProgressStartedAt) return false;
        const started = new Date(quizData.inProgressStartedAt);
        return (Date.now() - started.getTime()) > 24 * 60 * 60 * 1000;
    };

    return { quizData, quizLoading, saveProgress, submitQuiz, clearInProgress, isInProgressStale };
};
