"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card } from "@/components/ui/card";
import { ScrollText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <div className="inline-block p-3 rounded-full bg-purple-100 dark:bg-purple-900/20 mb-4">
              <ScrollText className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
              Terms of Service
            </h1>
            <p className="text-xl text-muted-foreground">
              Rules and guidelines for using F1 Fantasy
            </p>
          </div>

          <Card className="p-6 space-y-6">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Account Terms</h2>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li>You must be at least 18 years old to use this service</li>
                <li>You are responsible for maintaining the security of your account</li>
                <li>You must provide accurate and complete information when creating an account</li>
                <li>You may not use the service for any illegal purposes</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Game Rules</h2>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li>Players must follow fair play principles</li>
                <li>Multiple accounts per user are not allowed</li>
                <li>Exploiting bugs or glitches is prohibited</li>
                <li>We reserve the right to modify game rules and scoring systems</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Termination</h2>
              <p className="text-muted-foreground">
                We reserve the right to suspend or terminate accounts that violate these terms or engage in inappropriate behavior.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Changes to Terms</h2>
              <p className="text-muted-foreground">
                We may modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.
              </p>
            </section>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}