import React from 'react';
import { User, Bell, Eye } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Settings = () => {
    const [slackConnected, setSlackConnected] = React.useState(false);
    const { theme, setTheme } = useTheme();

    const SectionCard = ({ icon, title, children }) => (
        <div
            className="rounded-2xl overflow-hidden"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
        >
            <div
                className="p-4 font-semibold flex items-center gap-2 text-sm"
                style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-primary)', background: 'rgba(128,128,128,0.04)' }}
            >
                {icon} {title}
            </div>
            <div className="p-6">{children}</div>
        </div>
    );

    return (
        <div className="p-10 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Settings</h1>
            <p className="mb-10" style={{ color: 'var(--text-muted)' }}>Manage your preferences and profile.</p>

            <div className="space-y-6">
                {/* Profile */}
                <SectionCard icon={<User size={18} />} title="Profile">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div
                                className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl"
                                style={{ background: 'var(--accent)', color: '#262424' }}
                            >
                                P
                            </div>
                            <button
                                className="text-sm font-medium transition-colors"
                                style={{ color: 'var(--accent)' }}
                            >
                                Change Avatar
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {[['Display Name', 'Pranav'], ['Role', 'Product Manager']].map(([label, val]) => (
                                <div key={label}>
                                    <label className="text-xs uppercase font-bold tracking-wider" style={{ color: 'var(--text-muted)' }}>{label}</label>
                                    <input
                                        type="text"
                                        defaultValue={val}
                                        className="w-full mt-1 rounded-lg px-3 py-2 text-sm focus:outline-none"
                                        style={{
                                            background: 'var(--bg-card)',
                                            border: '1px solid var(--border)',
                                            color: 'var(--text-primary)',
                                        }}
                                        readOnly
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </SectionCard>

                {/* Integrations */}
                <SectionCard icon={<span className="font-bold text-base">#</span>} title="Integrations">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors"
                                style={{ background: slackConnected ? '#4A154B' : 'var(--bg-card)' }}
                            >
                                <svg viewBox="0 0 24 24" className="w-6 h-6" fill={slackConnected ? '#fff' : 'var(--text-muted)'}>
                                    <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-3.791h-.001zm8.834 5.042a2.528 2.528 0 0 1-2.521-2.521A2.528 2.528 0 0 1 15.147 15.165h2.522a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521h-2.522zm0-1.27v-5.042a2.528 2.528 0 0 1 2.521-2.521 2.528 2.528 0 0 1 2.521 2.521v5.042a2.528 2.528 0 0 1-2.521 2.521 2.528 2.528 0 0 1-2.521-2.521zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522 2.521A2.528 2.528 0 0 1 18.956 13.876h-2.521V11.355a2.528 2.528 0 0 1 2.521-2.521zM15.147 6.313a2.528 2.528 0 0 1 2.521-2.521 2.528 2.528 0 0 1 2.521 2.521v2.52h-5.042a2.528 2.528 0 0 1-2.52-2.52z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Slack</h4>
                                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Receive daily digests and critical alerts.</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setSlackConnected(!slackConnected)}
                            className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                            style={slackConnected
                                ? { color: 'var(--accent)', background: 'rgba(236,165,8,0.1)', border: '1px solid var(--border-accent)' }
                                : { background: 'var(--bg-sidebar)', color: 'var(--text-sidebar)' }
                            }
                        >
                            {slackConnected ? 'Connected ✓' : 'Connect Account'}
                        </button>
                    </div>
                </SectionCard>

                {/* Notifications */}
                <SectionCard icon={<Bell size={18} />} title="Notifications">
                    <div className="space-y-4">
                        {['Email digests for daily summary', 'Slack alerts for critical tasks', 'Browser push notifications'].map((label, i) => (
                            <label
                                key={i}
                                className={`flex items-center justify-between cursor-pointer ${i === 1 && !slackConnected ? 'opacity-40 pointer-events-none' : ''}`}
                            >
                                <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{label}</span>
                                <div
                                    className="w-10 h-6 rounded-full relative transition-colors"
                                    style={{ background: i === 0 || (i === 1 && slackConnected) ? 'var(--accent)' : 'var(--border)' }}
                                >
                                    <div
                                        className="absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm"
                                        style={{ left: i === 0 || (i === 1 && slackConnected) ? '1.25rem' : '0.25rem' }}
                                    />
                                </div>
                            </label>
                        ))}
                    </div>
                </SectionCard>

                {/* Appearance — now functional */}
                <SectionCard icon={<Eye size={18} />} title="Appearance">
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Theme</span>
                            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                                Changes apply instantly and persist across sessions.
                            </p>
                        </div>
                        <select
                            value={theme}
                            onChange={(e) => setTheme(e.target.value)}
                            className="text-sm rounded-lg px-3 py-2 focus:outline-none transition-colors cursor-pointer"
                            style={{
                                background: 'var(--bg-card)',
                                border: '1px solid var(--border)',
                                color: 'var(--text-primary)',
                            }}
                        >
                            <option value="brand">🌅 Everest Brand</option>
                            <option value="light">☀️ Light Mode</option>
                            <option value="dark">🌙 Dark Mode</option>
                        </select>
                    </div>

                    {/* Live Theme Preview Chips */}
                    <div className="flex gap-2 mt-4">
                        {[
                            { id: 'brand', label: 'Brand', bg: '#F9EFDF', dot: '#ECA508' },
                            { id: 'light', label: 'Light', bg: '#ffffff', dot: '#ECA508' },
                            { id: 'dark', label: 'Dark', bg: '#1c1c1c', dot: '#ECA508' },
                        ].map(({ id, label, bg, dot }) => (
                            <button
                                key={id}
                                onClick={() => setTheme(id)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                                style={{
                                    background: bg,
                                    border: theme === id ? '2px solid var(--accent)' : '2px solid var(--border)',
                                    color: id === 'dark' ? '#f0ece4' : '#262424',
                                    boxShadow: theme === id ? '0 0 0 2px rgba(236,165,8,0.2)' : 'none',
                                }}
                            >
                                <span className="w-2.5 h-2.5 rounded-full" style={{ background: dot }} />
                                {label}
                            </button>
                        ))}
                    </div>
                </SectionCard>
            </div>
        </div>
    );
};

export default Settings;
