"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { drivers } from "@/lib/data/drivers";
import { constructors } from "@/lib/data/constructors";
import { useState } from "react";

export function StandingsTable() {
  const [showingConstructors, setShowingConstructors] = useState(false);

  const data = showingConstructors ? constructors : drivers;

  return (
    <div className="space-y-4">
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => setShowingConstructors(false)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            !showingConstructors
              ? "bg-purple-600 text-white"
              : "bg-muted hover:bg-muted/80"
          }`}
        >
          Drivers
        </button>
        <button
          onClick={() => setShowingConstructors(true)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            showingConstructors
              ? "bg-purple-600 text-white"
              : "bg-muted hover:bg-muted/80"
          }`}
        >
          Constructors
        </button>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-16">Pos</TableHead>
                <TableHead>{showingConstructors ? "Constructor" : "Driver"}</TableHead>
                {!showingConstructors && <TableHead>Team</TableHead>}
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={item.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  {!showingConstructors && (
                    <TableCell>{(item as typeof drivers[0]).team}</TableCell>
                  )}
                  <TableCell className="text-right">${item.price}M</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-1">
                      {parseInt(item.points) > 0 ? (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      ) : parseInt(item.points) < 0 ? (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      ) : null}
                      <span>{item.points}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}