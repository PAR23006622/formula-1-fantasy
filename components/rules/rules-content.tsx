"use client";

import { Card } from "@/components/ui/card";
import { Trophy, Flag, Timer, Settings } from "lucide-react";

export function RulesContent() {
  const sections = [
    {
      title: "Qualifying",
      icon: Timer,
      content: [
        "Positions 1-10:",
        "• 1st place: 10 points",
        "• 2nd place: 9 points",
        "• 3rd place: 8 points",
        "• 4th place: 7 points",
        "• 5th place: 6 points",
        "• 6th place: 5 points",
        "• 7th place: 4 points",
        "• 8th place: 3 points",
        "• 9th place: 2 points",
        "• 10th place: 1 point",
        "Positions 11-20:",
        "• 11th to 20th place: 0 points",
        "Penalties:",
        "• Not setting a time in Q1: -5 points",
        "• Disqualified: -15 points"
      ]
    },
    {
      title: "Sprint",
      icon: Flag,
      content: [
        "Position Changes:",
        "• Positions Gained: +1 point per position",
        "• Positions Lost: -1 point per position",
        "• Fastest Lap: 5 points",
        "Sprint Results (Positions 1-10):",
        "• 1st place: 8 points",
        "• 2nd place: 7 points",
        "• 3rd place: 6 points",
        "• 4th place: 5 points",
        "• 5th place: 4 points",
        "• 6th place: 3 points",
        "• 7th place: 2 points",
        "• 8th place: 1 point",
        "• 9th to 20th place: 0 points",
        "Penalties:",
        "• DNF/Not classified: -20 points",
        "• Disqualified: -25 points"
      ]
    },
    {
      title: "Race",
      icon: Trophy,
      content: [
        "Race Achievements:",
        "• Positions Gained: +1 point per position",
        "• Positions Lost: -1 point per position",
        "• Fastest Lap: 10 points",
        "• Driver Of The Day: 10 points",
        "Race Results (Positions 1-10):",
        "• 1st place: 25 points",
        "• 2nd place: 18 points",
        "• 3rd place: 15 points",
        "• 4th place: 12 points",
        "• 5th place: 10 points",
        "• 6th place: 8 points",
        "• 7th place: 6 points",
        "• 8th place: 4 points",
        "• 9th place: 2 points",
        "• 10th place: 1 point",
        "• 11th to 20th place: 0 points",
        "Penalties:",
        "• DNF/Not classified: -20 points",
        "• Disqualified: -25 points"
      ]
    },
    {
      title: "Team Management",
      icon: Settings,
      content: [
        "Transfer penalties:",
        "• -10 points per transfer over limit"
      ]
    }
  ];

  return (
    <div className="py-8 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
            Game Rules
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn how to score points and manage your team effectively in F1 Fantasy
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {sections.map((section, index) => (
            <Card key={index} className="p-6 bg-card">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <section.icon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  <h2 className="text-2xl font-bold text-foreground">{section.title}</h2>
                </div>
                <ul className="space-y-2 text-muted-foreground">
                  {section.content.map((item, i) => (
                    <li key={i} className={item.startsWith('•') ? 'pl-4' : 'font-semibold text-foreground'}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}