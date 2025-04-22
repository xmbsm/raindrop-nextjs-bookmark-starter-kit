import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { Header } from "@/components/header";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bookmark Nexus - Organize Your Web with Raindrop",
  description:
    "A sleek and modern bookmark manager powered by Raindrop API and Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 px-4">{children}</main>
            <footer className="p-4 container flex flex-col items-center justify-between gap-4 md:flex-row mx-auto">
              <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                Built with Next.js, Tailwind CSS and ShadCN UI.
              </p>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
