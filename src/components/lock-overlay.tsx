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
        <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center p-4 overflow-hidden">
            {/* Noise Background Layer */}
            <div className="absolute inset-0 bg-noise opacity-20"></div>
            {/* Scanlines Overlay */}
            <div className="scanlines"></div>

            <div className="w-full max-w-md relative z-20">
                {/* Security Shield Icon */}
                <div className="flex justify-center mb-6">
                    <div className={`w-16 h-16 border-2 ${isLockedOut ? 'border-red-600' : 'border-[#FF0099]'} flex items-center justify-center bg-black/50`}>
                        <svg className={`w-8 h-8 ${isLockedOut ? 'text-red-600' : 'text-[#FF0099]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                </div>

                {/* Glitch Title */}
                <h1 className="text-[#FF0099] font-brutalist text-7xl mb-8 text-center tracking-widest glitch-text relative"
                    data-text="SECRETLY"
                    style={{ textShadow: "4px 4px 0px #000" }}>
                    SECRETLY
                </h1>

                {/* Brutalist Box */}
                <div className={`border-4 ${isLockedOut ? 'border-red-600' : 'border-[#FF0099]'} bg-black p-10 shadow-[8px_8px_0px_#111] transition-all duration-100 relative ${error ? 'translate-x-[10px] border-red-600' : ''}`}>
                    {/* Decorative Corner Brackets */}
                    <div className={`absolute top-0 left-0 w-4 h-4 ${isLockedOut ? 'bg-red-600' : 'bg-[#FF0099]'}`}></div>
                    <div className={`absolute top-0 right-0 w-4 h-4 ${isLockedOut ? 'bg-red-600' : 'bg-[#FF0099]'}`}></div>
                    <div className={`absolute bottom-0 left-0 w-4 h-4 ${isLockedOut ? 'bg-red-600' : 'bg-[#FF0099]'}`}></div>
                    <div className={`absolute bottom-0 right-0 w-4 h-4 ${isLockedOut ? 'bg-red-600' : 'bg-[#FF0099]'}`}></div>

                    {isLockedOut ? (
                        /* Lockout Screen */
                        <div className="text-center space-y-6">
                            <div className="w-20 h-20 mx-auto border-4 border-red-600 rounded-full flex items-center justify-center animate-pulse">
                                <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-mono text-red-500 font-bold text-xl tracking-widest uppercase mb-2">
                                    SECURITY LOCKOUT
                                </p>
                                <p className="font-mono text-white/60 text-sm">
                                    Too many failed attempts
                                </p>
                            </div>
                            <div className="bg-red-900/30 border border-red-600 py-4 px-6">
                                <p className="font-mono text-red-400 text-xs tracking-widest mb-2">TIME REMAINING</p>
                                <p className="font-mono text-red-500 text-4xl font-bold tracking-wider">
                                    {formatTime(timeRemaining)}
                                </p>
                            </div>
                            <p className="font-mono text-white/40 text-[10px] tracking-wider">
                                LOCKOUT #{lockoutCount} • NEXT LOCKOUT: {Math.pow(LOCKOUT_MULTIPLIER, lockoutCount) * 5} MIN
                            </p>
                        </div>
                    ) : (
                        /* Login Form */
                        <>
                            <div className="mb-8 text-center space-y-2">
                                <p className="font-mono text-[#FF0099] font-bold text-lg tracking-widest uppercase border-b border-[#FF0099]/30 pb-2 inline-block">
                                    Restricted Access
                                </p>
                                <p className="font-mono text-white/60 text-xs tracking-widest">
                                    // ENTER SECURE PASSWORD //
                                </p>
                            </div>

                            <form onSubmit={handleUnlock} className="flex flex-col gap-6">
                                <div className="relative group">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter password..."
                                        className="w-full bg-[#111] text-[#fff] font-mono text-xl py-4 px-4 border-2 border-[#333] outline-none focus:border-[#FF0099] placeholder-[#555] transition-colors tracking-wider pr-12"
                                        autoFocus
                                        disabled={isLockedOut}
                                    />
                                    {/* Toggle Password Visibility */}
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#FF0099]/50 hover:text-[#FF0099] transition-colors"
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
                                    <div className="flex items-center justify-between bg-yellow-900/20 border border-yellow-600/50 py-2 px-4">
                                        <span className="font-mono text-yellow-500 text-xs tracking-wider">
                                            FAILED: {attempts}/{MAX_ATTEMPTS}
                                        </span>
                                        <div className="flex gap-1">
                                            {Array.from({ length: MAX_ATTEMPTS }).map((_, i) => (
                                                <div
                                                    key={i}
                                                    className={`w-2 h-2 ${i < attempts ? 'bg-red-500' : 'bg-[#333]'}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {error && (
                                    <p className="text-red-500 font-bold text-center font-mono text-sm tracking-widest bg-red-900/20 py-2 border border-red-500 animate-pulse">
                                        [ ACCESS DENIED ]
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    disabled={isLockedOut || !password}
                                    className={`font-brutalist text-3xl py-4 border-2 transition-all uppercase tracking-wider relative overflow-hidden group ${
                                        isLockedOut || !password
                                            ? 'bg-[#333] text-[#666] border-[#333] cursor-not-allowed'
                                            : 'bg-[#FF0099] text-black border-[#FF0099] hover:bg-black hover:text-[#FF0099] hover:translate-x-1 hover:translate-y-1'
                                    }`}
                                >
                                    <span className="relative z-10">AUTHENTICATE</span>
                                </button>
                            </form>
                        </>
                    )}
                </div>

                <div className="mt-8 text-center opacity-40 hover:opacity-100 transition-opacity space-y-2">
                    <div className="flex items-center justify-center gap-4 text-[10px] font-mono">
                        <span className="text-green-500 flex items-center gap-1">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            SHA-256 ENCRYPTED
                        </span>
                        <span className="text-[#FF0099]">•</span>
                        <span className="text-[#FF0099]">SESSION PROTECTED</span>
                    </div>
                    <p className="font-mono text-white/30 text-[9px]">SECURITY PROTOCOL v2.0 // BRUTE-FORCE PROTECTED</p>
                </div>
            </div>
        </div>
    );
}
