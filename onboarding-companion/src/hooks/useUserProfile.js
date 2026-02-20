// src/hooks/useUserProfile.js
// Manages user role and profile data in Firestore.
// Role is set once after first login and persisted across sessions.

import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const useUserProfile = (firebaseUser) => {
    const [role, setRole] = useState(null);
    const [profileLoading, setProfileLoading] = useState(true);

    useEffect(() => {
        if (!firebaseUser) {
            setRole(null);
            setProfileLoading(false);
            return;
        }

        const fetchProfile = async () => {
            try {
                const userRef = doc(db, 'users', firebaseUser.uid);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists() && userSnap.data().role) {
                    setRole(userSnap.data().role);
                } else {
                    setRole(null); // triggers RoleSelector
                }
            } catch (err) {
                console.error('Error fetching user profile:', err);
                setRole(null);
            } finally {
                setProfileLoading(false);
            }
        };

        fetchProfile();
    }, [firebaseUser]);

    const saveRole = async (selectedRole) => {
        if (!firebaseUser) return;
        try {
            const userRef = doc(db, 'users', firebaseUser.uid);
            await setDoc(userRef, {
                role: selectedRole,
                name: firebaseUser.displayName,
                email: firebaseUser.email,
                joinedAt: new Date().toISOString(),
            }, { merge: true });
            setRole(selectedRole);
        } catch (err) {
            console.error('Error saving role:', err);
        }
    };

    return { role, profileLoading, saveRole };
};
