import React, { useState } from 'react';
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
  const [user, setUser] = useState({
    name: 'Pranav', // Default fallback, will be overwritten by login
    role: 'Product Manager',
    tenure: 'Day 2'
  });

  const [currentView, setView] = useState('dashboard');

  const handleLogin = (selectedUser) => {
    setUser({
      ...user,
      name: selectedUser.name,
      role: selectedUser.role ? selectedUser.role : 'Team Member',
      email: selectedUser.email
    });
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard user={user} setView={setView} />;
      case 'journey': return <JourneyMap />;
      case 'resources': return <Resources />;
      case 'team': return <TeamDirectory />;
      case 'settings': return <Settings />;
      default: return <Dashboard user={user} setView={setView} />;
    }
  };

  return (
    <div className="flex min-h-screen text-slate-200">
      <Sidebar currentView={currentView} setView={setView} user={user} />
      <main className="flex-1 overflow-y-auto h-screen">
        {renderView()}
      </main>
      <ChatWidget />
    </div>
  );
}

export default App;
