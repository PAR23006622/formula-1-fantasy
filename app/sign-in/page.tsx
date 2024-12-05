"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trophy, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 space-y-6 relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 hover:bg-purple-100 dark:hover:bg-purple-900/20"
            onClick={() => router.back()}
          >
            <X className="h-4 w-4" />
          </Button>

          <div className="text-center space-y-2">
            <div className="inline-block p-3 rounded-full bg-purple-100 dark:bg-purple-900/20">
              <Trophy className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="text-sm text-muted-foreground">
              Sign in to manage your F1 Fantasy team
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Enter your password" />
            </div>
            <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 text-white">
              Sign In
            </Button>
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <a href="/sign-up" className="text-purple-600 dark:text-purple-400 hover:underline">
                Sign up
              </a>
            </p>
            <a href="/forgot-password" className="text-sm text-purple-600 dark:text-purple-400 hover:underline">
              Forgot your password?
            </a>
          </div>
        </Card>
      </main>
    </div>
  );
}