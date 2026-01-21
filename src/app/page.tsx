import BrutalistHeader from "@/components/brutalist-header";
import BrutalistTicker from "@/components/brutalist-ticker";
import BrutalistGrid from "@/components/brutalist-grid";

export default function Page() {
    return (
        <main className="min-h-screen bg-white text-hot-pink font-sans selection:bg-hot-pink selection:text-white">

            {/* Single Navigation + Massive Anton Title */}
            <BrutalistHeader />

            {/* Ticker with Anton Font */}
            <BrutalistTicker />

            {/* PLAIN WATCHES Section - Anton Font */}
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-brutalist p-4 md:p-6 lg:p-8 brutalist-border-b tracking-tight leading-none m-0">
                PLAIN WATCHES (5A)
            </h2>
            <BrutalistGrid category="plain-watches" ctaCard={{ text: "VIEW ALL", href: "/shop" }} />

            {/* Angled Ticker */}
            <div className="py-8 md:py-12 overflow-hidden">
                <BrutalistTicker text="SECRETLY ✽ ICED OUT COLLECTION ✽ FULL DIAMOND PAVÉ ✽ 5A SWISS" rotated={true} />
            </div>

            {/* ICED OUT Section - Anton Font */}
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-brutalist p-4 md:p-6 lg:p-8 brutalist-border-b tracking-tight leading-none m-0">
                ICED OUT (5A)
            </h2>
            <BrutalistGrid category="iced-watches" ctaCard={{ text: "CONTACT US", href: "/shop" }} />

            {/* Footer - SECRETLY with Anton */}
            <footer className="bg-hot-pink text-white p-6 md:p-12 lg:p-16 mt-8 md:mt-12">
                <h2
                    className="font-brutalist leading-none opacity-90 mb-4"
                    style={{ fontSize: '16vw' }}
                >
                    SECRETLY
                </h2>
                <p className="font-brutalist tracking-widest text-xs md:text-sm lg:text-base opacity-80">
                    LUXURY TIMEPIECES &amp; ACCESSORIES
                </p>
                <p className="mt-2 md:mt-4 font-bold tracking-widest uppercase text-xs md:text-sm">
                    Box and Papers Included.
                </p>
            </footer>

        </main>
    );
}
