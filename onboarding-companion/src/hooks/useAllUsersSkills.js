// src/hooks/useAllUsersSkills.js
// Fetches all users from Firestore once and returns them with their skill ratings.
// Used by SkillDirectory to find who has proficiency in a given skill.
// Strategy: client-side filtering (MVP) — acceptable for small team size.

import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export const useAllUsersSkills = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const snapshot = await getDocs(collection(db, 'users'));
                const users = snapshot.docs.map((doc) => ({
                    uid: doc.id,
                    name: doc.data().name || 'Unknown',
                    email: doc.data().email || '',
                    role: doc.data().role || '',
                    // Derive slackUsername from email prefix (e.g. pranav.murty@everest.com → pranav.murty)
                    slackUsername: doc.data().slackUsername || doc.data().email?.split('@')[0] || '',
                    skills: doc.data().skills || {},
                }));
                setAllUsers(users);
            } catch (err) {
                console.error('Error fetching all users:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAllUsers();
    }, []); // fetch once per session

    return { allUsers, loading, error };
};
