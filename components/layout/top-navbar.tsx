"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { User } from "lucide-react";

export function TopNavbar() {
  return (
    <nav className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24 items-center">
          <div className="flex-1" /> {/* Spacer */}
          
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
                F1 Fantasy
              </span>
            </Link>
          </div>

          <div className="flex-1 flex justify-end">
            <Link href="/sign-in">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-200"></div>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-full w-10 h-10 flex items-center justify-center"
                >
                  <User className="w-5 h-5 text-white" />
                </Button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}