"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card } from "@/components/ui/card";
import { MessageSquare, Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <div className="inline-block p-3 rounded-full bg-purple-100 dark:bg-purple-900/20 mb-4">
              <MessageSquare className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground">
              Get in touch with our support team
            </p>
          </div>

          <Card className="p-6">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/20">
                <Mail className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <p className="text-lg">
                For any questions or feedback, please email us at:
              </p>
              <a 
                href="mailto:par23006622@heartofyorkshire.ac.uk"
                className="text-xl font-medium text-purple-600 dark:text-purple-400 hover:underline"
              >
                par23006622@heartofyorkshire.ac.uk
              </a>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}