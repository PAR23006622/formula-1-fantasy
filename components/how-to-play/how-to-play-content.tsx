"use client";

import { Card } from "@/components/ui/card";
import { UserPlus, Users, Trophy, ChevronRight, Award, Brain, ExternalLink } from "lucide-react";
import Link from "next/link";

export function HowToPlayContent() {
  const sections = [
    {
      title: "Create Your Team",
      icon: UserPlus,
      content: [
        "Sign Up:",
        "• Register an account on F1 Fantasy",
        "Team Composition:",
        "• Choose 5 drivers and 1 constructor within a set budget"
      ]
    },
    {
      title: "Set Your Team",
      icon: Users,
      content: [
        "Before Each Race:",
        "• Make up to 2 free transfers",
        "• Additional transfers cost 10 points each",
        "Captain Selection:",
        "• Choose one driver as captain",
        "• Captain's points are doubled"
      ]
    },
    {
      title: "Scoring System",
      icon: Trophy,
      content: [
        "Points are awarded based on performance in:",
        "• Qualifying sessions",
        "• Sprint races",
        "• Main races",
        "• Special achievements (Fastest lap, Driver of the Day)"
      ]
    },
    {
      title: "Strategy Tips",
      icon: Brain,
      content: [
        "Monitor Performance:",
        "• Track driver and constructor performances",
        "• Make informed transfer decisions",
        "Stay Updated:",
        "• Check for rule changes",
        "• Follow F1 news and updates"
      ]
    },
    {
      title: "Community",
      icon: Award,
      content: [
        "Engage with Others:",
        "• Join F1 Fantasy discussions",
        "• Share strategies",
        "• Compare team performances",
        "• Participate in mini-leagues"
      ]
    }
  ];

  const scoringSummary = [
    {
      title: "Key Points Overview",
      content: [
        "Qualifying:",
        "• Points for top 10 positions (10 points for 1st to 1 point for 10th)",
        "• Penalties for not setting times or disqualification",
        "Sprint:",
        "• Points for position changes and fastest lap",
        "• Top 8 positions score points (8 points for 1st to 1 point for 8th)",
        "Race:",
        "• Points for position changes, fastest lap, and Driver of the Day",
        "• Top 10 positions score points (25 points for 1st to 1 point for 10th)"
      ]
    }
  ];

  return (
    <div className="py-8 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
            How to Play
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your guide to playing F1 Fantasy and scoring points
          </p>
        </div>

        {/* Main Steps */}
        <div className="grid md:grid-cols-2 gap-4 mb-12 max-w-4xl mx-auto">
          {sections.map((section, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow bg-card">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <section.icon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  <h2 className="text-2xl font-bold text-foreground">{section.title}</h2>
                </div>
                <ul className="space-y-2 text-base text-muted-foreground">
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

        {/* Scoring Summary */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
            Scoring Summary
          </h2>
          <div className="max-w-2xl mx-auto">
            {scoringSummary.map((section, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow bg-card">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-foreground flex items-center space-x-3">
                    <ChevronRight className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    <span>{section.title}</span>
                  </h3>
                  <ul className="space-y-2 text-base text-muted-foreground">
                    {section.content.map((item, i) => (
                      <li key={i} className={item.startsWith('•') ? 'pl-4' : 'font-semibold text-foreground'}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
            <div className="mt-4 text-center">
              <Link 
                href="/rules" 
                className="inline-flex items-center space-x-2 text-purple-600 dark:text-purple-400 hover:underline text-base"
              >
                <span>View detailed scoring rules</span>
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}