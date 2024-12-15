"use client";

import { Card } from "@/components/ui/card";
import { useTeamStore } from "@/lib/store/team-store";
import { constructors } from "@/lib/data/constructors";

interface ConstructorsListProps {
  onSelect?: () => void;
  searchQuery?: string;
}

export function ConstructorsList({ onSelect, searchQuery = "" }: ConstructorsListProps) {
  const { addConstructor, constructors: selectedConstructors, budget } = useTeamStore();

  const filteredConstructors = constructors.filter((constructor) =>
    constructor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddConstructor = (constructor: any) => {
    if (selectedConstructors.length >= 2) return;
    if (parseFloat(constructor.price) > budget.remaining) return;

    addConstructor({
      id: constructor.id,
      name: constructor.name,
      price: constructor.price,
      points: constructor.points,
    });

    onSelect?.();
  };

  const isConstructorSelected = (constructorId: string) =>
    selectedConstructors.some((c) => c.id === constructorId);

  return (
    <div className="space-y-2 pb-4">
      {filteredConstructors.map((constructor) => {
        const selected = isConstructorSelected(constructor.id);
        return (
          <Card
            key={constructor.id}
            className={`p-4 cursor-pointer transition-colors ${
              selected
                ? "bg-purple-100 dark:bg-purple-900/20"
                : "hover:bg-muted/50"
            } ${
              parseFloat(constructor.price) > budget.remaining && !selected
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            onClick={() => !selected && handleAddConstructor(constructor)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{constructor.name}</h3>
              </div>
              <div className="text-right">
                <p className="font-semibold">${constructor.price}M</p>
                <p className="text-sm text-muted-foreground">
                  {constructor.points} pts
                </p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}