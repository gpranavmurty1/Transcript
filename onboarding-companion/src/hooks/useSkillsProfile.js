// src/hooks/useSkillsProfile.js
// Reads and writes skill proficiency ratings to Firestore.
// Ratings are stored under users/{uid}/skills/{category}::{skillName} = { rating: 1-5 }

import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const useSkillsProfile = (firebaseUser) => {
    const [skillRatings, setSkillRatings] = useState({}); // { 'Category::SkillName': rating }
    const [skillsLoading, setSkillsLoading] = useState(true);
    const [skillsCompleted, setSkillsCompleted] = useState(false); // has the assessment been done?

    useEffect(() => {
        if (!firebaseUser) {
            setSkillRatings({});
            setSkillsLoading(false);
            setSkillsCompleted(false);
            return;
        }

        const fetchSkills = async () => {
            try {
                const userRef = doc(db, 'users', firebaseUser.uid);
                const snap = await getDoc(userRef);
                if (snap.exists() && snap.data().skillsCompleted) {
                    setSkillRatings(snap.data().skills || {});
                    setSkillsCompleted(true);
                } else {
                    setSkillsCompleted(false);
                }
            } catch (err) {
                console.error('Error fetching skills:', err);
                setSkillsCompleted(false);
            } finally {
                setSkillsLoading(false);
            }
        };

        fetchSkills();
    }, [firebaseUser]);

    // Save entire assessment at once (called on wizard completion)
    const saveAssessment = async (ratings) => {
        if (!firebaseUser) return;
        try {
            const userRef = doc(db, 'users', firebaseUser.uid);
            await setDoc(userRef, {
                skills: ratings,
                skillsCompleted: true,
                skillsCompletedAt: new Date().toISOString(),
            }, { merge: true });
            setSkillRatings(ratings);
            setSkillsCompleted(true);
        } catch (err) {
            console.error('Error saving skill assessment:', err);
        }
    };

    // Update a single skill rating (called from My Skills section)
    const updateSkillRating = async (skillKey, rating) => {
        if (!firebaseUser) return;

        // Optimistic update
        setSkillRatings((prev) => ({ ...prev, [skillKey]: rating }));

        try {
            const userRef = doc(db, 'users', firebaseUser.uid);
            await updateDoc(userRef, {
                [`skills.${skillKey.replace(/\./g, '_')}`]: rating,
            });
        } catch (err) {
            console.error('Error updating skill:', err);
            setSkillRatings((prev) => ({ ...prev })); // revert on error
        }
    };

    return { skillRatings, skillsLoading, skillsCompleted, saveAssessment, updateSkillRating };
};
