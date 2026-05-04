import type { Metadata } from "next";
import { AppHeader } from "@/components/app-header";
import "./globals.css";

export const metadata: Metadata = {
  title: "PlantSoc & Community Allotment",
  description:
    "A mobile-first community allotment dashboard for plants, harvests, tasks, and suggestions. Low-tech version.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full font-serif bg-yellow-50 text-black">
        <div className="relative flex min-h-screen flex-col">
          <AppHeader />
          <main className="mx-auto flex w-full max-w-4xl flex-1 px-4 pb-12 pt-4 border-l border-r border-black/10">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
