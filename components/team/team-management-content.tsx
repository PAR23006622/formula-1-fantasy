"use client";

import { TeamBuilder } from "./team-builder";
import { BudgetOverview } from "./budget-overview";
import { SelectionTabs } from "./selection-tabs";
import { MobileSelectionSheet } from "./mobile-selection-sheet";
import { Sheet } from "@/components/ui/sheet";
import { useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

export function TeamManagementContent() {
  const [activeTab, setActiveTab] = useState("drivers");
  const [sheetOpen, setSheetOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1024px)");

  return (
    <div className="py-8 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
            Team Management
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Build and manage your F1 Fantasy team
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Budget Overview - Show at top on mobile */}
          <div className="lg:hidden">
            <BudgetOverview />
          </div>

          {/* Team Builder - Takes more space on desktop */}
          <div className="lg:col-span-8">
            {isMobile ? (
              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <TeamBuilder 
                  onAddDriver={() => {
                    setActiveTab("drivers");
                    setSheetOpen(true);
                  }} 
                  onAddConstructor={() => {
                    setActiveTab("constructors");
                    setSheetOpen(true);
                  }} 
                />
                <MobileSelectionSheet
                  open={sheetOpen}
                  onOpenChange={setSheetOpen}
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                />
              </Sheet>
            ) : (
              <TeamBuilder 
                onAddDriver={() => setActiveTab("drivers")}
                onAddConstructor={() => setActiveTab("constructors")}
              />
            )}
          </div>
          
          {/* Budget Overview and Selection Lists - Hide on mobile */}
          <div className="hidden lg:block lg:col-span-4 space-y-6">
            <BudgetOverview />
            <SelectionTabs activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
        </div>
      </div>
    </div>
  );
}