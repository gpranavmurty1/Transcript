import React, { useState } from 'react';
import { Code2, LayoutGrid, Palette } from 'lucide-react';

const roles = [
    {
        id: 'engineering',
        label: 'Engineering',
        icon: Code2,
        description: 'Software engineers building products for our clients.',
        activeBg: '#262424',
        activeText: '#F9EFDF',
    },
    {
        id: 'product',
        label: 'Product',
        icon: LayoutGrid,
        description: 'Product managers defining and delivering value.',
        activeBg: '#ECA508',
        activeText: '#262424',
    },
    {
        id: 'design',
        label: 'Design',
        icon: Palette,
        description: 'Designers crafting beautiful, intuitive experiences.',
        activeBg: '#F97070',
        activeText: '#fff',
    },
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
        <div className="min-h-screen flex items-center justify-center p-6" style={{ background: '#F9EFDF' }}>
            <div className="max-w-2xl w-full">
                {/* Header */}
                <div className="text-center mb-10">
                    <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                        style={{ background: '#ECA508' }}
                    >
                        <span className="text-2xl font-bold" style={{ color: '#262424' }}>E</span>
                    </div>
                    <h1 className="text-3xl font-bold mb-2" style={{ color: '#262424' }}>
                        Welcome, {user?.displayName?.split(' ')[0]}! 👋
                    </h1>
                    <p className="text-lg" style={{ color: '#9e8e8e' }}>
                        To personalise your onboarding journey, tell us your role.
                    </p>
                </div>

                {/* Role Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    {roles.map(({ id, label, icon: Icon, description, activeBg, activeText }) => {
                        const isSelected = selected === id;
                        return (
                            <button
                                key={id}
                                onClick={() => setSelected(id)}
                                className="relative p-6 rounded-2xl text-left transition-all duration-200 hover:shadow-lg"
                                style={{
                                    background: isSelected ? activeBg : 'rgba(255,255,255,0.7)',
                                    border: isSelected ? `2px solid ${activeBg}` : '2px solid rgba(38,36,36,0.08)',
                                    color: isSelected ? activeText : '#262424',
                                }}
                            >
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                                    style={{
                                        background: isSelected ? 'rgba(255,255,255,0.2)' : 'rgba(38,36,36,0.06)',
                                    }}
                                >
                                    <Icon size={20} style={{ color: isSelected ? activeText : '#262424' }} />
                                </div>
                                <div className="font-bold text-lg mb-1">
                                    {label}
                                </div>
                                <div className="text-sm leading-relaxed" style={{ opacity: 0.7 }}>
                                    {description}
                                </div>
                                {isSelected && (
                                    <div
                                        className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                                        style={{ background: 'rgba(255,255,255,0.9)' }}
                                    >
                                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: activeBg }} />
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Confirm Button */}
                <button
                    onClick={handleConfirm}
                    disabled={!selected || saving}
                    className="w-full py-4 rounded-2xl font-bold text-lg transition-all duration-200"
                    style={selected && !saving
                        ? { background: '#262424', color: '#F9EFDF', boxShadow: '0 4px 20px rgba(38,36,36,0.2)' }
                        : { background: 'rgba(38,36,36,0.08)', color: 'rgba(38,36,36,0.3)', cursor: 'not-allowed' }
                    }
                >
                    {saving ? 'Setting up your journey…' : selected ? `Start my ${roles.find(r => r.id === selected)?.label} journey →` : 'Select your role to continue'}
                </button>

                <p className="text-center text-xs mt-4" style={{ color: '#9e8e8e' }}>
                    You can update this later in Settings.
                </p>
            </div>
        </div>
    );
};

export default RoleSelector;
