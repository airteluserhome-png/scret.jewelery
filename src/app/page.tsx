import BrutalistHeader from "@/components/brutalist-header";
import BrutalistTicker from "@/components/brutalist-ticker";
import BrutalistGrid from "@/components/brutalist-grid";

export default function Page() {
    return (
        <main className="min-h-screen bg-white text-hot-pink font-sans selection:bg-hot-pink selection:text-white">

            {/* Header with Navigation */}
            <BrutalistHeader />

            {/* Main Ticker */}
            <BrutalistTicker />

            {/* PLAIN WATCHES Section */}
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase p-4 md:p-6 lg:p-8 border-b-2 border-hot-pink tracking-tight leading-none">
                Plain Watches (5A)
            </h2>
            <BrutalistGrid category="plain-watches" ctaCard={{ text: "VIEW ALL", href: "/shop" }} />

            {/* Angled Ticker Between Sections */}
            <div className="py-8 md:py-12 overflow-hidden">
                <BrutalistTicker text="ICED OUT COLLECTION ✽ FULL DIAMOND PAVÉ ✽ 5A SWISS MOVEMENT ✽ BOX AND PAPERS" rotated={true} />
            </div>

            {/* ICED OUT Section */}
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase p-4 md:p-6 lg:p-8 border-b-2 border-hot-pink tracking-tight leading-none">
                Iced Out (5A)
            </h2>
            <BrutalistGrid category="iced-watches" ctaCard={{ text: "CONTACT US", href: "/shop" }} />

            {/* Footer - Mobile Optimized */}
            <footer className="bg-hot-pink text-white p-6 md:p-12 lg:p-16 mt-8 md:mt-12">
                <h2 className="text-[18vw] md:text-[15vw] leading-none font-black uppercase opacity-90">
                    OFFICINE<br />PINK
                </h2>
                <p className="mt-4 md:mt-8 font-bold tracking-widest uppercase text-xs md:text-sm lg:text-base">Box and Papers Included.</p>
            </footer>

        </main>
    );
}
