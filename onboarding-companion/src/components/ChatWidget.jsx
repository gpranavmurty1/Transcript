import React, { useState, useRef, useEffect } from 'react';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, sender: 'bot', text: 'Hi there! I noticed you are setting up your local environment. Need help with the `.env` variables?' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), sender: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Simulated AI Response
        setTimeout(() => {
            let responseText = "I'm not sure about that context yet. Try asking about the VPN or Figma setup.";

            const lowerInput = userMsg.text.toLowerCase();
            if (lowerInput.includes('vpn')) {
                responseText = "For the VPN, you don't need the legacy Cisco client. Just install Tailscale and login with your Okta SSO. The configs are auto-applied.";
            } else if (lowerInput.includes('figma')) {
                responseText = "I've pinned the 'Design System V2' file to your dashboard. Avoid the 'V1 Legacy' folder—it's from 2024.";
            } else if (lowerInput.includes('who')) {
                responseText = "For design questions, Sarah (your mentor) is the best contact.";
            }

            setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: responseText }]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">

            {/* Chat Window */}
            {isOpen && (
                <div
                    className="w-96 h-[500px] mb-4 flex flex-col overflow-hidden rounded-2xl shadow-2xl animate-in fade-in slide-in-from-bottom-10 duration-300"
                    style={{ background: '#F9EFDF', border: '1px solid rgba(236,165,8,0.2)' }}
                >
                    {/* Header */}
                    <div
                        className="p-4 flex justify-between items-center"
                        style={{ background: '#262424', borderBottom: '1px solid rgba(236,165,8,0.15)' }}
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#ECA508' }}></div>
                            <span className="font-semibold text-sm" style={{ color: '#F9EFDF' }}>Onboarding Companion</span>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-sm transition-colors"
                            style={{ color: 'rgba(249,239,223,0.5)' }}
                            onMouseEnter={e => e.currentTarget.style.color = '#F9EFDF'}
                            onMouseLeave={e => e.currentTarget.style.color = 'rgba(249,239,223,0.5)'}
                        >✕</button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
                        {messages.map(msg => (
                            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div
                                    className="max-w-[80%] p-3 rounded-2xl text-sm"
                                    style={msg.sender === 'user'
                                        ? { background: '#262424', color: '#F9EFDF', borderRadius: '1rem 1rem 2px 1rem' }
                                        : { background: 'rgba(255,255,255,0.8)', color: '#262424', borderRadius: '1rem 1rem 1rem 2px', border: '1px solid rgba(38,36,36,0.08)' }
                                    }
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div
                                    className="p-3 rounded-2xl text-sm"
                                    style={{ background: 'rgba(255,255,255,0.8)', color: '#9e8e8e', border: '1px solid rgba(38,36,36,0.08)', borderRadius: '1rem 1rem 1rem 2px' }}
                                >
                                    <span className="animate-pulse">●</span> <span className="animate-pulse delay-75">●</span> <span className="animate-pulse delay-150">●</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <div
                        className="p-4"
                        style={{ borderTop: '1px solid rgba(38,36,36,0.08)', background: 'rgba(255,255,255,0.5)' }}
                    >
                        <div className="relative">
                            <input
                                type="text"
                                className="w-full rounded-full px-4 py-2 text-sm focus:outline-none"
                                style={{
                                    background: 'rgba(255,255,255,0.9)',
                                    border: '1px solid rgba(38,36,36,0.12)',
                                    color: '#262424',
                                }}
                                placeholder="Ask anything..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                onFocus={e => e.currentTarget.style.borderColor = '#ECA508'}
                                onBlur={e => e.currentTarget.style.borderColor = 'rgba(38,36,36,0.12)'}
                            />
                            <button
                                onClick={handleSend}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-lg transition-colors"
                                style={{ color: '#ECA508' }}
                                disabled={!input.trim()}
                            >
                                ➝
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="rounded-full w-14 h-14 flex items-center justify-center text-2xl shadow-xl hover:scale-105 transition-transform"
                style={{ background: '#ECA508', color: '#262424' }}
                onMouseEnter={e => e.currentTarget.style.background = '#d4920a'}
                onMouseLeave={e => e.currentTarget.style.background = '#ECA508'}
            >
                {isOpen ? '✕' : '✦'}
            </button>
        </div>
    );
};

export default ChatWidget;
