import React, { useState, useRef, useEffect } from 'react';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, sender: 'bot', text: 'Hi Pranav! I noticed you are setting up your local environment. Need help with the `.env` variables?' }
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
                responseText = "For the VPN, you don't need the legacy Cisco client. Just install **Tailscale** and login with your Okta SSO. The configs are auto-applied.";
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
                <div className="glass-panel w-96 h-[500px] mb-4 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-300">
                    {/* Header */}
                    <div className="p-4 border-b border-white/10 bg-slate-900/50 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                            <span className="font-semibold text-sm">Onboarding Companion</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">✕</button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
                        {messages.map(msg => (
                            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-tr-sm' : 'bg-slate-700 text-gray-100 rounded-tl-sm'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-slate-700 p-3 rounded-2xl rounded-tl-sm text-sm text-gray-400">
                                    <span className="animate-pulse">●</span> <span className="animate-pulse delay-75">●</span> <span className="animate-pulse delay-150">●</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <div className="p-4 bg-slate-900/50 border-t border-white/10">
                        <div className="relative">
                            <input
                                type="text"
                                className="w-full bg-slate-800 border border-slate-700 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                                placeholder="Ask anything..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            />
                            <button
                                onClick={handleSend}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-400 hover:text-white transition-colors"
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
                className="btn-primary rounded-full w-14 h-14 flex items-center justify-center text-2xl shadow-lg hover:scale-105 transition-transform"
            >
                {isOpen ? '✕' : '✦'}
            </button>
        </div>
    );
};

export default ChatWidget;
