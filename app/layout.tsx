import type { Metadata } from "next";
import { Inter, Syne, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import LenisProvider from "@/components/providers/LenisProvider";
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
    "I bring dead projects to life — full-stack web, mobile, AI workflows and RAG systems shipped at startup speed. Portfolio of Naeem Sabir, Full-Stack & AI Developer based in Lahore, Pakistan.",
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
        <LenisProvider>{children}</LenisProvider>
        <CustomCursor />
        <ChatWidget />
      </body>
    </html>
  );
}
