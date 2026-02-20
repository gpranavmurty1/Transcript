import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ChatWidget from './components/ChatWidget';
import JourneyMap from './components/JourneyMap';
import Resources from './components/Resources';
import TeamDirectory from './components/TeamDirectory';
import Settings from './components/Settings';
import Login from './components/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [currentView, setView] = useState('dashboard');

  // Listen to Firebase auth state — persists login across page refreshes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          name: firebaseUser.displayName || 'User',
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL,
          role: 'Team Member',
          tenure: 'Day 1',
        });
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = (selectedUser) => {
    setUser(selectedUser);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    signOut(auth);
  };

  // Show a blank screen while Firebase checks existing session
  if (authLoading) {
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

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard user={user} setView={setView} />;
      case 'journey': return <JourneyMap />;
      case 'resources': return <Resources />;
      case 'team': return <TeamDirectory />;
      case 'settings': return <Settings onLogout={handleLogout} />;
      default: return <Dashboard user={user} setView={setView} />;
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
