"use client";

import { useEffect, useState } from "react";

const watchFacts = [
    "The first wristwatch was made for a Countess in 1868.",
    "Rolex watches have visited the deepest point of the ocean.",
    "Patek Philippe watches are often auctioned for millions.",
    "The 'tick-tock' sound comes from the pallet fork locking.",
    "Automatic watches are powered by the motion of your wrist.",
    "A quartz watch uses a vibrating crystal to keep time.",
    "The most expensive watch ever sold was over $31 million.",
    "Sapphire crystal is nearly as hard as diamond.",
    "Watches worn on the moon must be manually wound.",
    "Switzerland produces about half of the world's luxury watches.",
    "The tourbillon was invented to counter gravity's effect on accuracy.",
    "Rolex uses a special steel called 904L, which is harder than normal steel.",
    "Cartier designed the first pilot watch in 1904.",
    "Juste un Clou bracelets by Cartier were designed in the 70s as a 'nail'.",
    "Van Cleef & Arpels Alhambra collection is inspired by four-leaf clovers.",
    "The Love Bracelet by Cartier requires a screwdriver to remove.",
    "G-Shock watches are designed to survive a 10-meter drop.",
    "The first waterproof watch was the Rolex Oyster.",
    "Diamonds are the hardest natural substance on Earth.",
    "Gold used in watches is often mixed with copper for durability.",
    "A 'chronograph' is just a fancy word for a stopwatch.",
    "Mechanical watches can have over 100 tiny parts.",
    "Audemars Piguet invented the first luxury sports watch in steel.",
    "The word 'watch' comes from Old English 'woecce' which means 'watchman'.",
    "Some watches can tell time in multiple time zones at once.",
    "The bezel on a diver's watch helps track oxygen time.",
    "Wearing a watch on your left hand is a tradition from WWI.",
    "A 'perpetual calendar' watch knows leap years automatically.",
    "Platinum is heavier and denser than gold.",
    "Rose gold gets its color from adding copper to gold.",
    "White gold is usually plated with rhodium to look shiny.",
    "The first digital watch was released in 1972 (the Hamilton Pulsar).",
    "Louis Cartier popularized the wristwatch for men.",
    "Some dive watches can go deeper than submarines.",
    "A 'skeleton' watch shows the moving parts inside.",
    "Watches were originally worn as pendants.",
    "Rolex creates all its own gold in a private foundry.",
    "The Apple Watch sells more units than the entire Swiss industry.",
    "A 'sweeping' second hand means the watch is mechanical.",
    "Quartz watches tick once per second to save battery.",
    "Tennis players wear ultra-light watches to avoid wrist drag.",
    "James Bond famously wore a Rolex Submariner.",
    "Later, James Bond switched to Omega Seamaster.",
    "Paul Newman's Rolex Daytona sold for $17.8 million.",
    "Watches lose accuracy near strong magnets.",
    "Ceramic watches are scratch-proof but can shatter if dropped.",
    "Lume on watch hands glows thanks to non-radioactive material today.",
    "Vintage watches used Radium for glow, which was dangerous.",
    "Titanium watches are 30% stronger than steel but lighter.",
    "A 'GMT' hand points to a second time zone.",
    "The world's most complicated watch has 57 functions.",
    "Vantablack watches absorb 99.9% of light.",
    "Meteorite dials are made from actual rocks from space.",
    "Synthetic rubies are used inside movements to reduce friction.",
    "A 'hacking' seconds hand stops when you pull the crown.",
    "Nato straps were invented for the British military.",
    "The 'Cyclops' lens on a Rolex magnifies the date 2.5 times.",
    "Patek Philippe slogans say you never actually own one, you look after it.",
    "Japanese quartz watches almost destroyed the Swiss industry in the 70s.",
    "Hand-engraving a watch movement can take hundreds of hours.",
    "Some watches use liquid to tell time (HYT).",
    "Richard Mille watches are inspired by F1 race cars.",
    "Tennis bracelets got their name when Chris Evert dropped hers on court.",
    "Cuban link chains originated in the hip-hop scene of the 70s.",
    "Your 'Secretly' watch is designed to look like a million bucks."
];

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function PaymentModal({ isOpen, onClose }: PaymentModalProps) {
    const [currentFact, setCurrentFact] = useState("");

    useEffect(() => {
        if (isOpen) {
            const randomIndex = Math.floor(Math.random() * watchFacts.length);
            setCurrentFact(watchFacts[randomIndex]);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999] payment-modal-overlay"
            onClick={onClose}
        >
            <div
                className="bg-white w-[90%] max-w-[500px] border-[4px] border-black shadow-[15px_15px_0_var(--neon-pink)] animate-modal-pop"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-hot-pink text-white p-4 font-brutalist text-xl border-b-[3px] border-black flex justify-between items-center">
                    <span>SYSTEM ALERT</span>
                    <button
                        onClick={onClose}
                        className="bg-black text-white w-8 h-8 font-bold text-lg hover:bg-white hover:text-black transition-colors"
                    >
                        ×
                    </button>
                </div>

                {/* Body */}
                <div className="p-8 text-center">
                    <h2 className="font-brutalist text-3xl md:text-4xl leading-none uppercase mb-5">
                        PAYMENT GATEWAY<br />
                        UNDER CONSTRUCTION
                    </h2>
                    <p className="text-base mb-6">
                        We are currently upgrading our secure servers.
                        <br />But since you're here, did you know...
                    </p>

                    {/* Fact Box */}
                    <div className="bg-gray-100 border-2 border-dashed border-black p-5 mt-5">
                        <div className="bg-black text-white inline-block px-3 py-1 font-brutalist -rotate-2 mb-3">
                            DID YOU KNOW?
                        </div>
                        <div className="font-bold text-lg text-dark">
                            {currentFact}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
