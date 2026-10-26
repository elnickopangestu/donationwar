import Hero from "@/components/Hero";
import WarBar from "@/components/WarBar";
import Leaderboard from "@/components/Leaderboard";
import HowItWorks from "@/components/HowItWorks";
import Tiers from "@/components/Tiers";
import DonateModal from "@/components/DonateModal";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <WarBar />
      <Leaderboard />
      <HowItWorks />
      <Tiers />
      <Footer />
      <DonateModal />
    </main>
  );
}
