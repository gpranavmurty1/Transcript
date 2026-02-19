import React, { useState } from 'react';
import { Mail, Check, Chrome } from 'lucide-react';

export default function Login({ onLogin }) {
  const [showAccounts, setShowAccounts] = useState(false);

  const mockUsers = [
    {
      id: 1,
      name: 'Pranav',
      email: 'pranav@company.com',
      role: 'Product Manager',
      avatar: 'P',
      color: 'bg-emerald-500'
    },
    {
      id: 2,
      name: 'Sarah',
      email: 'sarah@company.com',
      role: 'UX Designer',
      avatar: 'S',
      color: 'bg-purple-500'
    },
    {
      id: 3,
      name: 'Mike',
      email: 'mike@company.com',
      role: 'Software Engineer',
      avatar: 'M',
      color: 'bg-blue-500'
    }
  ];

  const handleGoogleClick = () => {
    // Simulate network delay or auth window opening
    setTimeout(() => {
      setShowAccounts(true);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-900">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-slate-900 to-slate-900 z-0"></div>
      <div className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]"></div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-md p-8 mx-4">
        <div className="glass-panel p-8 backdrop-blur-2xl border border-white/10 shadow-2xl animate-fade-in-up">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
              <span className="text-2xl font-bold text-white">OC</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-slate-400">Sign in to your dashboard</p>
          </div>

          {!showAccounts ? (
            /* Google Sign In Button */
            <div className="space-y-4">
              <button
                onClick={handleGoogleClick}
                className="w-full bg-white text-slate-900 hover:bg-slate-50 transition-all duration-300 font-semibold py-3.5 px-4 rounded-xl flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <img 
                  src="https://www.google.com/favicon.ico" 
                  alt="Google" 
                  className="w-5 h-5"
                />
                <span>Sign in with Google</span>
              </button>
              
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-transparent text-slate-500 bg-slate-900/40 backdrop-blur-xl">Current Session</span>
                </div>
              </div>

               <p className="text-center text-xs text-slate-500 max-w-xs mx-auto">
                 By continuing, you verify that you are an authorized employee of the organization.
               </p>
            </div>
          ) : (
            /* Account Selection */
            <div className="space-y-4 animate-fade-in">
              <div className="text-sm font-medium text-slate-400 mb-4 uppercase tracking-wider text-center">Choose an account</div>
              
              <div className="space-y-3">
                {mockUsers.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => onLogin(user)}
                    className="w-full group bg-slate-800/50 hover:bg-slate-700/50 border border-white/5 hover:border-blue-500/30 transition-all duration-200 p-3 rounded-xl flex items-center gap-4 text-left"
                  >
                    <div className={`w-10 h-10 rounded-full ${user.color} flex items-center justify-center text-white font-bold shadow-lg`}>
                      {user.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-medium group-hover:text-blue-400 transition-colors">{user.name}</div>
                      <div className="text-xs text-slate-400">{user.email}</div>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-400">
                      <Check className="w-5 h-5" />
                    </div>
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setShowAccounts(false)}
                className="w-full text-slate-400 hover:text-slate-200 text-sm mt-4 py-2"
              >
                Use another account
              </button>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="text-center mt-8 text-slate-500 text-sm">
          <p>© 2026 Onboarding Companion. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
