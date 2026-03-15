"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/70 backdrop-blur-2xl shadow-[0_2px_20px_rgba(0,0,0,0.08)] border border-gray-200/50"
          : "bg-white/10 backdrop-blur-xl border border-white/20"
      } rounded-full px-2 py-1.5`}
    >
      <div className="flex items-center gap-1">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
            >
              {/* Active pill background */}
              {isActive && (
                <motion.span
                  layoutId="activeNavPill"
                  className={`absolute inset-0 rounded-full ${
                    scrolled
                      ? "bg-[#1d1d1f]"
                      : "bg-white/20"
                  }`}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span
                className={`relative z-10 ${
                  isActive
                    ? scrolled
                      ? "text-white"
                      : "text-white"
                    : scrolled
                    ? "text-[#1d1d1f] hover:text-[#6e6e73]"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
              </span>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
