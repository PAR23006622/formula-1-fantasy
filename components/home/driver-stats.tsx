"use client";

import { Card } from "@/components/ui/card";
import { Trophy, TrendingUp, Flag } from "lucide-react";

export function DriverStats() {
  const stats = [
    {
      driver: "Max Verstappen",
      team: "Red Bull Racing",
      points: 458,
      wins: 14,
      podiums: 19,
    },
    {
      driver: "Lewis Hamilton",
      team: "Mercedes",
      points: 234,
      wins: 2,
      podiums: 8,
    },
    {
      driver: "Charles Leclerc",
      team: "Ferrari",
      points: 206,
      wins: 1,
      podiums: 6,
    },
  ];

  return (
    <div className="py-8 sm:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-6 sm:mb-12 text-foreground">Top Drivers</h2>
        <div className="grid md:grid-cols-3 gap-4 sm:gap-8">
          {stats.map((driver, index) => (
            <Card key={index} className="p-4 sm:p-6 hover:shadow-lg transition-shadow bg-card">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{driver.driver}</h3>
                    <p className="text-muted-foreground">{driver.team}</p>
                  </div>
                  <div className="flex items-center space-x-1 text-purple-600 dark:text-purple-400">
                    <Trophy className="h-5 w-5" />
                    <span className="font-semibold">#{index + 1}</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="flex justify-center">
                      <TrendingUp className="h-5 w-5 text-muted-foreground mb-1" />
                    </div>
                    <div className="text-lg font-bold text-foreground">{driver.points}</div>
                    <div className="text-sm text-muted-foreground">Points</div>
                  </div>
                  <div>
                    <div className="flex justify-center">
                      <Trophy className="h-5 w-5 text-muted-foreground mb-1" />
                    </div>
                    <div className="text-lg font-bold text-foreground">{driver.wins}</div>
                    <div className="text-sm text-muted-foreground">Wins</div>
                  </div>
                  <div>
                    <div className="flex justify-center">
                      <Flag className="h-5 w-5 text-muted-foreground mb-1" />
                    </div>
                    <div className="text-lg font-bold text-foreground">{driver.podiums}</div>
                    <div className="text-sm text-muted-foreground">Podiums</div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}