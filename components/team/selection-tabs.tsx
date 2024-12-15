"use client";

import { Card } from "@/components/ui/card";
import { DriversList } from "./drivers-list";
import { ConstructorsList } from "./constructors-list";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

interface SelectionTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  onSelect?: () => void;
  searchQuery?: string;
}

export function SelectionTabs({ 
  activeTab, 
  onTabChange, 
  onSelect,
  searchQuery: externalSearchQuery 
}: SelectionTabsProps) {
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const searchQuery = externalSearchQuery ?? localSearchQuery;

  return (
    <Card className="p-4">
      <div className="space-y-4">
        {/* Search bar - only show in desktop view when no external search query is provided */}
        {!externalSearchQuery && (
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder={`Search ${activeTab === "drivers" ? "drivers" : "constructors"}...`}
              value={localSearchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
            />
          </div>
        )}

        {/* Custom tab buttons */}
        <div className="flex rounded-lg overflow-hidden border">
          <button
            className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === "drivers"
                ? "bg-purple-600 text-white"
                : "hover:bg-muted"
            }`}
            onClick={() => onTabChange("drivers")}
          >
            Drivers
          </button>
          <button
            className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === "constructors"
                ? "bg-purple-600 text-white"
                : "hover:bg-muted"
            }`}
            onClick={() => onTabChange("constructors")}
          >
            Constructors
          </button>
        </div>

        {/* Content */}
        <div className="h-[calc(100vh-24rem)] overflow-y-auto">
          {activeTab === "drivers" ? (
            <DriversList onSelect={onSelect} searchQuery={searchQuery} />
          ) : (
            <ConstructorsList onSelect={onSelect} searchQuery={searchQuery} />
          )}
        </div>
      </div>
    </Card>
  );
}