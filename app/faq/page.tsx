"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FAQSection } from "@/components/faq/faq-section";
import { faqData } from "@/lib/data/faq-data";
import { HelpCircle } from "lucide-react";

export default function FAQPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <div className="inline-block p-3 rounded-full bg-purple-100 dark:bg-purple-900/20 mb-4">
              <HelpCircle className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-muted-foreground">
              Find answers to common questions about F1 Fantasy
            </p>
          </div>

          <div className="space-y-6">
            <FAQSection title="General Questions" items={faqData.general} />
            <FAQSection title="Scoring System" items={faqData.scoring} />
            <FAQSection title="Team Management" items={faqData.teamManagement} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}