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
        <div className="fixed inset-0 z-[100] bg-[#111] flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md">
                <h1 className="text-[#FF0099] font-brutalist text-6xl mb-8 text-center tracking-wider"
                    style={{ textShadow: "4px 4px 0px #000" }}>
                    SECRETLY
                </h1>

                <div className={`border-4 border-[#FF0099] p-8 bg-white transition-transform duration-100 ${error ? 'translate-x-2' : ''}`}>
                    <div className="mb-6 text-center">
                        <p className="font-mono text-black font-bold text-xl mb-2">RESTRICTED ACCESS</p>
                        <p className="font-mono text-[#111]/60 text-sm">ENTER PIN TO CONTINUE</p>
                    </div>

                    <form onSubmit={handleUnlock} className="flex flex-col gap-4">
                        <input
                            type="tel" // optimized for numeric keyboard on mobile
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            placeholder="000000"
                            className="w-full bg-[#111] text-[#FF0099] font-mono text-3xl text-center py-4 border-2 border-black outline-none focus:border-[#FF0099] placeholder-[#333]"
                            maxLength={6}
                            autoFocus
                        />

                        {error && (
                            <p className="text-red-600 font-bold text-center font-mono animate-pulse">
                                ACCESS DENIED
                            </p>
                        )}

                        <button
                            type="submit"
                            className="bg-black text-white font-brutalist text-2xl py-4 border-2 border-black hover:bg-[#FF0099] hover:text-white transition-colors uppercase"
                        >
                            Enter
                        </button>
                    </form>
                </div>

                <div className="mt-8 text-center opacity-50">
                    <p className="font-mono text-[#FF0099] text-xs">SECURE CONNECTION ESTABLISHED</p>
                    <p className="font-mono text-white/40 text-[10px] mt-1">ID: 880410-X</p>
                </div>
            </div>
        </div>
    );
}
