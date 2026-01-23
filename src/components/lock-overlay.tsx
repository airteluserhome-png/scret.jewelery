"use client";

import { useState, useEffect } from "react";

export default function LockOverlay() {
    const [unlocked, setUnlocked] = useState(false);
    const [pin, setPin] = useState("");
    const [error, setError] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const isUnlocked = localStorage.getItem("site_unlocked");
        if (isUnlocked === "true") {
            setUnlocked(true);
        }
    }, []);

    const handleUnlock = (e: React.FormEvent) => {
        e.preventDefault();
        if (pin === "880410") {
            localStorage.setItem("site_unlocked", "true");
            setUnlocked(true);
        } else {
            setError(true);
            setPin("");
            setTimeout(() => setError(false), 1000);
        }
    };

    if (!mounted || unlocked) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center p-4 bg-noise overflow-hidden">
            {/* Scanlines Overlay */}
            <div className="scanlines"></div>

            <div className="w-full max-w-md relative z-20">
                {/* Glitch Title */}
                <h1 className="text-[#FF0099] font-brutalist text-7xl mb-12 text-center tracking-widest glitch-text relative"
                    data-text="SECRETLY"
                    style={{ textShadow: "4px 4px 0px #000" }}>
                    SECRETLY
                </h1>

                {/* Brutalist Box */}
                <div className={`border-4 border-[#FF0099] bg-black p-10 shadow-[8px_8px_0px_#111] transition-all duration-100 relative ${error ? 'translate-x-[10px] border-red-600' : ''}`}>
                    {/* Decorative Corner Brackets */}
                    <div className="absolute top-0 left-0 w-4 h-4 bg-[#FF0099]"></div>
                    <div className="absolute top-0 right-0 w-4 h-4 bg-[#FF0099]"></div>
                    <div className="absolute bottom-0 left-0 w-4 h-4 bg-[#FF0099]"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#FF0099]"></div>

                    <div className="mb-8 text-center space-y-2">
                        <p className="font-mono text-[#FF0099] font-bold text-lg tracking-widest uppercase border-b border-[#FF0099]/30 pb-2 inline-block">
                            Restricted Access
                        </p>
                        <p className="font-mono text-white/60 text-xs tracking-widest">
                            // ENTER AUTHORIZATION PIN //
                        </p>
                    </div>

                    <form onSubmit={handleUnlock} className="flex flex-col gap-6">
                        <div className="relative group">
                            <input
                                type="tel"
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                                placeholder="******"
                                className="w-full bg-[#111] text-[#fff] font-mono text-4xl text-center py-4 border-2 border-[#333] outline-none focus:border-[#FF0099] placeholder-[#333] transition-colors tracking-[1em]"
                                maxLength={6}
                                autoFocus
                            />
                            {/* Blinking Cursor Decoration */}
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-8 bg-[#FF0099] animate-pulse pointer-events-none opacity-50"></div>
                        </div>

                        {error && (
                            <p className="text-red-500 font-bold text-center font-mono text-sm tracking-widest bg-red-900/20 py-2 border border-red-500 animate-pulse">
                                [ ACCESS DENIED ]
                            </p>
                        )}

                        <button
                            type="submit"
                            className="bg-[#FF0099] text-black font-brutalist text-3xl py-4 border-2 border-[#FF0099] hover:bg-black hover:text-[#FF0099] transition-all hover:translate-x-1 hover:translate-y-1 uppercase tracking-wider relative overflow-hidden group"
                        >
                            <span className="relative z-10">ENTER_SYSTEM</span>
                        </button>
                    </form>
                </div>

                <div className="mt-12 text-center opacity-40 hover:opacity-100 transition-opacity">
                    <p className="font-mono text-[#FF0099] text-[10px] tracking-[0.2em] mb-1">SECURE CONNECTION :: ESTABLISHED</p>
                    <p className="font-mono text-white/30 text-[9px]">TERMINAL_ID: 880410-X // ENCRYPTED</p>
                </div>
            </div>
        </div>
    );
}
