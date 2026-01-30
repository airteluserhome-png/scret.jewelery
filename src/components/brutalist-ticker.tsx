"use client";

export default function BrutalistTicker({
    text = "⚠ LIMITED STOCK ⚠ SECRETLY ✽ 5 A SWISS MOVEMENT ✽ WORLDWIDE SHIPPING ✽ ICED OUT COLLECTION",
    rotated = false
}: { text?: string, rotated?: boolean }) {

    return (
        <div
            className={`
                w-full overflow-hidden bg-hot-pink text-white 
                py-4 md:py-4 whitespace-nowrap 
                ${rotated ? 'transform -rotate-1 scale-[1.02] border-[3px] border-black my-6 md:my-10' : 'border-y-[3px] border-black'}
            `}
        >
            <div className="ticker-track font-brutalist text-lg md:text-2xl lg:text-2xl tracking-wide font-bold">
                <span className="px-2 md:px-4">{text} ✽ {text} ✽ {text} ✽ {text}</span>
            </div>
            <style jsx>{`
                .ticker-track {
                    display: inline-block;
                    animation: ticker 20s linear infinite;
                    will-change: transform;
                }
                @keyframes ticker {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </div>
    );
}
