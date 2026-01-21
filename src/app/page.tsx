import EditorialHero from "@/components/editorial-hero";
import BrutalistTicker from "@/components/brutalist-ticker";
import BrutalistGrid from "@/components/brutalist-grid";
import CrossTape from "@/components/cross-tape";
import BrutalistCollage from "@/components/brutalist-collage";

export default function Page() {
    return (
        <main className="min-h-screen bg-off-white text-dark font-sans selection:bg-hot-pink selection:text-white">

            {/* Editorial Hero - Art Director Style */}
            <EditorialHero />

            {/* Ticker */}
            <BrutalistTicker />

            {/* PLAIN WATCHES Section */}
            <div className="px-4 md:px-8 lg:px-10 pt-8 md:pt-12">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-brutalist text-black brutalist-border-b pb-3 md:pb-4 tracking-[0.05em] leading-none">
                    PLAIN WATCHES (5A)
                </h2>
            </div>
            <BrutalistGrid category="plain-watches" ctaCard={{ text: "VIEW ALL", href: "/shop" }} />

            {/* Cross Tape Effect */}
            <CrossTape />

            {/* ICED OUT Section */}
            <div className="px-4 md:px-8 lg:px-10">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-brutalist text-black brutalist-border-b pb-3 md:pb-4 tracking-[0.05em] leading-none">
                    ICED OUT (5A)
                </h2>
            </div>
            <BrutalistGrid category="iced-watches" ctaCard={{ text: "CONTACT US", href: "/shop" }} />

            {/* Brutalist Collage Section */}
            <BrutalistCollage />

            {/* Footer */}
            <footer className="bg-black text-white p-6 md:p-12 lg:p-16 mt-12 md:mt-16 text-center">
                <h2
                    className="font-brutalist leading-none mb-4 tracking-[0.05em]"
                    style={{ fontSize: '12vw' }}
                >
                    SECURE THE BAG
                </h2>
                <p className="font-bold tracking-widest text-sm md:text-base lg:text-lg opacity-80 mt-6 uppercase">
                    SECRETLY - LUXURY TIMEPIECES
                </p>
                <p className="mt-2 md:mt-4 font-bold tracking-widest uppercase text-xs md:text-sm">
                    Box and Papers Included.
                </p>
            </footer>

        </main>
    );
}
