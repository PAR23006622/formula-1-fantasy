"use client";

import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { SelectionTabs } from "./selection-tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, useRef } from "react";

interface MobileSelectionSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeTab: string;
  onTabChange: (value: string) => void;
}

export function MobileSelectionSheet({ 
  open, 
  onOpenChange, 
  activeTab, 
  onTabChange 
}: MobileSelectionSheetProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Function to handle the search container click
  const handleSearchContainerClick = () => {
    inputRef.current?.focus();
  };

  return (
    <SheetContent 
      side="right" 
      className="w-[90%] sm:w-[440px] flex flex-col h-full p-0"
    >
      <div className="sticky top-0 z-10 px-4 py-4 border-b space-y-4 bg-background">
        <SheetTitle className="text-xl font-bold">
          Select Team Members
        </SheetTitle>
        <div 
          className="relative"
          onClick={handleSearchContainerClick}
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            ref={inputRef}
            className="pl-9"
            placeholder={`Search ${activeTab}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            // Prevent focus on mount and only allow focus when explicitly clicked
            autoFocus={false}
            readOnly={!open}
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <SelectionTabs
          activeTab={activeTab}
          onTabChange={onTabChange}
          onSelect={() => onOpenChange(false)}
          searchQuery={searchQuery}
        />
      </div>
    </SheetContent>
  );
}