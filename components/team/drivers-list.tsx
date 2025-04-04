"use client";

import { Card } from "@/components/ui/card";
import { useTeamStore } from "@/lib/store/team-store";
import { drivers } from "@/lib/data/drivers";
import { TrendingUp, TrendingDown } from "lucide-react";
import { DriverStanding } from "@/lib/types/standing";

interface DriversListProps {
  onSelect?: () => void;
  searchQuery?: string;
}

export function DriversList({ onSelect, searchQuery = "" }: DriversListProps) {
  const { addDriver, removeDriver, drivers: selectedDrivers, budget } = useTeamStore();

  const filteredDrivers = drivers.filter((driver) =>
    driver.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDriverClick = (driver: DriverStanding) => {
    const isSelected = isDriverSelected(driver.id);
    if (isSelected) {
      removeDriver(driver.id);
    } else {
      if (selectedDrivers.length >= 5) return;
      if (parseFloat(driver.price) > budget.remaining) return;
      
      addDriver({
        id: driver.id,
        name: driver.name,
        price: driver.price,
        points: "0"
      });
    }
    onSelect?.();
  };

  const isDriverSelected = (driverId: string) =>
    selectedDrivers.some((d) => d.id === driverId);

  const formatPriceChange = (priceChange: string) => {
    const value = parseFloat(priceChange);
    return value > 0 ? `+${priceChange}` : priceChange;
  };

  return (
    <div className="space-y-2 pb-4">
      {filteredDrivers.map((driver) => {
        const selected = isDriverSelected(driver.id);
        const priceChangeValue = parseFloat(driver.priceChange);

        return (
          <Card
            key={driver.id}
            className={`p-4 cursor-pointer transition-colors ${
              selected
                ? "bg-purple-100 dark:bg-purple-900/20 hover:bg-purple-200 dark:hover:bg-purple-900/30"
                : "hover:bg-muted/50"
            } ${
              !selected && parseFloat(driver.price) > budget.remaining
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            onClick={() => handleDriverClick(driver)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{driver.name}</h3>
              </div>
              <div className="text-right">
                <p className="font-semibold">${driver.price}M</p>
                <div className="flex items-center justify-end space-x-1">
                  {priceChangeValue > 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : priceChangeValue < 0 ? (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  ) : null}
                  <p className="text-sm text-muted-foreground">
                    {formatPriceChange(driver.priceChange)}M
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