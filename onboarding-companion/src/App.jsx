import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import { ThemeProvider } from './context/ThemeContext';
import { useUserProfile } from './hooks/useUserProfile';
import { useMilestoneProgress } from './hooks/useMilestoneProgress';
import { useSkillsProfile } from './hooks/useSkillsProfile';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ChatWidget from './components/ChatWidget';
import JourneyMap from './components/JourneyMap';
import Resources from './components/Resources';
import TeamDirectory from './components/TeamDirectory';
import Settings from './components/Settings';
import Login from './components/Login';
import RoleSelector from './components/RoleSelector';
import SkillsAssessment from './components/SkillsAssessment';
import MySkills from './components/MySkills';
import SkillDirectory from './components/SkillDirectory';

function App() {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [currentView, setView] = useState('dashboard');

  // Firebase user profile (role) from Firestore
  const { role, userData, profileLoading, saveRole } = useUserProfile(firebaseUser);

  // Milestone progress from Firestore
  const milestoneProgress = useMilestoneProgress(firebaseUser);
  const { skillRatings, skillsLoading, skillsCompleted, saveAssessment, updateSkillRating } = useSkillsProfile(firebaseUser);

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
    joinedAt: userData?.joinedAt || null,
  } : null;

  // Loading: Firebase checking session or Firestore loading role/skills
  if (authLoading || (firebaseUser && (profileLoading || skillsLoading))) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#F9EFDF' }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: '#ECA508' }}>
            <span className="text-2xl font-bold" style={{ color: '#262424' }}>E</span>
          </div>
          <svg className="animate-spin h-6 w-6" style={{ color: '#ECA508' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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

  // Role selected but skills not assessed yet — show mandatory assessment
  if (!skillsCompleted) {
    return <SkillsAssessment user={firebaseUser} role={role} onComplete={saveAssessment} />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard user={user} setView={setView} milestoneProgress={milestoneProgress} role={role} />;
      case 'journey': return <JourneyMap role={role} milestoneProgress={milestoneProgress} />;
      case 'resources': return <Resources role={role} />;
      case 'team': return <TeamDirectory role={role} />;
      case 'skills': return <MySkills role={role} skillRatings={skillRatings} onUpdate={updateSkillRating} />;
      case 'skillfinder': return <SkillDirectory />;
      case 'settings': return <Settings onLogout={handleLogout} />;
      default: return <Dashboard user={user} setView={setView} milestoneProgress={milestoneProgress} role={role} />;
    }
  };

  return (
    <div className="flex min-h-screen" style={{ color: 'var(--text-primary)' }}>
      <Sidebar currentView={currentView} setView={setView} user={user} onLogout={handleLogout} />
      <main className="flex-1 overflow-y-auto h-screen" style={{ background: 'var(--bg-primary)' }}>
        {renderView()}
      </main>
      <ChatWidget />
    </div>
  );
}

const AppWithTheme = () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);

export default AppWithTheme;
