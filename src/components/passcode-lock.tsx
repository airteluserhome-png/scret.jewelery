"use client";

import { useState, useEffect } from "react";

export default function PasscodeLock({ children }: { children: React.ReactNode }) {
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [passcode, setPasscode] = useState("");
    const [error, setError] = useState(false);
    const [isClient, setIsClient] = useState(false);

    const CORRECT_PASSCODE = "8804";

    useEffect(() => {
        setIsClient(true);
        // Check if already unlocked in this session
        const unlocked = sessionStorage.getItem("site_unlocked");
        if (unlocked === "true") {
            setIsUnlocked(true);
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (passcode === CORRECT_PASSCODE) {
            setIsUnlocked(true);
            sessionStorage.setItem("site_unlocked", "true");
            setError(false);
        } else {
            setError(true);
            setPasscode("");

            // Shake animation
            setTimeout(() => setError(false), 500);
        }
    };

    // Prevent flash of content
    if (!isClient) {
        return null;
    }

    if (isUnlocked) {
        return <>{children}</>;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-off-white">
            <div className="w-full max-w-md px-6">
                {/* Lock Icon */}
                <div className="text-center mb-8">
                    <div className="inline-block p-6 bg-white border-[3px] border-black shadow-brutalist mb-6">
                        <svg
                            className="w-16 h-16 text-hot-pink"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                        </svg>
                    </div>

                    <h1 className="font-brutalist text-4xl md:text-5xl text-black mb-3 tracking-[0.05em]">
                        SECRETLY
                    </h1>
                    <p className="font-bold text-sm uppercase tracking-widest text-gray-600">
                        Enter Passcode to Continue
                    </p>
                </div>

                {/* Passcode Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input
                            type="password"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength={4}
                            value={passcode}
                            onChange={(e) => setPasscode(e.target.value.replace(/\D/g, ""))}
                            placeholder="••••"
                            className={`
                                w-full px-6 py-4 text-center text-3xl font-brutalist tracking-[0.5em]
                                bg-white border-[3px] border-black shadow-brutalist
                                focus:outline-none focus:shadow-brutalist-hover
                                transition-all duration-200
                                ${error ? 'animate-shake border-hot-pink' : ''}
                            `}
                            autoFocus
                        />
                        {error && (
                            <p className="mt-3 text-center text-sm font-bold text-hot-pink uppercase tracking-wider">
                                Incorrect Passcode
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={passcode.length !== 4}
                        className={`
                            w-full py-4 font-brutalist text-xl tracking-[0.1em] uppercase
                            transition-all duration-200
                            ${passcode.length === 4
                                ? 'bg-black text-white border-[3px] border-black shadow-brutalist hover:shadow-brutalist-hover active:translate-x-1 active:translate-y-1 active:shadow-none'
                                : 'bg-gray-200 text-gray-400 border-[3px] border-gray-300 cursor-not-allowed'
                            }
                        `}
                    >
                        UNLOCK
                    </button>
                </form>

                {/* Hint */}
                <p className="mt-8 text-center text-xs text-gray-400 uppercase tracking-widest">
                    Private Access Only
                </p>
            </div>

            <style jsx>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-10px); }
                    75% { transform: translateX(10px); }
                }
                .animate-shake {
                    animation: shake 0.3s ease-in-out;
                }
            `}</style>
        </div>
    );
}
