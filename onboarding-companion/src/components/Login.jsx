import React, { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

export default function Login({ onLogin }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      onLogin({ name: user.displayName, email: user.email, photoURL: user.photoURL, role: 'Team Member' });
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user') setError('Sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      <div className="absolute -top-[15%] -left-[10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-30" style={{ background: 'var(--accent)' }}></div>
      <div className="absolute bottom-[5%] right-[5%] w-[400px] h-[400px] rounded-full blur-[120px] opacity-20" style={{ background: 'var(--peach)' }}></div>

      <div className="relative z-10 w-full max-w-md p-8 mx-4">
        <div className="glass-panel p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-lg" style={{ background: 'var(--accent)' }}>
              <span className="text-2xl font-bold" style={{ color: '#262424' }}>E</span>
            </div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Welcome to Everest</h1>
            <p style={{ color: 'var(--text-muted)' }}>Sign in to your onboarding dashboard</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full transition-all duration-300 font-semibold py-3.5 px-4 rounded-xl flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ background: 'var(--bg-sidebar)', color: 'var(--text-sidebar)' }}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" style={{ color: 'var(--accent)' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                  <span>Sign in with Google</span>
                </>
              )}
            </button>

            {error && <p className="text-center text-sm" style={{ color: 'var(--peach)' }}>{error}</p>}

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" style={{ borderColor: 'var(--border)' }}></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2" style={{ background: 'var(--bg-card)', color: 'var(--text-muted)' }}>Secure Sign-In</span>
              </div>
            </div>

            <p className="text-center text-xs max-w-xs mx-auto" style={{ color: 'var(--text-muted)' }}>
              By continuing, you verify that you are an authorized employee of the organization.
            </p>
          </div>
        </div>
        <div className="text-center mt-8 text-sm" style={{ color: 'var(--text-muted)' }}>
          <p>© 2026 Everest. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
