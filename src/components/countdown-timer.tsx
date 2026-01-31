"use client";

import { useState, useEffect } from "react";

interface CountdownTimerProps {
    // End time as hours from now (for demo) or a specific date
    hoursFromNow?: number;
    endDate?: Date;
    label?: string;
}

export default function CountdownTimer({ 
    hoursFromNow = 24,
    endDate,
    label = "LIMITED DROP ENDS IN"
}: CountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const [isUrgent, setIsUrgent] = useState(false);

    useEffect(() => {
        // Calculate end time
        const end = endDate || new Date(Date.now() + hoursFromNow * 60 * 60 * 1000);
        
        // Store end time in sessionStorage to persist across page loads
        const storageKey = `countdown_end_${hoursFromNow}`;
        const storedEnd = sessionStorage.getItem(storageKey);
        
        let targetTime: Date;
        if (storedEnd) {
            targetTime = new Date(storedEnd);
            // If stored time has passed, set a new one
            if (targetTime.getTime() < Date.now()) {
                targetTime = end;
                sessionStorage.setItem(storageKey, end.toISOString());
            }
        } else {
            targetTime = end;
            sessionStorage.setItem(storageKey, end.toISOString());
        }

        const calculateTimeLeft = () => {
            const now = new Date().getTime();
            const distance = targetTime.getTime() - now;

            if (distance < 0) {
                return { hours: 0, minutes: 0, seconds: 0 };
            }

            return {
                hours: Math.floor(distance / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            };
        };

        // Initial calculation
        setTimeLeft(calculateTimeLeft());

        // Update every second
        const timer = setInterval(() => {
            const newTime = calculateTimeLeft();
            setTimeLeft(newTime);
            
            // Set urgent mode when under 1 hour
            setIsUrgent(newTime.hours === 0 && newTime.minutes < 60);
        }, 1000);

        return () => clearInterval(timer);
    }, [hoursFromNow, endDate]);

    const formatNumber = (num: number) => num.toString().padStart(2, '0');

    return (
        <div 
            className={`w-full py-3 px-4 ${isUrgent ? 'bg-[#FF0099]' : 'bg-black'} text-white transition-colors duration-300`}
            style={{
                border: "3px solid #000",
                boxShadow: isUrgent ? "4px 4px 0px #000" : "4px 4px 0px #FF0099"
            }}
        >
            {/* Label */}
            <div className="text-center mb-2">
                <span 
                    className="text-xs uppercase tracking-[0.2em] font-bold"
                    style={{
                        animation: isUrgent ? "pulse 1s ease-in-out infinite" : "none"
                    }}
                >
                    {isUrgent ? "⚡ HURRY! " : "⏰ "}{label}
                </span>
            </div>

            {/* Timer Display */}
            <div className="flex items-center justify-center gap-2 md:gap-4">
                {/* Hours */}
                <div className="text-center">
                    <div 
                        className="font-brutalist text-3xl md:text-4xl tracking-wider bg-white/10 px-3 py-1"
                        style={{
                            border: "2px solid rgba(255,255,255,0.3)",
                            minWidth: "60px"
                        }}
                    >
                        {formatNumber(timeLeft.hours)}
                    </div>
                    <span className="text-[10px] uppercase tracking-widest opacity-70 mt-1 block">HRS</span>
                </div>

                <span className="font-brutalist text-2xl md:text-3xl opacity-50">:</span>

                {/* Minutes */}
                <div className="text-center">
                    <div 
                        className="font-brutalist text-3xl md:text-4xl tracking-wider bg-white/10 px-3 py-1"
                        style={{
                            border: "2px solid rgba(255,255,255,0.3)",
                            minWidth: "60px"
                        }}
                    >
                        {formatNumber(timeLeft.minutes)}
                    </div>
                    <span className="text-[10px] uppercase tracking-widest opacity-70 mt-1 block">MIN</span>
                </div>

                <span className="font-brutalist text-2xl md:text-3xl opacity-50">:</span>

                {/* Seconds */}
                <div className="text-center">
                    <div 
                        className={`font-brutalist text-3xl md:text-4xl tracking-wider bg-white/10 px-3 py-1 ${isUrgent ? 'animate-pulse' : ''}`}
                        style={{
                            border: "2px solid rgba(255,255,255,0.3)",
                            minWidth: "60px"
                        }}
                    >
                        {formatNumber(timeLeft.seconds)}
                    </div>
                    <span className="text-[10px] uppercase tracking-widest opacity-70 mt-1 block">SEC</span>
                </div>
            </div>
        </div>
    );
}
