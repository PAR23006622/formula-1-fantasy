"use client";

import { Card } from "@/components/ui/card";
import { Mail } from "lucide-react";

export default function VerifyRequest() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 space-y-6 rounded-[25px]">
        <div className="text-center space-y-4">
          <div className="inline-block p-3 rounded-full bg-purple-100 dark:bg-purple-900/20">
            <Mail className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </div>
          <h1 className="text-2xl font-bold">Check your email</h1>
          <p className="text-muted-foreground">
            A sign in link has been sent to your email address.
            Please check your inbox and spam folder.
          </p>
        </div>
      </Card>
    </div>
  );
}