"use client";

import { useEffect, useState } from "react";

export default function KillSwitch() {
    const [isKilled, setIsKilled] = useState(false);
    const [message, setMessage] = useState("Site temporarily unavailable");

    useEffect(() => {
        // Check kill switch status on mount
        const checkKillSwitch = async () => {
            try {
                const response = await fetch("/api/kill-switch", {
                    cache: "no-store",
                });
                const data = await response.json();
                
                if (data.killed) {
                    setIsKilled(true);
                    setMessage(data.message || "Site temporarily unavailable");
                }
            } catch {
                // If API fails, don't lock (fail open for legitimate users)
            }
        };

        checkKillSwitch();
        
        // Check periodically (every 30 seconds)
        const interval = setInterval(checkKillSwitch, 30000);
        
        return () => clearInterval(interval);
    }, []);

    if (!isKilled) return null;

    return (
        <div className="fixed inset-0 z-[99999] bg-white flex items-center justify-center">
            <div className="text-center p-8 max-w-md">
                <div 
                    className="w-24 h-24 mx-auto mb-8 bg-black flex items-center justify-center"
                    style={{ border: "4px solid #000", boxShadow: "8px 8px 0px #FF0099" }}
                >
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
                
                <h1 
                    className="font-brutalist text-4xl md:text-5xl text-black mb-4 uppercase"
                    style={{ textShadow: "3px 3px 0px #FF0099" }}
                >
                    SECRETLY
                </h1>
                
                <p className="text-black/70 font-bold uppercase tracking-widest text-sm mb-6">
                    {message}
                </p>
                
                <div 
                    className="bg-gray-100 p-4"
                    style={{ border: "3px solid #000" }}
                >
                    <p className="text-xs text-black/50 uppercase tracking-wider">
                        We&apos;ll be back soon. For inquiries contact support.
                    </p>
                </div>
            </div>
        </div>
    );
}
