"use client";

// ─────────────────────────────────────────────────────────────────────────────
// HeroSection v3 — "God Mode"
// Layered cinematic system:
//   L0  Ambient WebGL gradient mesh        → <AmbientMesh />
//   L1  Particle field (mouse-reactive)    → <ParticleCanvas />
//   L2  Before/After slider centerpiece    → <BeforeAfterSlider />
//        L2A DeadMock  • L2B AliveMock  • L2C divider/handle/seam
//   L3  Foreground content
//        L3A Eyebrow   • L3B KineticHeadline • L3C Subline • L3D CTAs • L3E StatRibbon
//   L5  Custom contextual cursor           → <CustomCursor /> (rendered in layout)
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import AmbientMesh from "@/components/hero/AmbientMesh";
import DeadMock from "@/components/hero/DeadMock";
import AliveMock from "@/components/hero/AliveMock";
import KineticHeadline from "@/components/hero/KineticHeadline";
import { sounds } from "@/lib/audio";

// ─── Inline icons ─────────────────────────────────────────────────────────────
const DlIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);
const ArrowIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

// ─── L1 · Particle Canvas ─────────────────────────────────────────────────────
function ParticleCanvas({ dividerXRef }: { dividerXRef: React.RefObject<number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const COUNT = isMobile ? 30 : 65;

    let W = 0, H = 0, rafId = 0;
    let mx = -9999, my = -9999;
    let isRunning = true;

    type P = { x: number; y: number; vx: number; vy: number; r: number; color: string };
    let particles: P[] = [];

    const COLORS = [
      "rgba(82,183,136,IDX)",
      "rgba(56,189,248,IDX)",
      "rgba(255,255,255,IDX)",
    ];
    const pickColor = () =>
      COLORS[Math.floor(Math.random() * COLORS.length)]
        .replace("IDX", (Math.random() * 0.30 + 0.15).toFixed(2));

    const init = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      particles = Array.from({ length: COUNT }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.30,
        vy: (Math.random() - 0.5) * 0.30,
        r: Math.random() * 1.7 + 0.7,
        color: pickColor(),
      }));
    };

    if (reduceMotion) {
      init();
      // Single static frame
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color; ctx.fill();
      }
      return;
    }

    const draw = () => {
      if (!isRunning) { rafId = requestAnimationFrame(draw); return; }
      ctx.clearRect(0, 0, W, H);

      const seamX = dividerXRef.current ?? -9999;

      for (let i = 0; i < COUNT; i++) {
        const p = particles[i];

        // Mouse repulsion
        const dx = p.x - mx, dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          const force = (180 - dist) / 180;
          p.vx += (dx / dist) * force * 0.4;
          p.vy += (dy / dist) * force * 0.4;
        }

        // Subtle pull toward slider seam
        if (seamX > 0) {
          const sdx = seamX - p.x;
          const sdist = Math.abs(sdx);
          if (sdist < 220 && sdist > 4) {
            p.vx += (sdx / sdist) * 0.012;
          }
        }

        p.vx *= 0.97; p.vy *= 0.97;
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 2) { p.vx = (p.vx / speed) * 2; p.vy = (p.vy / speed) * 2; }
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        for (let j = i + 1; j < COUNT; j++) {
          const q = particles[j];
          const ldx = p.x - q.x, ldy = p.y - q.y;
          const d = Math.sqrt(ldx * ldx + ldy * ldy);
          if (d < 120) {
            const alpha = (1 - d / 120) * 0.10;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      rafId = requestAnimationFrame(draw);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
    };
    const onMouseLeave = () => { mx = -9999; my = -9999; };
    const onResize = () => init();
    const onVisibility = () => { isRunning = document.visibilityState === "visible"; };

    init();
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduceMotion, dividerXRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        zIndex: 1, pointerEvents: "auto",
      }}
    />
  );
}

// ─── L2 · Before/After Slider ─────────────────────────────────────────────────
function BeforeAfterSlider({
  reduceMotion,
  onSeamX,
}: {
  reduceMotion: boolean;
  onSeamX: (x: number | null) => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const aliveClipRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLButtonElement>(null);
  const seamRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const valueRef = useRef(50);
  const lastSnapRef = useRef<number | null>(null);
  const demoRunningRef = useRef(false);
  const demoCancelRef = useRef<(() => void) | null>(null);
  const [demoActive, setDemoActive] = useState(false);

  const apply = useCallback((pct: number, animate = false) => {
    valueRef.current = pct;
    const apr = Math.max(0, Math.min(100, pct));
    if (aliveClipRef.current) {
      // Alive panel revealed from RIGHT side (so dead is left, alive is right)
      aliveClipRef.current.style.clipPath = `inset(0 0 0 ${apr}%)`;
      if (animate) aliveClipRef.current.style.transition = "clip-path 0.45s cubic-bezier(0.16,1,0.3,1)";
      else aliveClipRef.current.style.transition = "";
    }
    if (lineRef.current) {
      lineRef.current.style.left = `${apr}%`;
      if (animate) lineRef.current.style.transition = "left 0.45s cubic-bezier(0.16,1,0.3,1)";
      else lineRef.current.style.transition = "";
    }
    if (handleRef.current) {
      handleRef.current.style.left = `${apr}%`;
      if (animate) handleRef.current.style.transition = "left 0.45s cubic-bezier(0.16,1,0.3,1)";
      else handleRef.current.style.transition = "";
      handleRef.current.setAttribute("aria-valuenow", String(Math.round(apr)));
    }
    if (seamRef.current) {
      seamRef.current.style.left = `${apr}%`;
    }
    // Notify particle canvas of seam X (in section coords)
    const wrap = wrapRef.current;
    if (wrap) {
      const wr = wrap.getBoundingClientRect();
      const section = wrap.closest("section");
      if (section) {
        const sr = section.getBoundingClientRect();
        const seamPx = wr.left + (apr / 100) * wr.width - sr.left;
        onSeamX(seamPx);
      }
    }
  }, [onSeamX]);

  useEffect(() => {
    apply(50);
    const wrap = wrapRef.current;
    if (!wrap) return;

    const updateFromClientX = (clientX: number) => {
      const rect = wrap.getBoundingClientRect();
      const pct = ((clientX - rect.left) / rect.width) * 100;
      const clamped = Math.max(0, Math.min(100, pct));
      apply(clamped);

      // Crossing-50% feedback (snap-feel pulse)
      const last = lastSnapRef.current;
      if ((last === null) || (last < 50 && clamped >= 50) || (last >= 50 && clamped < 50)) {
        if (handleRef.current) {
          handleRef.current.animate(
            [{ transform: "translate(-50%,-50%) scale(1)" },
             { transform: "translate(-50%,-50%) scale(1.18)" },
             { transform: "translate(-50%,-50%) scale(1)" }],
            { duration: 280, easing: "cubic-bezier(0.16,1,0.3,1)" });
        }
      }
      lastSnapRef.current = clamped;
    };

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      // Only start drag on slider surface itself (not links inside mocks if any)
      if (!wrap.contains(target)) return;
      // Abort any running auto-demo immediately on first user input
      if (demoRunningRef.current && demoCancelRef.current) {
        demoCancelRef.current();
      }
      draggingRef.current = true;
      wrap.setPointerCapture?.(e.pointerId);
      updateFromClientX(e.clientX);
      sounds.dragStart();
      e.preventDefault();
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      updateFromClientX(e.clientX);
    };
    const onPointerUp = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      wrap.releasePointerCapture?.(e.pointerId);
      // Magnetic snap to edges
      const v = valueRef.current;
      if (v < 8) { apply(0, true); sounds.snap(); }
      else if (v > 92) { apply(100, true); sounds.snap(); }
      else sounds.dragEnd();
    };

    wrap.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);

    // Resize: re-apply current value so seam/clip stay correct
    const onResize = () => apply(valueRef.current);
    window.addEventListener("resize", onResize);

    return () => {
      wrap.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("resize", onResize);
      onSeamX(null);
    };
  }, [apply, onSeamX]);

  // Keyboard support on the handle
  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const step = e.shiftKey ? 10 : 5;
    let next = valueRef.current;
    if (e.key === "ArrowLeft") next -= step;
    else if (e.key === "ArrowRight") next += step;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = 100;
    else return;
    e.preventDefault();
    apply(Math.max(0, Math.min(100, next)), true);
    sounds.snap();
  };

  // Full auto-demo loop — plays ONCE per session, aborts on user interaction.
  // Choreography: 50 → 100 (1.4s) → pause → 0 (1.6s) → pause → 50 (1.0s)
  useEffect(() => {
    if (reduceMotion) return;
    if (typeof window === "undefined") return;
    const KEY = "naeem-slider-demo-played";
    if (sessionStorage.getItem(KEY)) return;

    let cancelled = false;
    const timeouts: number[] = [];
    let rafId = 0;

    const ease = (t: number) => 1 - Math.pow(1 - t, 3); // easeOutCubic

    // Tween via rAF for smooth motion, ignoring framer's clip transitions
    const tweenTo = (from: number, to: number, dur: number) =>
      new Promise<void>((resolve) => {
        const start = performance.now();
        const step = (now: number) => {
          if (cancelled) { resolve(); return; }
          const t = Math.min(1, (now - start) / dur);
          const v = from + (to - from) * ease(t);
          apply(v);
          if (t < 1) rafId = requestAnimationFrame(step);
          else resolve();
        };
        rafId = requestAnimationFrame(step);
      });

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        const id = window.setTimeout(resolve, ms);
        timeouts.push(id);
      });

    demoCancelRef.current = () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      timeouts.forEach((id) => clearTimeout(id));
      demoRunningRef.current = false;
      setDemoActive(false);
      sessionStorage.setItem(KEY, "1");
    };

    const run = async () => {
      // Initial wait for hero reveal cascade (1500ms after page load)
      await wait(2000);
      if (cancelled) return;

      demoRunningRef.current = true;
      setDemoActive(true);
      sounds.dragStart();

      // 50 → 100 (full alive reveal)
      await tweenTo(50, 100, 1400);
      if (cancelled) return;
      await wait(450);
      if (cancelled) return;

      // 100 → 0 (full dead reveal)
      await tweenTo(100, 0, 1600);
      if (cancelled) return;
      await wait(450);
      if (cancelled) return;

      // 0 → 50 (return to neutral)
      await tweenTo(0, 50, 1000);
      if (cancelled) return;

      sounds.dragEnd();
      demoRunningRef.current = false;
      setDemoActive(false);
      sessionStorage.setItem(KEY, "1");
    };

    run();

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      timeouts.forEach((id) => clearTimeout(id));
      demoRunningRef.current = false;
    };
  }, [apply, reduceMotion]);

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
      {/* Side labels */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "0 4px",
        fontFamily: "var(--font-mono), monospace",
        fontSize: 11, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase",
        color: "rgba(255,255,255,0.55)",
      }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
          Before <span style={{ color: "rgba(255,255,255,0.30)", marginLeft: 6 }}>— 2014 vibes</span>
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "rgba(255,255,255,0.30)", marginRight: 6 }}>2026 craft —</span>
          After
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#52b788", display: "inline-block" }} />
        </span>
      </div>

      <div
        ref={wrapRef}
        data-cursor={demoActive ? "watch" : "drag"}
        role="region"
        aria-label="Before and after project comparison"
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 9",
          minHeight: 280,
          maxHeight: 460,
          borderRadius: 18,
          overflow: "hidden",
          touchAction: "none",
          userSelect: "none",
          background: "#0a0f1c",
          border: "1px solid rgba(255,255,255,0.10)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04) inset",
          cursor: "ew-resize",
        }}
      >
        {/* Dead mock — full bleed */}
        <div style={{ position: "absolute", inset: 0 }}>
          <DeadMock />
        </div>

        {/* Alive mock — clipped from left edge */}
        <div ref={aliveClipRef} style={{ position: "absolute", inset: 0, clipPath: "inset(0 0 0 50%)" }}>
          <AliveMock />
        </div>

        {/* Seam — chromatic-aberration vertical strip */}
        <div
          ref={seamRef}
          aria-hidden
          style={{
            position: "absolute", top: 0, bottom: 0, left: "50%",
            transform: "translateX(-50%)",
            width: 36,
            pointerEvents: "none",
            zIndex: 11,
            background: "linear-gradient(90deg, rgba(56,189,248,0) 0%, rgba(56,189,248,0.06) 35%, rgba(82,183,136,0.10) 50%, rgba(129,140,248,0.06) 65%, rgba(129,140,248,0) 100%)",
            mixBlendMode: "screen",
            animation: reduceMotion ? "none" : "seamShimmer 2.4s ease-in-out infinite",
          }}
        />

        {/* Divider line */}
        <div
          ref={lineRef}
          aria-hidden
          style={{
            position: "absolute", top: 0, bottom: 0, left: "50%",
            transform: "translateX(-50%)", width: 2,
            background: "linear-gradient(to bottom, rgba(255,255,255,0.06), rgba(255,255,255,0.95) 20%, rgba(255,255,255,0.95) 80%, rgba(255,255,255,0.06))",
            pointerEvents: "none", zIndex: 12,
          }}
        />

        {/* Handle */}
        <button
          ref={handleRef}
          type="button"
          role="slider"
          aria-label="Reveal more of the alive design"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={50}
          onKeyDown={onKeyDown}
          style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: 52, height: 52, borderRadius: "50%",
            background: "#ffffff",
            boxShadow: "0 4px 20px rgba(0,0,0,0.45), 0 0 0 4px rgba(255,255,255,0.20)",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
            border: "none", cursor: "ew-resize", zIndex: 13,
            color: "#0a0f1c",
            outline: "none",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* "drag to compare" hint pill */}
        <div aria-hidden style={{
          position: "absolute", bottom: 14, left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(15,17,23,0.70)",
          color: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.10)",
          borderRadius: 100, padding: "5px 12px",
          fontSize: 10, fontFamily: "var(--font-mono), monospace",
          letterSpacing: "0.10em", whiteSpace: "nowrap",
          pointerEvents: "none", zIndex: 14,
        }}>
          {demoActive ? "demo — drag any time to take over" : "← drag to compare →"}
        </div>
      </div>
    </div>
  );
}

// ─── L3D · Magnetic CTA ───────────────────────────────────────────────────────
function MagneticBtn({
  children, href, download, style: s, className, onClick,
}: {
  children: React.ReactNode; href: string; download?: string;
  style?: React.CSSProperties; className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width  / 2) * 0.22;
    const y = (e.clientY - r.top  - r.height / 2) * 0.22;
    el.style.transform = `translate(${x}px,${y}px)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = "translate(0,0)"; };
  return (
    <a
      ref={ref}
      href={href}
      download={download}
      data-cursor="click"
      className={className}
      style={{ ...s, transition: "transform 0.45s cubic-bezier(0.16,1,0.3,1), background 0.25s, box-shadow 0.25s, border-color 0.25s, color 0.25s" }}
      onMouseMove={onMove}
      onMouseEnter={() => sounds.hover()}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      {children}
    </a>
  );
}

// ─── L3E · Animated stat counter ──────────────────────────────────────────────
function Counter({ to, suffix = "", duration = 1400 }: { to: number; suffix?: string; duration?: number }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    let started = false;
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !started) {
        started = true;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setN(Math.round(to * eased));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{n}{suffix}</span>;
}

// ─── L3C · Rotating glyph separator ───────────────────────────────────────────
function RotatingSep() {
  const glyphs = ["·", "/", "+"];
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % glyphs.length), 2200);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <span style={{ display: "inline-block", color: "#52b788", margin: "0 10px", minWidth: 10, textAlign: "center" }}>
      <span key={i} style={{ display: "inline-block", animation: "fadeUpFrag 0.5s ease both" }}>{glyphs[i]}</span>
      <style jsx>{`
        @keyframes fadeUpFrag {
          0%   { opacity: 0; transform: translateY(4px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </span>
  );
}

// ─── Main HeroSection ─────────────────────────────────────────────────────────
export default function HeroSection() {
  const reduceMotion = useReducedMotion() ?? false;

  // Shared seam X (in section coordinates) for particle pull
  const seamXRef = useRef<number>(-9999);
  const onSeamX = useCallback((x: number | null) => {
    seamXRef.current = x ?? -9999;
  }, []);

  const scrollToWork = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100svh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "100px 24px 80px",
        fontFamily: "var(--font-inter), Inter, sans-serif",
        background: "#06090e",
      }}
    >
      {/* L0 — ambient mesh */}
      <AmbientMesh />

      {/* L1 — particles */}
      {!reduceMotion && <ParticleCanvas dividerXRef={seamXRef} />}

      {/* Vignette + grid overlays (decorative) */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
        background: "radial-gradient(ellipse 65% 60% at 50% 50%, transparent 0%, rgba(6,9,14,0.55) 100%)",
      }} />
      <div aria-hidden style={{
        position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.012) 1px,transparent 1px)",
        backgroundSize: "80px 80px",
        maskImage: "radial-gradient(ellipse 85% 85% at 50% 50%,black 30%,transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 85% 85% at 50% 50%,black 30%,transparent 100%)",
      }} />

      {/* Content */}
      <div style={{
        position: "relative", zIndex: 3,
        width: "100%", maxWidth: 1000,
        display: "flex", flexDirection: "column",
        gap: 44, alignItems: "stretch",
      }}>
        {/* L2 — Slider */}
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, scale: 0.97, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <BeforeAfterSlider reduceMotion={reduceMotion} onSeamX={onSeamX} />
        </motion.div>

        {/* L3 — Foreground */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {/* Eyebrow */}
          <motion.div
            initial={reduceMotion ? {} : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.30 }}
            style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22, flexWrap: "wrap" }}
          >
            <span aria-hidden style={{ fontSize: 14, lineHeight: 1 }}>🇵🇰</span>
            <span style={{ position: "relative", display: "inline-flex", width: 8, height: 8, flexShrink: 0 }}>
              <span style={{
                position: "absolute", inset: 0, borderRadius: "50%",
                background: "#52b788", opacity: 0.5,
                animation: reduceMotion ? "none" : "presenceRipple 1.8s ease-out infinite",
              }} />
              <span style={{
                position: "relative", width: 8, height: 8, borderRadius: "50%",
                background: "#52b788", boxShadow: "0 0 8px rgba(82,183,136,0.7)",
              }} />
            </span>
            <span style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 11, fontWeight: 500,
              color: "rgba(255,255,255,0.42)",
              letterSpacing: "0.16em", textTransform: "uppercase",
            }}>
              Naeem Sabir
              <span style={{ color: "rgba(255,255,255,0.22)", margin: "0 8px" }}>—</span>
              Full-Stack &amp; AI Developer
            </span>
            <span aria-hidden style={{
              width: 2, height: 14, background: "rgba(82,183,136,0.7)",
              borderRadius: 1, display: "inline-block", flexShrink: 0,
              animation: reduceMotion ? "none" : "heroCursorBlink 1.1s step-end infinite",
            }} />
          </motion.div>

          {/* L3B — Kinetic headline */}
          <KineticHeadline />

          {/* L3C — Subline */}
          <motion.p
            initial={reduceMotion ? {} : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.85 }}
            style={{
              margin: "20px 0 0", fontSize: 16, fontWeight: 400,
              lineHeight: 1.7, color: "rgba(255,255,255,0.50)",
              fontFamily: "var(--font-inter), Inter, sans-serif",
            }}
          >
            Full-Stack Engineer
            <RotatingSep />
            AI Integrations
            <RotatingSep />
            Mobile Apps
          </motion.p>

          {/* L3D — CTAs + L3E — Stat ribbon */}
          <motion.div
            initial={reduceMotion ? {} : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="hero-bottom-row"
            style={{
              display: "flex", alignItems: "center",
              gap: 20, flexWrap: "wrap", marginTop: 32,
            }}
          >
            <MagneticBtn
              href="#work"
              onClick={scrollToWork}
              className="hero-btn-primary"
              style={{
                position: "relative", overflow: "hidden",
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "#2d6a4f", color: "#ffffff",
                fontSize: 14, fontWeight: 600,
                padding: "14px 28px", borderRadius: 100,
                textDecoration: "none",
                boxShadow: "0 4px 24px rgba(45,106,79,0.40)",
                whiteSpace: "nowrap", flexShrink: 0,
                fontFamily: "var(--font-inter), Inter, sans-serif",
                letterSpacing: "-0.01em",
              }}
            >
              <span style={{ position: "relative", zIndex: 1 }}>View My Work</span>
              <span style={{ position: "relative", zIndex: 1, display: "inline-flex" }}><ArrowIcon /></span>
              <span aria-hidden className="hero-sheen" />
            </MagneticBtn>

            <MagneticBtn
              href="/Naeem_Sabir_Software_Engineer_Resume.pdf"
              download="Naeem_Sabir_Resume.pdf"
              className="hero-btn-ghost"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.13)",
                color: "rgba(255,255,255,0.78)",
                fontSize: 14, fontWeight: 500,
                padding: "14px 26px", borderRadius: 100,
                textDecoration: "none",
                whiteSpace: "nowrap", flexShrink: 0,
                fontFamily: "var(--font-inter), Inter, sans-serif",
                letterSpacing: "-0.01em",
              }}
            >
              <span className="hero-dl-icon" style={{ display: "inline-flex", transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)" }}>
                <DlIcon />
              </span>
              Download CV
            </MagneticBtn>

            {/* Vertical divider */}
            <div className="hero-divider-v" style={{ width: 1, height: 36, background: "rgba(255,255,255,0.10)", flexShrink: 0 }} />

            {/* Stat ribbon */}
            <div style={{ display: "flex", gap: 24, flexShrink: 0 }}>
              {[
                { v: 30, suffix: "+", label: "Projects shipped" },
                { v: 12, suffix: "",  label: "AI integrations" },
                { v: 6,  suffix: "yr", label: "In production" },
              ].map((s) => (
                <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                  <span style={{
                    fontSize: 22, fontWeight: 800, color: "#ffffff",
                    letterSpacing: "-0.03em", lineHeight: 1,
                    fontFamily: "var(--font-display), sans-serif",
                  }}>
                    <Counter to={s.v} suffix={s.suffix} />
                  </span>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.40)", fontWeight: 500, marginTop: 4, fontFamily: "var(--font-inter), Inter, sans-serif" }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Local style tweaks */}
      <style jsx global>{`
        .hero-btn-primary:hover  { background: #40916c !important; box-shadow: 0 8px 32px rgba(45,106,79,0.50) !important; }
        .hero-btn-ghost:hover    { background: rgba(255,255,255,0.10) !important; border-color: rgba(255,255,255,0.28) !important; color: #ffffff !important; }
        .hero-btn-ghost:hover .hero-dl-icon { transform: translateY(2px); }

        .hero-btn-primary .hero-sheen {
          position: absolute; inset: -1px;
          background: conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(255,255,255,0.18) 30deg, transparent 60deg, transparent 360deg);
          animation: heroSheen 8s linear infinite;
          mix-blend-mode: screen;
          opacity: 0.5;
          pointer-events: none;
        }
        @keyframes heroSheen { to { transform: rotate(1turn); } }

        @media (prefers-reduced-motion: reduce) {
          .hero-btn-primary .hero-sheen { animation: none !important; opacity: 0 !important; }
        }

        @media (max-width: 720px) {
          .hero-divider-v { display: none !important; }
          .hero-bottom-row { gap: 14px !important; }
        }
      `}</style>
    </section>
  );
}
