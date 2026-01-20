import LuxuryLayout from "@/components/luxury-layout";
import HeroMagazine from "@/components/hero-magazine";
import TechnicalBlueprint from "@/components/tech-blueprint";
import CommerceGrid from "@/components/commerce-grid";
import Footer from "@/components/footer";

export default function Home() {
    return (
        <main className="flex flex-col w-full">
            <HeroMagazine />
            <TechnicalBlueprint />
            <CommerceGrid />
            <Footer />
        </main>
    );
}
