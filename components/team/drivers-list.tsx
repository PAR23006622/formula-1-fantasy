"use client";

import { Card } from "@/components/ui/card";
import { useTeamStore } from "@/lib/store/team-store";
import { drivers } from "@/lib/data/drivers";

interface DriversListProps {
  onSelect?: () => void;
  searchQuery?: string;
}

export function DriversList({ onSelect, searchQuery = "" }: DriversListProps) {
  const { addDriver, drivers: selectedDrivers, budget } = useTeamStore();

  const filteredDrivers = drivers.filter((driver) =>
    driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    driver.team.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddDriver = (driver: any) => {
    if (selectedDrivers.length >= 5) return;
    if (parseFloat(driver.price) > budget.remaining) return;
    
    addDriver({
      id: driver.id,
      name: driver.name,
      team: driver.team,
      price: driver.price,
      points: driver.points,
    });

    onSelect?.();
  };

  const isDriverSelected = (driverId: string) =>
    selectedDrivers.some((d) => d.id === driverId);

  return (
    <div className="space-y-2 pb-4">
      {filteredDrivers.map((driver) => {
        const selected = isDriverSelected(driver.id);
        return (
          <Card
            key={driver.id}
            className={`p-4 cursor-pointer transition-colors ${
              selected
                ? "bg-purple-100 dark:bg-purple-900/20"
                : "hover:bg-muted/50"
            } ${
              parseFloat(driver.price) > budget.remaining && !selected
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            onClick={() => !selected && handleAddDriver(driver)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{driver.name}</h3>
                <p className="text-sm text-muted-foreground">{driver.team}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">${driver.price}M</p>
                <p className="text-sm text-muted-foreground">
                  {driver.points} pts
                </p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}