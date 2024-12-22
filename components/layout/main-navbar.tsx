"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { motion } from "framer-motion";

export function MainNavbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const topNavHeight = 96; // 24rem = 96px
      setIsScrolled(window.scrollY > topNavHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/race-calendar", label: "Race Calendar" },
    { href: "/standings", label: "Standings" },
    { href: "/how-to-play", label: "How to Play" },
    { href: "/rules", label: "Game Rules" },
  ];

  return (
    <div className={cn(
      "fixed left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 transition-all duration-300",
      isScrolled ? "top-6" : "top-24"
    )}>
      <nav className="relative max-w-5xl mx-auto">
        {/* Gradient glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 dark:from-purple-500/20 dark:to-pink-500/20 rounded-full blur-xl" />
        
        {/* Main navigation bar */}
        <div className={cn(
          "relative backdrop-blur-sm rounded-full shadow-lg px-4 py-3 transition-all duration-300 bg-background/95",
          isScrolled && "shadow-purple-600/10"
        )}>
          <div className="hidden md:flex justify-between items-center">
            <ThemeToggle />
            <div className="flex-1 flex justify-center items-center space-x-2 lg:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative px-3 lg:px-6 py-2 whitespace-nowrap"
                >
                  <span className={cn(
                    "relative z-10 text-sm font-medium transition-colors duration-200",
                    pathname === item.href ? "text-white" : "text-foreground hover:text-purple-600 dark:hover:text-purple-400"
                  )}>
                    {item.label}
                  </span>
                  {pathname === item.href && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 rounded-full shadow-md"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30
                      }}
                    />
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}