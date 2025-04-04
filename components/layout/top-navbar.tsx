"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { User } from "lucide-react";
import { useUser } from '@auth0/nextjs-auth0';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function TopNavbar() {
  const { user, isLoading } = useUser();

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
            {!isLoading && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-200"></div>
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
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {user ? (
                    <>
                      <div className="flex items-center justify-start gap-2 p-2">
                        <div className="rounded-full bg-purple-100 p-1">
                          {user.picture ? (
                            <img 
                              src={user.picture} 
                              alt={user.name || 'Profile'} 
                              className="w-8 h-8 rounded-full"
                            />
                          ) : (
                            <User className="w-4 h-4" />
                          )}
                        </div>
                        <div className="flex flex-col">
                          <p className="text-sm font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/account" className="cursor-pointer">
                          Account Settings
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/team" className="cursor-pointer">
                          My Team
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <a 
                          href="/auth/logout" 
                          className="cursor-pointer text-red-600 hover:text-red-700"
                        >
                          Sign Out
                        </a>
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem asChild>
                        <a 
                          href="/auth/login" 
                          className="cursor-pointer"
                        >
                          Sign In
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <a 
                          href="/auth/login?screen_hint=signup" 
                          className="cursor-pointer"
                        >
                          Sign Up
                        </a>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}