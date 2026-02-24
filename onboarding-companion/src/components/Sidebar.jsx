import React, { useState, useRef, useEffect } from 'react';
import { LayoutDashboard, Map, Library, Users, Settings, BarChart2, Search } from 'lucide-react';

const Sidebar = ({ currentView, setView, user, onLogout }) => {
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const profileRef = useRef(null);

    const menuItems = [
        { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
        { id: 'journey', label: 'My Journey', icon: Map },
        { id: 'resources', label: 'Resources', icon: Library },
        { id: 'team', label: 'Team Directory', icon: Users },
        { id: 'skillfinder', label: 'Skill Finder', icon: Search },
        { id: 'skills', label: 'My Skills', icon: BarChart2 },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    const getInitial = (name) => name ? name.charAt(0).toUpperCase() : '?';

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setShowProfileMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        setShowProfileMenu(false);
        if (onLogout) onLogout();
    };

    return (
        <div
            className="w-64 h-screen sticky top-0 flex flex-col pt-8 pb-6 px-4 shrink-0 transition-all duration-300 ease-in-out"
            style={{ background: 'var(--bg-sidebar)', borderRight: '1px solid var(--border-accent)' }}
        >
            {/* Brand */}
            <div className="mb-10 px-4 flex items-center gap-3">
                <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-base shadow-lg"
                    style={{ background: 'var(--accent)', color: '#262424' }}
                >
                    E
                </div>
                <div className="font-bold text-base tracking-tight leading-tight" style={{ color: 'var(--text-sidebar)' }}>
                    Onboarding<br />Companion
                </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-1.5 flex-1">
                <div className="text-xs font-semibold uppercase tracking-wider mb-4 px-4" style={{ color: 'rgba(249,239,223,0.35)' }}>Menu</div>
                {menuItems.map((item) => {
                    const isActive = currentView === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setView(item.id)}
                            className="w-full text-left px-4 py-2.5 rounded-lg flex items-center gap-3 transition-all duration-200 font-medium"
                            style={isActive
                                ? { background: 'var(--accent)', color: '#262424' }
                                : { color: 'rgba(249,239,223,0.55)' }
                            }
                            onMouseEnter={e => {
                                if (!isActive) {
                                    e.currentTarget.style.background = 'rgba(236,165,8,0.12)';
                                    e.currentTarget.style.color = 'var(--text-sidebar)';
                                }
                            }}
                            onMouseLeave={e => {
                                if (!isActive) {
                                    e.currentTarget.style.background = 'transparent';
                                    e.currentTarget.style.color = 'rgba(249,239,223,0.55)';
                                }
                            }}
                        >
                            <item.icon size={18} />
                            <span>{item.label}</span>
                        </button>
                    );
                })}
            </nav>

            {/* User Profile */}
            <div className="mt-auto pt-6 px-2 relative" style={{ borderTop: '1px solid rgba(236,165,8,0.12)' }} ref={profileRef}>
                {showProfileMenu && (
                    <div
                        className="absolute bottom-full left-0 right-0 mb-2 mx-1 rounded-xl shadow-2xl overflow-hidden z-50"
                        style={{ background: 'var(--bg-sidebar)', border: '1px solid rgba(236,165,8,0.15)' }}
                    >
                        <div className="px-4 py-3" style={{ borderBottom: '1px solid rgba(236,165,8,0.12)' }}>
                            <div className="text-sm font-semibold truncate" style={{ color: 'var(--text-sidebar)' }}>{user?.name || 'User'}</div>
                            <div className="text-xs truncate" style={{ color: 'rgba(249,239,223,0.45)' }}>{user?.email || ''}</div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm transition-all duration-150"
                            style={{ color: 'var(--peach)' }}
                        >
                            <LogOut size={16} />
                            <span>Logout</span>
                        </button>
                    </div>
                )}

                <button
                    onClick={() => setShowProfileMenu((prev) => !prev)}
                    className="flex items-center gap-3 p-2 rounded-xl transition-colors w-full"
                >
                    <div
                        className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shadow-lg shrink-0"
                        style={{ background: 'var(--accent)', color: '#262424' }}
                    >
                        {getInitial(user?.name)}
                    </div>
                    <div className="text-left flex-1 min-w-0">
                        <div className="text-sm font-semibold truncate" style={{ color: 'var(--text-sidebar)' }}>{user?.name || 'User'}</div>
                        <div className="text-xs truncate" style={{ color: 'rgba(249,239,223,0.45)' }}>{user?.role || 'Team Member'}</div>
                    </div>
                    <div className={`text-xs transition-transform duration-200 ${showProfileMenu ? 'rotate-180' : ''}`} style={{ color: 'rgba(249,239,223,0.35)' }}>▲</div>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
