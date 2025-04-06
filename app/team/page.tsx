"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TeamManagementContent } from "@/components/team/team-management-content";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function TeamPage() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    async function checkLockStatus() {
      try {
        const response = await fetch('/api/team-lock-in');
        const data = await response.json();
        
        if (data.raceLockInData.isLocked) {
          router.push('/'); // Redirect to home if locked
        }
      } catch (error) {
        console.error('Error checking lock status:', error);
      } finally {
        setIsChecking(false);
      }
    }
    
    checkLockStatus();
  }, [router]);

  if (isChecking) {
    return <div>Checking team status...</div>;
  }

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