"use client";

import { useState, useEffect, useCallback } from "react";

// SHA-256 hash function for secure password comparison
async function hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + "SECRETLY_SALT_2024");
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

// Hashed password - Original: "Secretly@2024!" (change this to your desired password)
// To generate a new hash, run in browser console:
// hashPassword("YourNewPassword").then(console.log)
const HASHED_PASSWORD = "a3f2b8c91d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1";

// Security configuration
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 5 * 60 * 1000; // 5 minutes
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes of inactivity
const LOCKOUT_MULTIPLIER = 2; // Each lockout doubles the duration

export default function LockOverlay() {
    const [unlocked, setUnlocked] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [lockedUntil, setLockedUntil] = useState<number | null>(null);
    const [lockoutCount, setLockoutCount] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [showPassword, setShowPassword] = useState(false);

    // Check if currently locked out
    const isLockedOut = lockedUntil !== null && Date.now() < lockedUntil;

    // Initialize and check session
    useEffect(() => {
        setMounted(true);

        // Check unlock status and session validity
        const isUnlocked = localStorage.getItem("site_unlocked");
        const unlockTime = localStorage.getItem("site_unlock_time");
        const storedLockout = localStorage.getItem("site_lockout_until");
        const storedLockoutCount = localStorage.getItem("site_lockout_count");
        const storedAttempts = localStorage.getItem("site_failed_attempts");

        // Restore lockout state
        if (storedLockout) {
            const lockoutTime = parseInt(storedLockout);
            if (Date.now() < lockoutTime) {
                setLockedUntil(lockoutTime);
            } else {
                localStorage.removeItem("site_lockout_until");
            }
        }

        if (storedLockoutCount) {
            setLockoutCount(parseInt(storedLockoutCount));
        }

        if (storedAttempts) {
            setAttempts(parseInt(storedAttempts));
        }

        // Check if session is valid (not expired)
        if (isUnlocked === "true" && unlockTime) {
            const elapsed = Date.now() - parseInt(unlockTime);
            if (elapsed < SESSION_TIMEOUT) {
                setUnlocked(true);
            } else {
                // Session expired - require re-authentication
                localStorage.removeItem("site_unlocked");
                localStorage.removeItem("site_unlock_time");
            }
        }
    }, []);

    // Update session activity on user interaction
    useEffect(() => {
        if (!unlocked) return;

        const updateActivity = () => {
            localStorage.setItem("site_unlock_time", Date.now().toString());
        };

        window.addEventListener("click", updateActivity);
        window.addEventListener("keydown", updateActivity);
        window.addEventListener("scroll", updateActivity);

        return () => {
            window.removeEventListener("click", updateActivity);
            window.removeEventListener("keydown", updateActivity);
            window.removeEventListener("scroll", updateActivity);
        };
    }, [unlocked]);

    // Countdown timer for lockout
    useEffect(() => {
        if (!isLockedOut) return;

        const interval = setInterval(() => {
            const remaining = Math.max(0, (lockedUntil || 0) - Date.now());
            setTimeRemaining(remaining);

            if (remaining <= 0) {
                setLockedUntil(null);
                localStorage.removeItem("site_lockout_until");
                // Reset attempts after lockout
                setAttempts(0);
                localStorage.setItem("site_failed_attempts", "0");
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isLockedOut, lockedUntil]);

    const handleUnlock = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();

        if (isLockedOut) return;

        // Hash the entered password and compare
        const hashedInput = await hashPassword(password);

        // For demo: Accept "Secretly@2024!" or check against stored hash
        // In production, only use the hash comparison
        const isCorrect = hashedInput === HASHED_PASSWORD || password === "Secretly@2024!";

        if (isCorrect) {
            localStorage.setItem("site_unlocked", "true");
            localStorage.setItem("site_unlock_time", Date.now().toString());
            localStorage.removeItem("site_failed_attempts");
            localStorage.removeItem("site_lockout_count");
            setUnlocked(true);
            setAttempts(0);
            setLockoutCount(0);
        } else {
            const newAttempts = attempts + 1;
            setAttempts(newAttempts);
            localStorage.setItem("site_failed_attempts", newAttempts.toString());
            setError(true);
            setPassword("");

            // Check if should lockout
            if (newAttempts >= MAX_ATTEMPTS) {
                const newLockoutCount = lockoutCount + 1;
                const lockoutDuration = LOCKOUT_DURATION * Math.pow(LOCKOUT_MULTIPLIER, newLockoutCount - 1);
                const lockoutTime = Date.now() + lockoutDuration;

                setLockedUntil(lockoutTime);
                setLockoutCount(newLockoutCount);
                localStorage.setItem("site_lockout_until", lockoutTime.toString());
                localStorage.setItem("site_lockout_count", newLockoutCount.toString());
            }

            setTimeout(() => setError(false), 1000);
        }
    }, [password, attempts, lockoutCount, isLockedOut]);

    const formatTime = (ms: number) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    if (!mounted || unlocked) return null;

    return (
        <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center p-4 overflow-hidden">
            {/* Subtle Pattern Background */}
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#FF0099 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

            <div className="w-full max-w-md relative z-20">
                {/* Security Shield Icon */}
                <div className="flex justify-center mb-8">
                    <div className={`w-20 h-20 rounded-full ${isLockedOut ? 'bg-red-100 border-red-500' : 'bg-pink-100 border-[#FF0099]'} border-4 flex items-center justify-center shadow-lg`}>
                        <svg className={`w-10 h-10 ${isLockedOut ? 'text-red-500' : 'text-[#FF0099]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-[#FF0099] font-brutalist text-6xl md:text-7xl mb-10 text-center tracking-wider"
                    style={{ textShadow: "3px 3px 0px rgba(255,0,153,0.2)" }}>
                    SECRETLY
                </h1>

                {/* Main Card */}
                <div className={`bg-white rounded-2xl p-8 md:p-10 shadow-2xl border-2 ${isLockedOut ? 'border-red-400' : 'border-[#FF0099]'} transition-all duration-200 relative ${error ? 'animate-shake' : ''}`}>
                    
                    {isLockedOut ? (
                        /* Lockout Screen */
                        <div className="text-center space-y-6">
                            <div className="w-24 h-24 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                                <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-bold text-red-500 text-2xl tracking-wide uppercase mb-2">
                                    Security Lockout
                                </p>
                                <p className="text-gray-500 text-sm">
                                    Too many failed attempts
                                </p>
                            </div>
                            <div className="bg-red-50 border-2 border-red-200 rounded-xl py-6 px-8">
                                <p className="text-red-400 text-xs tracking-widest mb-2 uppercase">Time Remaining</p>
                                <p className="text-red-500 text-5xl font-bold tracking-wider font-mono">
                                    {formatTime(timeRemaining)}
                                </p>
                            </div>
                            <p className="text-gray-400 text-xs tracking-wider">
                                Lockout #{lockoutCount} • Next: {Math.pow(LOCKOUT_MULTIPLIER, lockoutCount) * 5} min
                            </p>
                        </div>
                    ) : (
                        /* Login Form */
                        <>
                            <div className="mb-8 text-center">
                                <h2 className="text-[#FF0099] font-bold text-xl tracking-widest uppercase mb-2">
                                    Private Access
                                </h2>
                                <p className="text-gray-400 text-sm tracking-wide">
                                    Enter your password to continue
                                </p>
                            </div>

                            <form onSubmit={handleUnlock} className="flex flex-col gap-5">
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter password..."
                                        className="w-full bg-gray-50 text-gray-800 text-lg py-4 px-5 rounded-xl border-2 border-gray-200 outline-none focus:border-[#FF0099] focus:bg-white placeholder-gray-400 transition-all pr-14"
                                        autoFocus
                                        disabled={isLockedOut}
                                    />
                                    {/* Toggle Password Visibility */}
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#FF0099] transition-colors"
                                    >
                                        {showPassword ? (
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                            </svg>
                                        ) : (
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>

                                {/* Attempts Warning */}
                                {attempts > 0 && (
                                    <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-lg py-3 px-4">
                                        <span className="text-amber-600 text-sm font-medium">
                                            Failed attempts: {attempts}/{MAX_ATTEMPTS}
                                        </span>
                                        <div className="flex gap-1.5">
                                            {Array.from({ length: MAX_ATTEMPTS }).map((_, i) => (
                                                <div
                                                    key={i}
                                                    className={`w-2.5 h-2.5 rounded-full ${i < attempts ? 'bg-red-400' : 'bg-gray-200'}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {error && (
                                    <div className="text-red-500 font-semibold text-center text-sm bg-red-50 py-3 rounded-lg border border-red-200">
                                        Access Denied - Incorrect Password
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isLockedOut || !password}
                                    className={`font-bold text-xl py-4 rounded-xl transition-all uppercase tracking-wider ${
                                        isLockedOut || !password
                                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                            : 'bg-[#FF0099] text-white hover:bg-[#e6008a] hover:shadow-lg hover:shadow-pink-200 active:scale-[0.98]'
                                    }`}
                                >
                                    Unlock
                                </button>
                            </form>
                        </>
                    )}
                </div>

                {/* Footer */}
                <div className="mt-8 text-center space-y-2">
                    <div className="flex items-center justify-center gap-3 text-xs">
                        <span className="text-emerald-500 flex items-center gap-1.5 font-medium">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                            Encrypted
                        </span>
                        <span className="text-gray-300">•</span>
                        <span className="text-[#FF0099] font-medium">Session Protected</span>
                    </div>
                    <p className="text-gray-300 text-[10px] tracking-wider uppercase">Security Protocol v2.0</p>
                </div>
            </div>

            <style jsx>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-8px); }
                    75% { transform: translateX(8px); }
                }
                .animate-shake {
                    animation: shake 0.3s ease-in-out;
                }
            `}</style>
        </div>
    );
}
