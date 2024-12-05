import { HowToPlayContent } from "@/components/how-to-play/how-to-play-content";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function HowToPlayPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <HowToPlayContent />
      </main>
      <Footer />
    </div>
  );
}