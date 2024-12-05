"use client";

import { RaceCard } from "./race-card";
import { races } from "@/lib/data/races";

export function RaceCalendarContent() {
  return (
    <div className="py-8 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
            2024 Race Calendar
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Follow the complete Formula 1 season with all race dates and venues
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {races.map((race, index) => (
            <RaceCard key={index} race={race} />
          ))}
        </div>
      </div>
    </div>
  );
}