"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trophy, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignInPage() {
  const router = useRouter();

  const handleSignIn = () => {
    window.location.href = '/auth/login';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 space-y-6 relative rounded-[25px] bg-black/90">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 hover:bg-purple-100/10"
            onClick={() => router.back()}
          >
            <X className="h-4 w-4" />
          </Button>

          <div className="text-center space-y-2">
            <div className="inline-block p-3 rounded-full bg-purple-100/10">
              <Trophy className="w-8 h-8 text-purple-400" />
            </div>
            <h1 className="text-2xl font-bold text-white">Welcome back</h1>
            <p className="text-sm text-gray-400">
              Sign in to manage your F1 Fantasy team
            </p>
          </div>

          <Button 
            onClick={handleSignIn}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-3 rounded-lg transition-all duration-200"
          >
            Sign in
          </Button>

          <div className="text-center space-y-2">
            <p className="text-sm text-gray-400">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="text-purple-400 hover:text-purple-300">
                Sign up
              </Link>
            </p>
          </div>
        </Card>
      </main>
    </div>
  );
}