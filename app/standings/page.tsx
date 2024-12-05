import { StandingsTable } from "@/components/standings/standings-table";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function StandingsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
              F1 Fantasy Standings
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Track driver performance, prices, and ownership stats
            </p>
          </div>
          <StandingsTable />
        </div>
      </main>
      <Footer />
    </div>
  );
}