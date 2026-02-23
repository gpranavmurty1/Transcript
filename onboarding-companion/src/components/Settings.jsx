import React from 'react';
import { User, Bell, Eye } from 'lucide-react';

const Settings = () => {
    const [slackConnected, setSlackConnected] = React.useState(false);

    const handleConnectSlack = () => {
        setSlackConnected(!slackConnected);
    };

    const SectionCard = ({ icon, title, children }) => (
        <div
            className="rounded-2xl overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.65)', border: '1px solid rgba(38,36,36,0.08)' }}
        >
            <div
                className="p-4 font-semibold flex items-center gap-2 text-sm"
                style={{ borderBottom: '1px solid rgba(38,36,36,0.07)', color: '#262424', background: 'rgba(38,36,36,0.03)' }}
            >
                {icon} {title}
            </div>
            <div className="p-6">{children}</div>
        </div>
    );

    return (
        <div className="p-10 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-2" style={{ color: '#262424' }}>Settings</h1>
            <p className="mb-10" style={{ color: '#9e8e8e' }}>Manage your preferences and profile.</p>

            <div className="space-y-6">
                {/* Profile */}
                <SectionCard icon={<User size={18} />} title="Profile">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div
                                className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl"
                                style={{ background: '#ECA508', color: '#262424' }}
                            >
                                P
                            </div>
                            <div>
                                <button
                                    className="text-sm font-medium transition-colors"
                                    style={{ color: '#ECA508' }}
                                    onMouseEnter={e => e.currentTarget.style.color = '#d4920a'}
                                    onMouseLeave={e => e.currentTarget.style.color = '#ECA508'}
                                >
                                    Change Avatar
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs uppercase font-bold tracking-wider" style={{ color: '#9e8e8e' }}>Display Name</label>
                                <input
                                    type="text"
                                    defaultValue="Pranav"
                                    className="w-full mt-1 rounded-lg px-3 py-2 text-sm focus:outline-none"
                                    style={{
                                        background: 'rgba(38,36,36,0.05)',
                                        border: '1px solid rgba(38,36,36,0.1)',
                                        color: '#262424',
                                    }}
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="text-xs uppercase font-bold tracking-wider" style={{ color: '#9e8e8e' }}>Role</label>
                                <input
                                    type="text"
                                    defaultValue="Product Manager"
                                    className="w-full mt-1 rounded-lg px-3 py-2 text-sm focus:outline-none"
                                    style={{
                                        background: 'rgba(38,36,36,0.05)',
                                        border: '1px solid rgba(38,36,36,0.1)',
                                        color: '#262424',
                                    }}
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
                </SectionCard>

                {/* Integrations */}
                <SectionCard icon={<span className="font-bold text-base">#</span>} title="Integrations">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors"
                                style={{ background: slackConnected ? '#4A154B' : 'rgba(38,36,36,0.08)' }}
                            >
                                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white" style={{ color: slackConnected ? '#fff' : '#9e8e8e' }}>
                                    <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-3.791h-.001zm8.834 5.042a2.528 2.528 0 0 1-2.521-2.521A2.528 2.528 0 0 1 15.147 15.165h2.522a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521h-2.522zm0-1.27v-5.042a2.528 2.528 0 0 1 2.521-2.521 2.528 2.528 0 0 1 2.521 2.521v5.042a2.528 2.528 0 0 1-2.521 2.521 2.528 2.528 0 0 1-2.521-2.521zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522 2.521A2.528 2.528 0 0 1 18.956 13.876h-2.521V11.355a2.528 2.528 0 0 1 2.521-2.521zM15.147 6.313a2.528 2.528 0 0 1 2.521-2.521 2.528 2.528 0 0 1 2.521 2.521v2.52h-5.042a2.528 2.528 0 0 1-2.52-2.52z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-semibold" style={{ color: '#262424' }}>Slack</h4>
                                <p className="text-xs" style={{ color: '#9e8e8e' }}>Receive daily digests and critical alerts.</p>
                            </div>
                        </div>
                        <button
                            onClick={handleConnectSlack}
                            className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                            style={slackConnected
                                ? { color: '#ECA508', background: 'rgba(236,165,8,0.08)', border: '1px solid rgba(236,165,8,0.25)' }
                                : { background: '#262424', color: '#F9EFDF' }
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
                                <span className="text-sm" style={{ color: '#262424' }}>{label}</span>
                                <div
                                    className="w-10 h-6 rounded-full relative transition-colors"
                                    style={{ background: i === 0 || (i === 1 && slackConnected) ? '#ECA508' : 'rgba(38,36,36,0.12)' }}
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

                {/* Appearance */}
                <SectionCard icon={<Eye size={18} />} title="Appearance">
                    <div className="flex items-center justify-between">
                        <span className="text-sm" style={{ color: '#262424' }}>Theme</span>
                        <select
                            className="text-sm rounded-lg px-3 py-1.5 focus:outline-none"
                            style={{
                                background: 'rgba(38,36,36,0.05)',
                                border: '1px solid rgba(38,36,36,0.1)',
                                color: '#262424',
                            }}
                        >
                            <option>Everest Brand (Default)</option>
                            <option>Light Mode</option>
                            <option>Dark Mode</option>
                        </select>
                    </div>
                </SectionCard>
            </div>
        </div>
    );
};

export default Settings;
