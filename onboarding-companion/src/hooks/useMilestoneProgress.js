// src/hooks/useMilestoneProgress.js
// Reads and writes milestone completion state to Firestore.
// Each milestone is stored as a document in the user's milestones subcollection.

import { useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const useMilestoneProgress = (firebaseUser) => {
    const [completedMilestones, setCompletedMilestones] = useState({}); // { milestoneId: true }
    const [progressLoading, setProgressLoading] = useState(true);

    useEffect(() => {
        if (!firebaseUser) {
            setCompletedMilestones({});
            setProgressLoading(false);
            return;
        }

        const fetchProgress = async () => {
            try {
                const milestonesRef = collection(db, 'users', firebaseUser.uid, 'milestones');
                const snapshot = await getDocs(milestonesRef);
                const completed = {};
                snapshot.forEach((doc) => {
                    if (doc.data().completed) {
                        completed[doc.id] = true;
                    }
                });
                setCompletedMilestones(completed);
            } catch (err) {
                console.error('Error fetching milestone progress:', err);
            } finally {
                setProgressLoading(false);
            }
        };

        fetchProgress();
    }, [firebaseUser]);

    const toggleMilestone = async (milestoneId, currentlyCompleted) => {
        if (!firebaseUser) return;

        // Optimistic UI update
        setCompletedMilestones((prev) => ({
            ...prev,
            [milestoneId]: !currentlyCompleted,
        }));

        try {
            const milestoneRef = doc(db, 'users', firebaseUser.uid, 'milestones', milestoneId);
            await setDoc(milestoneRef, {
                completed: !currentlyCompleted,
                completedAt: !currentlyCompleted ? new Date().toISOString() : null,
            });
        } catch (err) {
            console.error('Error updating milestone:', err);
            // Revert optimistic update on error
            setCompletedMilestones((prev) => ({
                ...prev,
                [milestoneId]: currentlyCompleted,
            }));
        }
    };

    const isCompleted = (milestoneId) => !!completedMilestones[milestoneId];

    const getProgress = (milestoneList) => {
        const total = milestoneList.length;
        const done = milestoneList.filter((m) => completedMilestones[m.id]).length;
        return { total, done, percent: total > 0 ? Math.round((done / total) * 100) : 0 };
    };

    return { completedMilestones, progressLoading, toggleMilestone, isCompleted, getProgress };
};
