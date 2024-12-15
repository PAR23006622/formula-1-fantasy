import { TeamManagementContent } from "@/components/team/team-management-content";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function TeamPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <TeamManagementContent />
      </main>
      <Footer />
    </div>
  );
}