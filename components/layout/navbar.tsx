"use client";

import { Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TopNavbar } from "./top-navbar";
import { MainNavbar } from "./main-navbar";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export function Navbar() {
  return (
    <div className="relative">
      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <TopNavbar />
        <MainNavbar />
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-4 left-4 right-4 z-50">
        <div className="flex items-center justify-between h-14 px-4 bg-background/80 backdrop-blur-sm border rounded-full shadow-lg">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-purple-100 dark:hover:bg-purple-900/20">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="rounded-r-2xl">
              <SheetTitle className="text-lg font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
                Navigation Menu
              </SheetTitle>
              <nav className="flex flex-col space-y-4">
                <Link href="/" className="text-lg font-medium hover:text-purple-600 transition-colors">
                  Home
                </Link>
                <Link href="/race-calendar" className="text-lg font-medium hover:text-purple-600 transition-colors">
                  Race Calendar
                </Link>
                <Link href="/standings" className="text-lg font-medium hover:text-purple-600 transition-colors">
                  Standings
                </Link>
                <Link href="/how-to-play" className="text-lg font-medium hover:text-purple-600 transition-colors">
                  How to Play
                </Link>
                <Link href="/rules" className="text-lg font-medium hover:text-purple-600 transition-colors">
                  Game Rules
                </Link>
                <div className="pt-4 border-t">
                  <ThemeToggle />
                </div>
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
              F1 Fantasy
            </span>
          </Link>

          <Link href="/sign-in">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-200"></div>
              <Button 
                size="icon" 
                variant="ghost" 
                className="relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-full w-9 h-9 flex items-center justify-center"
              >
                <User className="w-4 h-4 text-white" />
              </Button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}