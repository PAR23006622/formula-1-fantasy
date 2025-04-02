"use client";

import { Card } from "@/components/ui/card";
import { Trophy, TrendingUp, Flag } from "lucide-react";
import { constructors } from "@/lib/data/constructors";

export function ConstructorsStats() {
  // Sort constructors by price (descending) and take top 3
  const topConstructors = [...constructors]
    .sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
    .slice(0, 3)
    .map(constructor => ({
      name: constructor.name,
      price: parseFloat(constructor.price),
      priceChange: parseFloat(constructor.priceChange),
    }));

  return (
    <div className="py-8 sm:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-6 sm:mb-12 text-foreground">Top Constructors</h2>
        <div className="grid md:grid-cols-3 gap-4 sm:gap-8">
          {topConstructors.map((constructor, index) => (
            <Card key={index} className="p-4 sm:p-6 hover:shadow-lg transition-shadow bg-card">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{constructor.name}</h3>
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
                    <div className="text-lg font-bold text-foreground">${constructor.price}M</div>
                    <div className="text-sm text-muted-foreground">Price</div>
                  </div>
                  <div>
                    <div className="flex justify-center">
                      <Trophy className="h-5 w-5 text-muted-foreground mb-1" />
                    </div>
                    <div className="text-lg font-bold text-foreground">
                      {constructor.priceChange > 0 ? '+' : ''}{constructor.priceChange}M
                    </div>
                    <div className="text-sm text-muted-foreground">Change</div>
                  </div>
                  <div>
                    <div className="flex justify-center">
                      <Flag className="h-5 w-5 text-muted-foreground mb-1" />
                    </div>
                    <div className={`text-lg font-bold ${
                      constructor.priceChange > 0 ? 'text-green-500' : 
                      constructor.priceChange < 0 ? 'text-red-500' : 'text-foreground'
                    }`}>
                      {constructor.priceChange > 0 ? '↑' : constructor.priceChange < 0 ? '↓' : '−'}
                    </div>
                    <div className="text-sm text-muted-foreground">Trend</div>
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