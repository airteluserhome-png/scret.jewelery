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
    label = "LIMITED OFFER ENDS IN"
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
            
            // Set urgent mode when under 2 hours
            setIsUrgent(newTime.hours < 2);
        }, 1000);

        return () => clearInterval(timer);
    }, [hoursFromNow, endDate]);

    const formatNumber = (num: number) => num.toString().padStart(2, '0');

    return (
        <div 
            className="w-full py-3 px-4 bg-white"
            style={{
                border: "2px solid #FF0099",
            }}
        >
            {/* Label */}
            <div className="text-center mb-3">
                <span 
                    className={`text-xs uppercase tracking-[0.15em] font-bold ${isUrgent ? 'text-[#FF0099]' : 'text-black/70'}`}
                >
                    {isUrgent ? "🔥 " : "⏰ "}{label}
                </span>
            </div>

            {/* Timer Display */}
            <div className="flex items-center justify-center gap-3 md:gap-4">
                {/* Hours */}
                <div className="text-center">
                    <div 
                        className={`font-brutalist text-2xl md:text-3xl tracking-wider px-3 py-2 ${isUrgent ? 'bg-[#FF0099] text-white' : 'bg-gray-100 text-black'}`}
                        style={{
                            border: "2px solid #000",
                            minWidth: "55px"
                        }}
                    >
                        {formatNumber(timeLeft.hours)}
                    </div>
                    <span className="text-[9px] uppercase tracking-widest text-black/50 mt-1 block font-bold">HRS</span>
                </div>

                <span className="font-brutalist text-xl md:text-2xl text-black/30">:</span>

                {/* Minutes */}
                <div className="text-center">
                    <div 
                        className={`font-brutalist text-2xl md:text-3xl tracking-wider px-3 py-2 ${isUrgent ? 'bg-[#FF0099] text-white' : 'bg-gray-100 text-black'}`}
                        style={{
                            border: "2px solid #000",
                            minWidth: "55px"
                        }}
                    >
                        {formatNumber(timeLeft.minutes)}
                    </div>
                    <span className="text-[9px] uppercase tracking-widest text-black/50 mt-1 block font-bold">MIN</span>
                </div>

                <span className="font-brutalist text-xl md:text-2xl text-black/30">:</span>

                {/* Seconds */}
                <div className="text-center">
                    <div 
                        className={`font-brutalist text-2xl md:text-3xl tracking-wider px-3 py-2 ${isUrgent ? 'bg-[#FF0099] text-white' : 'bg-gray-100 text-black'}`}
                        style={{
                            border: "2px solid #000",
                            minWidth: "55px"
                        }}
                    >
                        {formatNumber(timeLeft.seconds)}
                    </div>
                    <span className="text-[9px] uppercase tracking-widest text-black/50 mt-1 block font-bold">SEC</span>
                </div>
            </div>
        </div>
    );
}
