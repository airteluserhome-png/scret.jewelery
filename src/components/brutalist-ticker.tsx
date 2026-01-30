"use client";

export default function BrutalistTicker({
    text = "⚠ LIMITED STOCK ⚠ SECRETLY ✽ 5A SWISS MOVEMENT ✽ WORLDWIDE SHIPPING ✽ ICED OUT COLLECTION ✽ ",
    rotated = false
}: { text?: string, rotated?: boolean }) {

    // Duplicate text for seamless loop
    const fullText = `${text}${text}${text}${text}`;

    return (
        <div
            className={`
                w-full overflow-hidden bg-hot-pink text-white 
                py-4 md:py-4 whitespace-nowrap 
                ${rotated ? 'transform -rotate-1 scale-[1.02] border-[3px] border-black my-6 md:my-10' : 'border-y-[3px] border-black'}
            `}
        >
            <div className="ticker-track font-brutalist text-lg md:text-2xl lg:text-2xl tracking-wide font-bold flex">
                <span className="px-2 md:px-4">{fullText}</span>
                <span className="px-2 md:px-4">{fullText}</span>
            </div>
            <style jsx>{`
                .ticker-track {
                    animation: ticker 30s linear infinite;
                }
                @keyframes ticker {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </div>
    );
}
