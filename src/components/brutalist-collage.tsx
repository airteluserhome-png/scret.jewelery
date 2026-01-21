"use client";

import Image from "next/image";

export default function BrutalistCollage() {
    return (
        <div className="relative bg-off-white py-16 md:py-20 overflow-hidden brutalist-border-t brutalist-border-b my-12 md:my-16">
            {/* Diagonal Lines */}
            <div className="absolute left-[-10%] w-[120%] h-[2px] bg-black top-[30%] -rotate-[15deg] md:-rotate-[15deg] z-0" />
            <div className="absolute left-[-10%] w-[120%] h-[2px] bg-black top-[50%] -rotate-[15deg] md:-rotate-[15deg] z-0" />
            <div className="absolute left-[-10%] w-[120%] h-[2px] bg-black top-[70%] -rotate-[15deg] md:-rotate-[15deg] z-0" />

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10 max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">

                {/* Left: Large Featured Image */}
                <div className="flex items-center justify-center">
                    <div className="relative w-[90%] -rotate-2">
                        <Image
                            src="/ICED OUT AP/AP iced out rose gold.jpg"
                            alt="Featured Iced Watch"
                            width={600}
                            height={800}
                            className="w-full h-auto mix-blend-multiply"
                            style={{ filter: 'drop-shadow(0px 20px 20px rgba(0,0,0,0.2))' }}
                        />
                    </div>
                </div>

                {/* Right: Headline + Small Image */}
                <div className="flex flex-col justify-center">
                    {/* Massive Headline */}
                    <h2
                        className="font-brutalist leading-[0.85] uppercase text-black mb-8 lg:mb-12 text-center lg:text-left relative z-20"
                        style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}
                    >
                        <span className="text-hot-pink">*</span>OWN YOUR<br />
                        STYLE WITH<br />
                        <span className="text-hot-pink">ICED OUT</span><br />
                        LUXURY<span className="text-hot-pink">*</span>
                    </h2>

                    {/* Small Image - Bottom Right */}
                    <div className="w-[80%] lg:w-[60%] self-center lg:self-end relative z-0">
                        <div className="rotate-3">
                            <Image
                                src="/ICED OUT CARTIER/Iced out Cartier Santos white gold.jpg"
                                alt="Secondary Watch"
                                width={400}
                                height={500}
                                className="w-full h-auto mix-blend-multiply"
                                style={{ filter: 'drop-shadow(0px 15px 15px rgba(0,0,0,0.2))' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
