import { HeroSection } from "@/components/home/hero-section";
import { NextRace } from "@/components/home/next-race";
import { DriverStats } from "@/components/home/driver-stats";
import { ConstructorsStats } from "@/components/home/constructors-stats";
import { Separator } from "@/components/ui/separator";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* Add padding top to account for fixed navbar */}
      <main className="flex-grow pt-32">
        <HeroSection />
        <NextRace />
        <DriverStats />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Separator className="my-8" />
        </div>
        <ConstructorsStats />
      </main>
      <Footer />
    </div>
  );
}