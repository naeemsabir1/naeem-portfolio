import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import LenisProvider from "@/components/providers/LenisProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Naeem Sabir | Full-Stack & AI Developer",
  description:
    "Building resilient digital ecosystems, award-winning web interfaces, and AI-powered applications. Portfolio of Naeem Sabir — Full-Stack & AI Developer based in Lahore.",
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
        className={`${inter.variable} ${outfit.variable} antialiased font-sans`}
      >
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
