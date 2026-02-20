import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import { useUserProfile } from './hooks/useUserProfile';
import { useMilestoneProgress } from './hooks/useMilestoneProgress';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ChatWidget from './components/ChatWidget';
import JourneyMap from './components/JourneyMap';
import Resources from './components/Resources';
import TeamDirectory from './components/TeamDirectory';
import Settings from './components/Settings';
import Login from './components/Login';
import RoleSelector from './components/RoleSelector';

function App() {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [currentView, setView] = useState('dashboard');

  // Firebase user profile (role) from Firestore
  const { role, profileLoading, saveRole } = useUserProfile(firebaseUser);

  // Milestone progress from Firestore
  const milestoneProgress = useMilestoneProgress(firebaseUser);

  // Listen to Firebase auth state — persists login across page refreshes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user || null);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth);
    setFirebaseUser(null);
  };

  // Build user object for display (name, email, photoURL + role from Firestore)
  const user = firebaseUser ? {
    name: firebaseUser.displayName || 'User',
    email: firebaseUser.email,
    photoURL: firebaseUser.photoURL,
    role: role || 'Team Member',
    tenure: 'Day 1',
  } : null;

  // Loading: Firebase checking session or Firestore loading role
  if (authLoading || (firebaseUser && profileLoading)) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
            <span className="text-2xl font-bold text-white">OC</span>
          </div>
          <svg className="animate-spin h-6 w-6 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
        </div>
      </div>
    );
  }

  // Not logged in
  if (!firebaseUser) {
    return <Login />;
  }

  // Logged in but no role yet — show one-time role selector
  if (!role) {
    return <RoleSelector user={firebaseUser} onRoleSelected={saveRole} />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard user={user} setView={setView} milestoneProgress={milestoneProgress} role={role} />;
      case 'journey': return <JourneyMap role={role} milestoneProgress={milestoneProgress} />;
      case 'resources': return <Resources role={role} />;
      case 'team': return <TeamDirectory role={role} />;
      case 'settings': return <Settings onLogout={handleLogout} />;
      default: return <Dashboard user={user} setView={setView} milestoneProgress={milestoneProgress} role={role} />;
    }
  };

  return (
    <div className="flex min-h-screen text-slate-200">
      <Sidebar currentView={currentView} setView={setView} user={user} onLogout={handleLogout} />
      <main className="flex-1 overflow-y-auto h-screen">
        {renderView()}
      </main>
      <ChatWidget />
    </div>
  );
}

export default App;
