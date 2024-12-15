"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trophy, X } from "lucide-react";
import { useTeamStore } from "@/lib/store/team-store";

interface TeamBuilderProps {
  onAddDriver: () => void;
  onAddConstructor: () => void;
}

export function TeamBuilder({ onAddDriver, onAddConstructor }: TeamBuilderProps) {
  const { drivers, constructors, budget, resetTeam, removeDriver, removeConstructor } = useTeamStore();

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Your Team</h2>
          <div className="space-x-2">
            <Button variant="outline" size="sm" onClick={resetTeam}>Reset</Button>
            <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600">
              Save Team
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Drivers ({drivers.length}/5)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(5)].map((_, index) => {
              const driver = drivers[index];
              return (
                <Card key={index} className="p-4 border-2 border-dashed relative">
                  {driver ? (
                    <div className="flex flex-col h-32">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-2 hover:bg-destructive/20"
                        onClick={() => removeDriver(driver.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <div className="flex-1 flex flex-col justify-center items-center text-center">
                        <h4 className="font-semibold">{driver.name}</h4>
                        <p className="text-sm text-muted-foreground">{driver.team}</p>
                        <p className="text-sm font-medium">${driver.price}M</p>
                      </div>
                    </div>
                  ) : (
                    <div 
                      className="flex flex-col items-center justify-center h-32 text-muted-foreground cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={onAddDriver}
                    >
                      <Plus className="h-8 w-8 mb-2" />
                      <span>Add Driver</span>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Constructors ({constructors.length}/2)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(2)].map((_, index) => {
              const constructor = constructors[index];
              return (
                <Card key={index} className="p-4 border-2 border-dashed relative">
                  {constructor ? (
                    <div className="flex flex-col h-32">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-2 hover:bg-destructive/20"
                        onClick={() => removeConstructor(constructor.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <div className="flex-1 flex flex-col justify-center items-center text-center">
                        <h4 className="font-semibold">{constructor.name}</h4>
                        <p className="text-sm font-medium">${constructor.price}M</p>
                      </div>
                    </div>
                  ) : (
                    <div 
                      className="flex flex-col items-center justify-center h-32 text-muted-foreground cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={onAddConstructor}
                    >
                      <Trophy className="h-8 w-8 mb-2" />
                      <span>Add Constructor</span>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
}