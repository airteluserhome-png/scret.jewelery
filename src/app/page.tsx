import BrutalistTicker from "@/components/brutalist-ticker";
import BrutalistGrid from "@/components/brutalist-grid";

export default function Page() {
    return (
        <main className="min-h-screen bg-white text-hot-pink font-sans selection:bg-hot-pink selection:text-white">

            {/* Top Bar */}
            <div className="flex justify-between items-center px-5 py-3 border-b-2 border-hot-pink font-bold text-xs md:text-sm tracking-widest uppercase">
                <span>Assistance</span>
                <span>Collection 2026</span>
                <span>Log In</span>
            </div>

            {/* Header */}
            <header className="border-b-2 border-hot-pink text-center py-12 md:py-24">
                <h1 className="text-[12vw] leading-[0.8] font-black uppercase tracking-tighter">
                    Accessory<br />Archive
                </h1>
            </header>

            {/* Main Ticker */}
            <BrutalistTicker />

            {/* PLAIN WATCHES Section */}
            <h2 className="text-4xl md:text-6xl font-black uppercase p-5 md:p-8 border-b-2 border-hot-pink tracking-tight leading-none">
                Plain Watches (5A)
            </h2>
            <BrutalistGrid category="plain-watches" ctaCard={{ text: "VIEW ALL", href: "/shop" }} />

            {/* Angled Ticker Between Sections */}
            <div className="py-12 overflow-hidden">
                <BrutalistTicker text="ICED OUT COLLECTION ✽ FULL DIAMOND PAVÉ ✽ 5A SWISS MOVEMENT ✽ BOX AND PAPERS" rotated={true} />
            </div>

            {/* ICED OUT Section */}
            <h2 className="text-4xl md:text-6xl font-black uppercase p-5 md:p-8 border-b-2 border-hot-pink tracking-tight leading-none">
                Iced Out (5A)
            </h2>
            <BrutalistGrid category="iced-watches" ctaCard={{ text: "CONTACT US", href: "/shop" }} />

            {/* Footer */}
            <footer className="bg-hot-pink text-white p-8 md:p-16 mt-12">
                <h2 className="text-[15vw] leading-none font-black uppercase opacity-90">
                    OFFICINE<br />PINK
                </h2>
                <p className="mt-8 font-bold tracking-widest uppercase text-sm md:text-base">Box and Papers Included.</p>
            </footer>

        </main>
    );
}
