import { RulesContent } from "@/components/rules/rules-content";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function RulesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* Reduced padding top from pt-32 to pt-24 */}
      <main className="flex-grow pt-24">
        <RulesContent />
      </main>
      <Footer />
    </div>
  );
}