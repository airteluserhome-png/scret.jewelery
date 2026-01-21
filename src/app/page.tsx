import BrutalistHeader from "@/components/brutalist-header";
import BrutalistTicker from "@/components/brutalist-ticker";
import BrutalistGrid from "@/components/brutalist-grid";
import CrossTape from "@/components/cross-tape";
import FullProductGrid from "@/components/full-product-grid";

export default function Page() {
    return (
        <main className="min-h-screen bg-off-white text-dark font-sans selection:bg-hot-pink selection:text-white">

            {/* Header with 3D Text */}
            <BrutalistHeader />

            {/* Ticker */}
            <BrutalistTicker />

            {/* FULL COLLECTION */}
            <FullProductGrid />

            {/* Cross Tape Effect */}
            <CrossTape />

            {/* Footer */}
            <footer className="bg-black text-white p-6 md:p-12 lg:p-16 mt-12 md:mt-16 text-center">
                <h2
                    className="font-brutalist leading-none mb-4 tracking-[0.05em]"
                    style={{ fontSize: '12vw' }}
                >
                    SECURE THE BAG
                </h2>
                <p className="font-bold tracking-widest text-sm md:text-base lg:text-lg opacity-80 mt-6 uppercase">
                    SECRETLY - LUXURY GOODS
                </p>
                <p className="mt-2 md:mt-4 font-bold tracking-widest uppercase text-xs md:text-sm">
                    Box and Papers Included.
                </p>
            </footer>

        </main>
    );
}
