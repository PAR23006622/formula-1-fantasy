"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        className="rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 px-4 py-2 h-10 transition-colors"
      >
        <div className="w-[65px]" />
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        className="rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 px-4 py-2 h-10 transition-colors"
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      >
        <div className="w-[65px] flex items-center justify-between">
          {resolvedTheme === "dark" ? (
            <>
              <Moon className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium text-foreground">Dark</span>
            </>
          ) : (
            <>
              <Sun className="h-5 w-5 text-yellow-500" />
              <span className="text-sm font-medium text-foreground">Light</span>
            </>
          )}
        </div>
      </Button>
    </div>
  );
}