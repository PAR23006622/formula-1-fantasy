"use client";

import { Card } from "@/components/ui/card";
import { useTeamStore } from "@/lib/store/team-store";
import { constructors } from "@/lib/data/constructors";
import { ConstructorStanding } from "@/lib/types/standing";
import { TrendingUp, TrendingDown } from "lucide-react";

interface ConstructorsListProps {
  onSelect?: () => void;
  searchQuery?: string;
}

export function ConstructorsList({ onSelect, searchQuery = "" }: ConstructorsListProps) {
  const { addConstructor, removeConstructor, constructors: selectedConstructors, budget } = useTeamStore();

  const filteredConstructors = constructors.filter((constructor) =>
    constructor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConstructorClick = (constructor: ConstructorStanding) => {
    const isSelected = isConstructorSelected(constructor.id);
    if (isSelected) {
      removeConstructor(constructor.id);
    } else {
      if (selectedConstructors.length >= 2) return;
      if (parseFloat(constructor.price) > budget.remaining) return;

      addConstructor({
        id: constructor.id,
        name: constructor.name,
        price: constructor.price,
        points: "0",
      });
    }
    onSelect?.();
  };

  const isConstructorSelected = (constructorId: string) =>
    selectedConstructors.some((c) => c.id === constructorId);

  const formatPriceChange = (priceChange: string) => {
    const value = parseFloat(priceChange);
    return value > 0 ? `+${priceChange}` : priceChange;
  };

  return (
    <div className="space-y-2 pb-4">
      {filteredConstructors.map((constructor) => {
        const selected = isConstructorSelected(constructor.id);
        const priceChangeValue = parseFloat(constructor.priceChange);
        
        return (
          <Card
            key={constructor.id}
            className={`p-4 cursor-pointer transition-colors ${
              selected
                ? "bg-purple-100 dark:bg-purple-900/20 hover:bg-purple-200 dark:hover:bg-purple-900/30"
                : "hover:bg-muted/50"
            } ${
              !selected && parseFloat(constructor.price) > budget.remaining
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            onClick={() => handleConstructorClick(constructor)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{constructor.name}</h3>
              </div>
              <div className="text-right">
                <p className="font-semibold">${constructor.price}M</p>
                <div className="flex items-center justify-end space-x-1">
                  {priceChangeValue > 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : priceChangeValue < 0 ? (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  ) : null}
                  <p className="text-sm text-muted-foreground">
                    {formatPriceChange(constructor.priceChange)}M
                  </p>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}