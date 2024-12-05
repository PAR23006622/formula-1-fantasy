import { RaceCalendarContent } from "@/components/race-calendar/race-calendar-content";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function RaceCalendarPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <RaceCalendarContent />
      </main>
      <Footer />
    </div>
  );
}