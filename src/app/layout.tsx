import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { AppHeader } from "@/components/app-header";
import "./globals.css";

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

const displayFont = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PlantSoc & Community Allotment",
  description:
    "A mobile-first community allotment dashboard for plants, harvests, tasks, and suggestions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable} h-full antialiased`}>
      <body className="min-h-full bg-background font-sans text-foreground">
        <div className="relative flex min-h-screen flex-col">
          <AppHeader />
          <main className="mx-auto flex w-full max-w-6xl flex-1 px-4 pb-12 pt-4 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
