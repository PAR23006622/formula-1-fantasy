"use client";

import { Card } from "@/components/ui/card";
import { Flag, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getNextRace } from '@/lib/utils/race-data';
import { Race } from "@/lib/types/race";
import { RaceLockIn } from "@/lib/types/team-lock-in";
import { Skeleton } from "@/components/ui/skeleton";

export function NextRace() {
  const router = useRouter();
  const [nextRace, setNextRace] = useState<Race | null>(null);
  const [raceData, setRaceData] = useState<RaceLockIn | null>(null);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState<string>('');

  useEffect(() => {
    async function fetchData() {
      try {
        const [race, response] = await Promise.all([
          getNextRace(),
          fetch('/api/team-lock-in')
        ]);
        const data = await response.json();
        console.log('API Response:', data);
        console.log('Race Data:', race);
        setNextRace(race);
        setRaceData(data.raceLockInData);
      } catch (error) {
        console.error('Error fetching race data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Add countdown timer effect
  useEffect(() => {
    if (!raceData?.lockTime) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const lockTime = new Date(raceData.lockTime).getTime();
      const distance = lockTime - now;

      if (distance < 0) {
        setCountdown('LOCKED');
        clearInterval(timer);
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [raceData?.lockTime]);

  const handleClick = () => {
    if (countdown === 'LOCKED') {
      // Optionally show a toast or alert that team is locked
      return;
    }
    router.push('/team');
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="py-8 sm:py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-8 w-48 mx-auto mb-6 sm:mb-12" />
          <Card className="p-4 sm:p-6 bg-card">
            <div className="grid md:grid-cols-2 gap-4 sm:gap-8 items-center">
              <Skeleton className="h-48 md:h-full rounded-lg" />
              <div className="space-y-4 sm:space-y-6">
                <Skeleton className="h-8 w-3/4" />
                <div className="space-y-3">
                  <Skeleton className="h-6 w-1/2" />
                  <Skeleton className="h-6 w-2/3" />
                </div>
                <Skeleton className="h-24 w-full rounded-lg" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Format the race time from the RACE session
  const raceSession = raceData?.upcomingRace?.sessions.find(session => session.type === 'RACE');
  const raceDateTime = raceSession?.dateTime ? new Date(raceSession.dateTime).toLocaleString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }) : 'TBD';

  // Format the lock-in deadline
  const lockInDeadline = raceData?.lockTime ? 
    new Date(raceData.lockTime).toLocaleString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }) : 'TBD';

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
                <h3 className="text-2xl font-bold text-foreground">
                  {raceData?.upcomingRace?.title || nextRace?.name || "No Race Data Available"}
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <span className="text-foreground">{nextRace?.date || "Date TBD"}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <span className="text-foreground">Race Time: {raceDateTime || "Time TBD"}</span>
                </div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-3 sm:p-4 rounded-lg">
                <p className="text-purple-700 dark:text-purple-300 font-medium">
                  Lock-in Deadline: {lockInDeadline || "TBD"}
                  <br />
                  <span className={`text-sm mt-1 block ${
                    countdown === 'LOCKED' ? 'text-red-500 dark:text-red-400 font-bold' : ''
                  }`}>
                    Time Remaining: {countdown || "Not Available"}
                  </span>
                </p>
              </div>
              <Button 
                onClick={handleClick}
                className={`w-full transition-opacity ${
                  countdown === 'LOCKED'
                    ? 'bg-gray-500 cursor-not-allowed opacity-50'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 text-white hover:opacity-90'
                }`}
                disabled={countdown === 'LOCKED'}
                size="lg"
              >
                {countdown === 'LOCKED' ? 'Team Locked' : 'Make Your Picks'}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}