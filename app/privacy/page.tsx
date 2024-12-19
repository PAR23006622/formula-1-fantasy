"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card } from "@/components/ui/card";
import { Shield } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <div className="inline-block p-3 rounded-full bg-purple-100 dark:bg-purple-900/20 mb-4">
              <Shield className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground">Last updated: 19 December 2024</p>
          </div>

          <Card className="p-6 space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Introduction</h2>
              <p className="text-muted-foreground">
                Welcome to F1 Fantasy, your Formula 1 fantasy experience. We value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and share information about you when you visit or use our website.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Information We Collect</h2>
              <div className="space-y-2">
                <p className="font-semibold">Personal Information:</p>
                <p className="text-muted-foreground">When you register for an account, participate in fantasy leagues, or contact us, we collect personal information such as your name, email address, and username.</p>
                
                <p className="font-semibold mt-4">Usage Data:</p>
                <p className="text-muted-foreground">We automatically collect information about your interactions with our website, including IP addresses, browser type, and pages visited.</p>
                
                <p className="font-semibold mt-4">Cookies and Tracking Technologies:</p>
                <p className="text-muted-foreground">We use cookies and similar technologies to track your activity on our website and store certain information.</p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">How We Use Your Information</h2>
              <p className="text-muted-foreground">We use the information we collect to:</p>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li>Provide and maintain our services</li>
                <li>Customize your user experience</li>
                <li>Communicate with you about updates, promotions, and other relevant content</li>
                <li>Monitor and analyze website usage and trends</li>
                <li>Enhance our website's security</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Sharing Your Information</h2>
              <p className="text-muted-foreground">We may share your information with:</p>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li>Service providers who assist us in operating our website and providing our services</li>
                <li>Legal authorities, if required by law or to protect our rights and safety</li>
                <li>Other users, when you voluntarily participate in public aspects of our website (e.g., fantasy leagues, forums)</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Your Rights</h2>
              <p className="text-muted-foreground">You have the right to:</p>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li>Access the personal information we hold about you</li>
                <li>Request corrections to your personal information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Data Security</h2>
              <p className="text-muted-foreground">
                We implement appropriate technical and organizational measures to protect your personal data. However, please note that no method of transmission over the internet or electronic storage is 100% secure.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on our website.
              </p>
            </section>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}