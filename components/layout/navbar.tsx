"use client";

import { Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TopNavbar } from "./top-navbar";
import { MainNavbar } from "./main-navbar";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useUser } from '@auth0/nextjs-auth0';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const { user, isLoading } = useUser();

  return (
    <div className="relative">
      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <TopNavbar />
        <div className="flex items-center justify-between px-4 py-2">
          <MainNavbar />
        </div>
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
                <ThemeToggle />
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
              F1 Fantasy
            </span>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                size="icon" 
                variant="ghost" 
                className="relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-full w-10 h-10 flex items-center justify-center"
              >
                {user && user.picture ? (
                  <img 
                    src={user.picture} 
                    alt={user.name || 'Profile'} 
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <User className="w-5 h-5 text-white" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {user ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/account">Account Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/auth/logout">Sign Out</Link>
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/auth/login?returnTo=/">Sign In</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/auth/login?screen_hint=signup&returnTo=/">Sign Up</Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}