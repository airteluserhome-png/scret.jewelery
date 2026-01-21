import BrutalistHeader from "@/components/brutalist-header";
import BrutalistTicker from "@/components/brutalist-ticker";
import BrutalistGrid from "@/components/brutalist-grid";
import CrossTape from "@/components/cross-tape";
import BackButton from "@/components/back-button";

export default function AccessoriesPage() {
    return (
        <main className="min-h-screen bg-off-white text-dark font-sans selection:bg-hot-pink selection:text-white">
            <BrutalistHeader />

            <div className="px-4 md:px-8 lg:px-10 pt-6 md:pt-8">
                <BackButton fallback="/" />
            </div>

            <div className="pt-8 md:pt-4 px-4 md:px-8 lg:px-10">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-brutalist text-black tracking-[0.05em] leading-[0.9] mb-6 brutalist-border-b pb-6">
                    ACCESSORIES
                </h1>

                <p className="font-brutalist text-xl md:text-2xl mb-12 max-w-2xl">
                    UPGRADE YOUR WRIST GAME. VVS QUALTIY BRACELETS AND CARTIER FRAMES.
                </p>
            </div>

            <BrutalistGrid category="accessories" />

            <CrossTape />

            <div className="px-4 md:px-8 lg:px-10 py-12 text-center">
                <h2 className="text-4xl font-brutalist mb-6">NEED HELP?</h2>
                <p>DM us on Instagram for stock inquiries.</p>
            </div>
        </main>
    );
}
