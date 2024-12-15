"use client";

import { Card } from "@/components/ui/card";
import { useTeamStore } from "@/lib/store/team-store";

export function BudgetOverview() {
  const { budget } = useTeamStore();

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">Budget Overview</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Total Budget</span>
          <span className="font-semibold">${budget.total.toFixed(1)}M</span>
        </div>
        <div className="flex justify-between">
          <span>Spent</span>
          <span className="font-semibold text-purple-600">${budget.spent.toFixed(1)}M</span>
        </div>
        <div className="flex justify-between">
          <span>Remaining</span>
          <span className="font-semibold text-green-600">${budget.remaining.toFixed(1)}M</span>
        </div>
      </div>
    </Card>
  );
}