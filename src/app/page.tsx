import BrutalistHeader from "@/components/brutalist-header";
import BrutalistTicker from "@/components/brutalist-ticker";
import BrutalistGrid from "@/components/brutalist-grid";
import CrossTape from "@/components/cross-tape";
import FullProductGrid from "@/components/full-product-grid";
import BrutalistFooter from "@/components/brutalist-footer";

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
            <BrutalistFooter />

        </main>
    );
}
