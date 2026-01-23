"use client";

import { useState, useEffect, useCallback } from "react";
import LuxuryLoader from "./luxury-loader";

// SHA-256 hash function for secure password comparison
async function hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + "SECRETLY_SALT_2024");
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

// Security configuration
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 5 * 60 * 1000; // 5 minutes
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes of inactivity
const LOCKOUT_MULTIPLIER = 2;

interface AuthGateProps {
    children: React.ReactNode;
}

export default function AuthGate({ children }: AuthGateProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [lockedUntil, setLockedUntil] = useState<number | null>(null);
    const [lockoutCount, setLockoutCount] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [showLoader, setShowLoader] = useState(true);

    const isLockedOut = lockedUntil !== null && Date.now() < lockedUntil;

    // Initialize - check if already authenticated
    useEffect(() => {
        const checkAuth = () => {
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

            if (storedLockoutCount) setLockoutCount(parseInt(storedLockoutCount));
            if (storedAttempts) setAttempts(parseInt(storedAttempts));

            // Check session validity
            if (isUnlocked === "true" && unlockTime) {
                const elapsed = Date.now() - parseInt(unlockTime);
                if (elapsed < SESSION_TIMEOUT) {
                    setIsAuthenticated(true);
                } else {
                    localStorage.removeItem("site_unlocked");
                    localStorage.removeItem("site_unlock_time");
                }
            }

            setIsLoading(false);
        };

        // Show loader first, then check auth
        const loaderTimer = setTimeout(() => {
            setShowLoader(false);
            checkAuth();
        }, 2000);

        return () => clearTimeout(loaderTimer);
    }, []);

    // Session activity tracking
    useEffect(() => {
        if (!isAuthenticated) return;

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
    }, [isAuthenticated]);

    // Lockout countdown
    useEffect(() => {
        if (!isLockedOut) return;

        const interval = setInterval(() => {
            const remaining = Math.max(0, (lockedUntil || 0) - Date.now());
            setTimeRemaining(remaining);

            if (remaining <= 0) {
                setLockedUntil(null);
                localStorage.removeItem("site_lockout_until");
                setAttempts(0);
                localStorage.setItem("site_failed_attempts", "0");
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isLockedOut, lockedUntil]);

    const handleUnlock = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (isLockedOut) return;

        const isCorrect = password === "Secretly@2024!";

        if (isCorrect) {
            localStorage.setItem("site_unlocked", "true");
            localStorage.setItem("site_unlock_time", Date.now().toString());
            localStorage.removeItem("site_failed_attempts");
            localStorage.removeItem("site_lockout_count");
            setIsAuthenticated(true);
            setAttempts(0);
            setLockoutCount(0);
        } else {
            const newAttempts = attempts + 1;
            setAttempts(newAttempts);
            localStorage.setItem("site_failed_attempts", newAttempts.toString());
            setError(true);
            setPassword("");

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

    // Show loader first
    if (showLoader) {
        return <LuxuryLoader />;
    }

    // Still checking auth status
    if (isLoading) {
        return null;
    }

    // AUTHENTICATED - Render children
    if (isAuthenticated) {
        return <>{children}</>;
    }

    // NOT AUTHENTICATED - Show lock screen (no content rendered)
    return (
        <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center p-4 overflow-hidden">
            
            <div className="w-full max-w-md relative z-20">
                {/* Brutalist Logo */}
                <h1 className="font-brutalist text-6xl md:text-8xl mb-12 text-center tracking-wider text-black"
                    style={{ textShadow: "4px 4px 0px #FF0099" }}>
                    SECRETLY
                </h1>

                {/* Brutalist Card */}
                <div className={`relative bg-white p-8 md:p-10 transition-all duration-100 ${error ? 'translate-x-2' : ''}`}
                    style={{ border: '3px solid', borderColor: isLockedOut ? '#ef4444' : '#000', boxShadow: isLockedOut ? '8px 8px 0px #ef4444' : '8px 8px 0px #FF0099' }}>
                    
                    {/* Corner Brackets */}
                    <div className={`absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 ${isLockedOut ? 'border-red-500' : 'border-black'}`}></div>
                    <div className={`absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 ${isLockedOut ? 'border-red-500' : 'border-black'}`}></div>
                    <div className={`absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 ${isLockedOut ? 'border-red-500' : 'border-black'}`}></div>
                    <div className={`absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 ${isLockedOut ? 'border-red-500' : 'border-black'}`}></div>

                    {isLockedOut ? (
                        <div className="text-center space-y-6">
                            <div className="w-20 h-20 mx-auto border-4 border-red-500 flex items-center justify-center bg-white"
                                style={{ boxShadow: '4px 4px 0px #000' }}>
                                <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-brutalist text-red-500 text-3xl tracking-wider uppercase mb-2">LOCKOUT</p>
                                <p className="font-bold text-black/60 text-sm uppercase tracking-widest">Too many failed attempts</p>
                            </div>
                            <div className="bg-white py-6 px-8" style={{ border: '3px solid #ef4444', boxShadow: '4px 4px 0px #000' }}>
                                <p className="font-bold text-red-500 text-xs tracking-widest mb-2 uppercase">Time Remaining</p>
                                <p className="font-brutalist text-red-500 text-5xl tracking-wider">{formatTime(timeRemaining)}</p>
                            </div>
                            <p className="font-bold text-black/40 text-xs tracking-widest uppercase">
                                Lockout #{lockoutCount} • Next: {Math.pow(LOCKOUT_MULTIPLIER, lockoutCount) * 5} min
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="flex justify-center mb-6">
                                <div className="w-16 h-16 flex items-center justify-center bg-white"
                                    style={{ border: '3px solid #000', boxShadow: '4px 4px 0px #FF0099' }}>
                                    <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                            </div>

                            <div className="mb-8 text-center">
                                <h2 className="font-brutalist text-black text-2xl tracking-wider uppercase mb-2">Private Access</h2>
                                <p className="font-bold text-black/50 text-xs uppercase tracking-widest">Enter password to continue</p>
                            </div>

                            <form onSubmit={handleUnlock} className="flex flex-col gap-5">
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="PASSWORD"
                                        className="w-full bg-white text-black font-bold text-lg py-4 px-5 outline-none placeholder-black/30 transition-all pr-14 uppercase tracking-widest focus:shadow-[4px_4px_0px_#FF0099]"
                                        style={{ border: '3px solid #000', boxShadow: '4px 4px 0px #000' }}
                                        autoFocus
                                        disabled={isLockedOut}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 hover:text-[#FF0099] transition-colors"
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

                                {attempts > 0 && (
                                    <div className="flex items-center justify-between bg-white py-3 px-4"
                                        style={{ border: '3px solid #eab308', boxShadow: '4px 4px 0px #000' }}>
                                        <span className="font-bold text-yellow-600 text-xs uppercase tracking-widest">
                                            Failed: {attempts}/{MAX_ATTEMPTS}
                                        </span>
                                        <div className="flex gap-1.5">
                                            {Array.from({ length: MAX_ATTEMPTS }).map((_, i) => (
                                                <div key={i} className={`w-3 h-3 border-2 border-black ${i < attempts ? 'bg-red-500' : 'bg-white'}`} />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {error && (
                                    <div className="font-brutalist text-red-500 text-center text-lg bg-white py-3 uppercase tracking-wider"
                                        style={{ border: '3px solid #ef4444', boxShadow: '4px 4px 0px #000' }}>
                                        Access Denied
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isLockedOut || !password}
                                    className={`font-brutalist text-2xl py-4 transition-all uppercase tracking-wider ${
                                        isLockedOut || !password
                                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                            : 'bg-black text-white hover:bg-[#FF0099] hover:-translate-x-1 hover:-translate-y-1'
                                    }`}
                                    style={{ 
                                        border: isLockedOut || !password ? '3px solid #d1d5db' : '3px solid #000',
                                        boxShadow: isLockedOut || !password ? 'none' : '5px 5px 0px #FF0099' 
                                    }}
                                >
                                    Unlock
                                </button>
                            </form>
                        </>
                    )}
                </div>

                <div className="mt-10 text-center">
                    <p className="font-bold text-black/40 text-[10px] tracking-[0.3em] uppercase">
                        Secretly • Luxury Goods • Private
                    </p>
                </div>
            </div>
        </div>
    );
}
