"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { DriverStanding } from "@/lib/types/fantasy";
import { TrendingUp, TrendingDown } from "lucide-react";
import driverData from "@/lib/data/f1-fantasy-data.json";

export function StandingsTable() {
  const [standings, setStandings] = useState<DriverStanding[]>(driverData.drivers);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-16">Pos</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead>Team</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Points</TableHead>
              <TableHead className="text-right">Price Change</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {standings.map((driver, index) => (
              <TableRow key={index} className="hover:bg-muted/50">
                <TableCell className="font-medium">{driver.position}</TableCell>
                <TableCell>{driver.driver}</TableCell>
                <TableCell>{driver.team}</TableCell>
                <TableCell className="text-right">${driver.price}M</TableCell>
                <TableCell className="text-right">{driver.points}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-1">
                    {parseFloat(driver.priceChange) > 0 ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : parseFloat(driver.priceChange) < 0 ? (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    ) : null}
                    <span>{driver.priceChange}M</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}