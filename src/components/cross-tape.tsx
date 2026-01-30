"use client";

export default function CrossTape() {
    const blackText = "SECRETLY JEWELRY ✦ PREMIUM QUALITY ✦ FULL PACKAGING INCLUDED ✦ 100% SECURE CHECKOUT ✦ ";
    const pinkText = "NEW DROPS: ROLEX, AP, PATEK ✦ ICED OUT COLLECTION RESTOCKED ✦ WORLDWIDE SHIPPING ✦ ";

    return (
        <div className="relative h-[180px] md:h-[250px] overflow-hidden flex items-center justify-center my-12 md:my-16 lg:my-20 bg-transparent">
            {/* Black Tape - Trust & Credentials */}
            <div
                className="absolute w-[200%] left-[-50%] bg-black text-white py-[12px] md:py-[18px] font-brutalist text-lg md:text-2xl lg:text-3xl uppercase whitespace-nowrap border-y-[3px] border-white shadow-[0_10px_20px_rgba(0,0,0,0.15)] overflow-hidden"
                style={{ transform: 'rotate(-5deg)', zIndex: 2, letterSpacing: '1px' }}
            >
                <div className="tape-scroll-left flex">
                    <span className="px-2">{blackText}{blackText}{blackText}{blackText}</span>
                    <span className="px-2">{blackText}{blackText}{blackText}{blackText}</span>
                </div>
            </div>

            {/* Pink Tape - New Drops & Hype */}
            <div
                className="absolute w-[200%] left-[-50%] bg-hot-pink text-white py-[12px] md:py-[18px] font-brutalist text-lg md:text-2xl lg:text-3xl uppercase whitespace-nowrap border-y-[3px] border-white shadow-[0_10px_20px_rgba(0,0,0,0.15)] overflow-hidden"
                style={{ transform: 'rotate(5deg)', zIndex: 1, letterSpacing: '1px' }}
            >
                <div className="tape-scroll-right flex">
                    <span className="px-2">{pinkText}{pinkText}{pinkText}{pinkText}</span>
                    <span className="px-2">{pinkText}{pinkText}{pinkText}{pinkText}</span>
                </div>
            </div>

            <style jsx>{`
                .tape-scroll-left {
                    animation: scrollLeft 25s linear infinite;
                }
                .tape-scroll-right {
                    animation: scrollRight 30s linear infinite;
                }
                @keyframes scrollLeft {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes scrollRight {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }
            `}</style>
        </div>
    );
}
