"use client";

// ─────────────────────────────────────────────────────────────────────────────
// AboutSection v6 — "The Naeem Experience" (Performance Optimized)
// Profile showcase with glassmorphic 9:16 portrait and interactive terminal
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useRef, memo } from "react";
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import { aboutData } from "@/data/content";

// Dynamic imports for heavy components
const GlassIDE = dynamic(() => import("@/components/about/GlassIDE"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] sm:h-[600px] bg-slate-900/50 rounded-2xl animate-pulse border border-white/10" />
  ),
});

const CodeDisplay = dynamic(() => import("@/components/about/CodeDisplay"), {
  ssr: false,
  loading: () => <div className="h-[300px] sm:h-[400px] animate-pulse" />,
});

const ProfileShowcase = dynamic(() => import("@/components/about/ProfileShowcase"), {
  ssr: false,
});

const EvasiveButton = dynamic(() => import("@/components/about/EvasiveButton"), {
  ssr: false,
});

const EmailPopup = dynamic(() => import("@/components/about/EmailPopup"), {
  ssr: false,
});

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

// Interactive Terminal Game Component
const InteractiveTerminal = memo(function InteractiveTerminal() {
  const [showPopup, setShowPopup] = useState(false);
  const [popupVariant, setPopupVariant] = useState<"success" | "caught">("success");
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    "Want to work together?",
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleYes = () => {
    if (isProcessing) return;
    setIsProcessing(true);

    // Simulate typing response
    const responses = [
      "Initializing connection...",
      "Establishing secure channel...",
      "Success! Opening communication portal...",
    ];

    let delay = 0;
    responses.forEach((response, i) => {
      setTimeout(() => {
        setTerminalOutput((prev) => [...prev.slice(0, 1), response]);
        if (i === responses.length - 1) {
          setPopupVariant("success");
          setShowPopup(true);
          setIsProcessing(false);
        }
      }, (delay += 600));
    });
  };

  const handleNoCatch = () => {
    setPopupVariant("caught");
    setShowPopup(true);
    setTerminalOutput((prev) => [
      ...prev.slice(0, 1),
      "Error 418: I'm a teapot ☕",
      "Just kidding! You caught me 😄",
    ]);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-12 sm:mt-16"
      >
        <div className="relative w-full max-w-2xl mx-auto">
          {/* Terminal container */}
          <div className="relative rounded-xl overflow-hidden bg-slate-900/80 border border-white/10 p-4 sm:p-6">
            {/* Terminal header */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <div className="ml-3 text-xs text-white/40 font-mono">terminal — zsh</div>
            </div>

            {/* Terminal content */}
            <div className="font-mono text-sm sm:text-base space-y-2 min-h-[120px]">
              {terminalOutput.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={i === 0 ? "text-white/70 pl-0" : "text-emerald-400/80 pl-4"}
                >
                  {i === 0 ? (
                    <>
                      <span className="text-emerald-400">➜</span>
                      <span className="text-cyan-400"> ~</span>
                      <span className="text-white/50"> echo &quot;{line}&quot;</span>
                      <div className="text-white/70 pl-4 mt-1">{line}</div>
                    </>
                  ) : (
                    <>
                      <span className="text-emerald-400">➜</span>
                      <span className="text-cyan-400"> ~</span>
                      <span className="text-white/80 ml-2">{line}</span>
                    </>
                  )}
                </motion.div>
              ))}

              {/* Interactive buttons */}
              {!isProcessing && terminalOutput.length === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 pt-4 border-t border-white/10"
                >
                  {/* Yes button */}
                  <motion.button
                    onClick={handleYes}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-3 rounded-xl font-medium text-sm bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-shadow"
                  >
                    Yes, let's talk! 🚀
                  </motion.button>

                  {/* Evasive No button */}
                  <EvasiveButton onCatch={handleNoCatch} />
                </motion.div>
              )}

              {/* Processing indicator */}
              {isProcessing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-white/40 mt-4 pl-4"
                >
                  <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    Processing
                  </motion.span>
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                  >
                    .
                  </motion.span>
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                  >
                    .
                  </motion.span>
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.9 }}
                  >
                    .
                  </motion.span>
                </motion.div>
              )}
            </div>

            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </div>
        </div>
      </motion.div>

      {/* Email Popup */}
      <EmailPopup
        email={aboutData.email}
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        variant={popupVariant}
      />
    </>
  );
});

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-20 sm:py-28 lg:py-36 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0a0f1c 0%, #06090e 100%)",
        fontFamily: "var(--font-inter), Inter, sans-serif",
      }}
    >
      {/* Optimized background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-20 sm:opacity-30"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 20% 40%, rgba(82, 183, 136, 0.08), transparent),
              radial-gradient(ellipse 60% 40% at 80% 60%, rgba(56, 189, 248, 0.06), transparent),
              radial-gradient(ellipse 50% 60% at 50% 80%, rgba(139, 92, 246, 0.04), transparent)
            `,
          }}
        />
        <div
          className="absolute inset-0 opacity-10 sm:opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/5 border border-white/10 mb-4 sm:mb-6">
            <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-full w-full bg-emerald-500" />
            </span>
            <span className="text-white/60 text-xs sm:text-sm font-mono uppercase tracking-wider">About</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 tracking-tight">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Naeem</span> Experience
          </h2>
          <p className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto px-2 sm:px-0">
            Full-Stack & AI Developer crafting resilient digital ecosystems.
            Let's build something exceptional together.
          </p>
        </motion.div>

        {/* Main Content Grid - Code Editor + Profile */}
        <motion.div variants={itemVariants}>
          <GlassIDE>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8">
              {/* Left: Code Editor - 3 cols on desktop */}
              <div className="lg:col-span-3 order-1">
                <CodeDisplay />
              </div>

              {/* Right: Profile Showcase - 2 cols on desktop */}
              <div className="lg:col-span-2 order-2">
                <ProfileShowcase email={aboutData.email} />
              </div>
            </div>
          </GlassIDE>
        </motion.div>

        {/* Interactive Terminal Game */}
        <InteractiveTerminal />
      </motion.div>
    </section>
  );
}
