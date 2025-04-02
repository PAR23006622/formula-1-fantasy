"use client";

import { Card } from "@/components/ui/card";
import { Flag, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getNextRace } from '@/lib/utils/race-data';
import { Race } from "@/lib/types/race";

export function NextRace() {
  const router = useRouter();
  const [nextRace, setNextRace] = useState<Race | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNextRace() {
      const race = await getNextRace();
      setNextRace(race);
      setLoading(false);
    }
    fetchNextRace();
  }, []);

  const handleClick = () => {
    router.push('/team');
  };

  if (loading) {
    return <div>Loading next race information...</div>;
  }

  return (
    <div className="py-8 sm:py-16 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-6 sm:mb-12 text-foreground">Next Race</h2>
        <Card className="p-4 sm:p-6 bg-card">
          <div className="grid md:grid-cols-2 gap-4 sm:gap-8 items-center">
            <div className="relative h-48 md:h-full">
              <Image
                src="https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,w_1000/crm/miamifl/Formula_1_cars_on_track_1440x900_BD084F50-5056-A36A-0B6797D01C2EA2AD_be07a273-5056-a36a-0bd0d82ef2deb826.jpg"
                alt={nextRace?.country || "F1 Circuit"}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center space-x-3">
                <Flag className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                <h3 className="text-2xl font-bold text-foreground">{nextRace?.name || "Loading..."}</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <span className="text-foreground">{nextRace?.date || "TBD"}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <span className="text-foreground">Race Time TBD</span>
                </div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-3 sm:p-4 rounded-lg">
                <p className="text-purple-700 dark:text-purple-300 font-medium">
                  Lock-in Deadline: {nextRace?.date ? new Date(nextRace.date).toLocaleDateString() : "TBD"}
                </p>
              </div>
              <Button 
                onClick={handleClick}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 text-white hover:opacity-90 transition-opacity"
                size="lg"
              >
                Make Your Picks
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}