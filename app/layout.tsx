import type { Metadata } from "next";
import { Inter, Syne, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import LenisProvider from "@/components/providers/LenisProvider";
import Navbar from "@/components/Navbar";
import ChatWidget from "@/components/chat/ChatWidget";
import CustomCursor from "@/components/hero/CustomCursor";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Naeem Sabir | Full-Stack & AI Developer",
  description:
    "Portfolio of Naeem Sabir, a Full-Stack and AI Developer building polished websites, AI workflows, and mobile apps for clients who need production-ready software.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  keywords: [
    "Naeem Sabir",
    "Full-Stack Developer",
    "AI Developer",
    "Portfolio",
    "Next.js",
    "Flutter",
    "React",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jakarta.variable} ${syne.variable} ${jetbrains.variable} antialiased font-sans`}
      >
        <Navbar />
        <LenisProvider>{children}</LenisProvider>
        <CustomCursor />
        <ChatWidget />
      </body>
    </html>
  );
}
