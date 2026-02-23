import React, { useState } from 'react';
import { Code2, LayoutGrid, Palette } from 'lucide-react';

const roles = [
    { id: 'engineering', label: 'Engineering', icon: Code2, description: 'Software engineers building products for our clients.' },
    { id: 'product', label: 'Product', icon: LayoutGrid, description: 'Product managers defining and delivering value.' },
    { id: 'design', label: 'Design', icon: Palette, description: 'Designers crafting beautiful, intuitive experiences.' },
];

const RoleSelector = ({ user, onRoleSelected }) => {
    const [selected, setSelected] = useState(null);
    const [saving, setSaving] = useState(false);

    const handleConfirm = async () => {
        if (!selected) return;
        setSaving(true);
        await onRoleSelected(selected);
        setSaving(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'var(--bg-primary)' }}>
            <div className="max-w-2xl w-full">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg" style={{ background: 'var(--accent)' }}>
                        <span className="text-2xl font-bold" style={{ color: '#262424' }}>E</span>
                    </div>
                    <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                        Welcome, {user?.displayName?.split(' ')[0]}! 👋
                    </h1>
                    <p className="text-lg" style={{ color: 'var(--text-muted)' }}>
                        To personalise your onboarding journey, tell us your role.
                    </p>
                </div>

                {/* Role Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    {roles.map(({ id, label, icon: Icon, description }) => {
                        const isSelected = selected === id;
                        return (
                            <button
                                key={id}
                                onClick={() => setSelected(id)}
                                className="relative p-6 rounded-2xl text-left transition-all duration-200 hover:shadow-lg"
                                style={{
                                    background: isSelected ? 'var(--bg-sidebar)' : 'var(--bg-card)',
                                    border: isSelected ? '2px solid var(--accent)' : '2px solid var(--border)',
                                    color: isSelected ? 'var(--text-sidebar)' : 'var(--text-primary)',
                                    boxShadow: isSelected ? '0 0 0 3px rgba(236,165,8,0.15)' : 'none',
                                }}
                            >
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                                    style={{ background: isSelected ? 'rgba(236,165,8,0.2)' : 'var(--border)' }}
                                >
                                    <Icon size={20} style={{ color: isSelected ? 'var(--accent)' : 'var(--text-primary)' }} />
                                </div>
                                <div className="font-bold text-lg mb-1">{label}</div>
                                <div className="text-sm leading-relaxed" style={{ opacity: 0.65 }}>{description}</div>
                                {isSelected && (
                                    <div className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'var(--accent)' }}>
                                        <div className="w-2 h-2 rounded-full bg-white" />
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Confirm */}
                <button
                    onClick={handleConfirm}
                    disabled={!selected || saving}
                    className="w-full py-4 rounded-2xl font-bold text-lg transition-all duration-200"
                    style={selected && !saving
                        ? { background: 'var(--bg-sidebar)', color: 'var(--text-sidebar)', boxShadow: '0 4px 20px var(--shadow)' }
                        : { background: 'var(--border)', color: 'var(--text-muted)', cursor: 'not-allowed' }
                    }
                >
                    {saving ? 'Setting up your journey…' : selected ? `Start my ${roles.find(r => r.id === selected)?.label} journey →` : 'Select your role to continue'}
                </button>

                <p className="text-center text-xs mt-4" style={{ color: 'var(--text-muted)' }}>You can update this later in Settings.</p>
            </div>
        </div>
    );
};

export default RoleSelector;
