"use client";

import { Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TopNavbar } from "./top-navbar";
import { MainNavbar } from "./main-navbar";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useSession, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const { data: session } = useSession();

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  const AuthButton = () => {
    if (session) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <User className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleSignOut}>
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <Link href="/auth/login">
        <Button variant="ghost" size="icon">
          <User className="w-5 h-5" />
        </Button>
      </Link>
    );
  };

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
              <SheetTitle className="text-lg font-bold mb-4">
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

          <AuthButton />
        </div>
      </div>
    </div>
  );
}