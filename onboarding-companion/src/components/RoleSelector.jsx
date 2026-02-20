import React, { useState } from 'react';
import { Code2, LayoutGrid, Palette } from 'lucide-react';

const roles = [
    {
        id: 'engineering',
        label: 'Engineering',
        icon: Code2,
        description: 'Software engineers building products for our clients.',
        color: 'from-blue-600 to-blue-800',
        border: 'border-blue-500',
        glow: 'hover:shadow-blue-500/20',
    },
    {
        id: 'product',
        label: 'Product',
        icon: LayoutGrid,
        description: 'Product managers defining and delivering value.',
        color: 'from-violet-600 to-violet-800',
        border: 'border-violet-500',
        glow: 'hover:shadow-violet-500/20',
    },
    {
        id: 'design',
        label: 'Design',
        icon: Palette,
        description: 'Designers crafting beautiful, intuitive experiences.',
        color: 'from-pink-600 to-pink-800',
        border: 'border-pink-500',
        glow: 'hover:shadow-pink-500/20',
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
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
            <div className="max-w-2xl w-full">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/20">
                        <span className="text-2xl font-bold text-white">OC</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Welcome, {user?.displayName?.split(' ')[0]}! 👋
                    </h1>
                    <p className="text-slate-400 text-lg">
                        To personalise your onboarding journey, tell us your role.
                    </p>
                </div>

                {/* Role Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    {roles.map(({ id, label, icon: Icon, description, color, border, glow }) => {
                        const isSelected = selected === id;
                        return (
                            <button
                                key={id}
                                onClick={() => setSelected(id)}
                                className={`relative p-6 rounded-2xl border-2 text-left transition-all duration-200 group
                  ${isSelected
                                        ? `border-transparent bg-gradient-to-br ${color} shadow-xl ${glow}`
                                        : 'border-slate-800 bg-slate-900/50 hover:border-slate-600'
                                    } hover:shadow-lg`}
                            >
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4
                  ${isSelected ? 'bg-white/20' : 'bg-slate-800'}`}>
                                    <Icon size={20} className={isSelected ? 'text-white' : 'text-slate-400'} />
                                </div>
                                <div className={`font-bold text-lg mb-1 ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                                    {label}
                                </div>
                                <div className={`text-sm leading-relaxed ${isSelected ? 'text-white/70' : 'text-slate-500'}`}>
                                    {description}
                                </div>
                                {isSelected && (
                                    <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-white flex items-center justify-center">
                                        <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
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
                    className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-200
            ${selected && !saving
                            ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:from-blue-500 hover:to-violet-500 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40'
                            : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        }`}
                >
                    {saving ? 'Setting up your journey…' : selected ? `Start my ${roles.find(r => r.id === selected)?.label} journey →` : 'Select your role to continue'}
                </button>

                <p className="text-center text-xs text-slate-600 mt-4">
                    You can update this later in Settings.
                </p>
            </div>
        </div>
    );
};

export default RoleSelector;
