// components/HeroScrollSequence.tsx
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
//  CONFIG
// ============================================================
const FRAME_COUNT = 300;
const FRAME_PATH = "/Frames/frame_";
const FRAME_EXT = ".webp";
const SCROLL_LENGTH_VH = 5; // 5× viewport height of scroll distance
const PROJECTS = [
  "Talkio",
  "Sands Collections",
  "MM Vapers",
  "Creatube AI",
  "Moussenmelts",
  "Sopwriter",
];
// Triple for seamless infinite CSS marquee
const TICKER_ITEMS = [...PROJECTS, ...PROJECTS, ...PROJECTS];

// ============================================================
//  COMPONENT
// ============================================================
export default function HeroScrollSequence() {
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const dashRef = useRef<HTMLDivElement>(null);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef(0);

  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // --------------------------------------------------------
  //  1. PRELOAD FRAMES IN BATCHES (30 at a time)
  // --------------------------------------------------------
  useEffect(() => {
    let loaded = 0;
    const imgs: HTMLImageElement[] = new Array(FRAME_COUNT);
    const BATCH_SIZE = 30;
    let cancelled = false;

    const loadFrame = (i: number): Promise<void> => {
      return new Promise((resolve) => {
        const img = new window.Image();
        img.src = `${FRAME_PATH}${String(i + 1).padStart(4, "0")}${FRAME_EXT}`;
        img.onload = img.onerror = () => {
          if (cancelled) return;
          imgs[i] = img;
          loaded++;
          setLoadProgress(Math.round((loaded / FRAME_COUNT) * 100));
          resolve();
        };
      });
    };

    const loadAllBatches = async () => {
      for (let start = 0; start < FRAME_COUNT; start += BATCH_SIZE) {
        if (cancelled) return;
        const end = Math.min(start + BATCH_SIZE, FRAME_COUNT);
        const batch: Promise<void>[] = [];
        for (let i = start; i < end; i++) {
          batch.push(loadFrame(i));
        }
        await Promise.all(batch);
      }
      if (!cancelled) {
        imagesRef.current = imgs;
        setIsLoaded(true);
      }
    };

    loadAllBatches();
    return () => { cancelled = true; };
  }, []);

  // --------------------------------------------------------
  //  2. CANVAS RENDER (cover-fit, DPR-aware)
  // --------------------------------------------------------
  const render = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete || !img.naturalWidth) return;

    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const imgR = img.naturalWidth / img.naturalHeight;
    const canR = w / h;
    let dw: number, dh: number, dx: number, dy: number;
    if (imgR > canR) {
      dh = h; dw = h * imgR; dx = (w - dw) / 2; dy = 0;
    } else {
      dw = w; dh = w / imgR; dx = 0; dy = (h - dh) / 2;
    }
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, dx, dy, dw, dh);
  }, []);

  // --------------------------------------------------------
  //  3. SMOOTH FADE-OUT OF LOADING SCREEN
  // --------------------------------------------------------
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoaded || !loaderRef.current) return;

    // Render the first frame before fading out the loader
    render(0);

    // Small delay to ensure the canvas has actually painted
    const timer = setTimeout(() => {
      gsap.to(loaderRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => {
          if (loaderRef.current) {
            loaderRef.current.style.pointerEvents = "none";
            loaderRef.current.style.display = "none";
          }
        },
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [isLoaded, render]);

  // --------------------------------------------------------
  //  4. SINGLE SCROLLTRIGGER — CONTROLS EVERYTHING
  // --------------------------------------------------------
  useEffect(() => {
    if (!isLoaded || !heroRef.current) return;

    // Render first frame
    render(0);

    const hero = heroRef.current;
    const nav = navRef.current;
    const header = headerRef.current;
    const dash = dashRef.current;

    // Initial states
    if (nav) gsap.set(nav, { opacity: 1 });
    if (header) gsap.set(header, { opacity: 1, transform: "translate(-50%, -50%) translateZ(0px)" });
    if (dash) {
      dash.style.visibility = "hidden";
      gsap.set(dash, { opacity: 0, scale: 0.3, y: 60 });
    }

    // Entrance animation on load
    const entranceTl = gsap.timeline({ defaults: { ease: "power3.out" } });
    entranceTl
      .from(nav, { y: -30, opacity: 0, duration: 0.8, delay: 0.3 })
      .from("[data-hero-line]", { y: 50, opacity: 0, duration: 0.7, stagger: 0.1 }, "-=0.4")
      .from("[data-hero-sub]", { y: 25, opacity: 0, duration: 0.6 }, "-=0.3")
      .from("[data-hero-ticker]", { y: 30, opacity: 0, duration: 0.6 }, "-=0.3")
      .from("[data-scroll-hint]", { opacity: 0, duration: 0.8 }, "-=0.2");

    // === THE SINGLE SCROLLTRIGGER ===
    const trigger = ScrollTrigger.create({
      trigger: hero,
      start: "top top",
      end: `+=${window.innerHeight * SCROLL_LENGTH_VH}px`,
      pin: true,
      pinSpacing: true,
      scrub: 0.8,
      onUpdate: (self) => {
        const progress = self.progress;

        // --- FRAME SEQUENCE (0% → 90% of scroll) ---
        const animProgress = Math.min(progress / 0.9, 1);
        const targetFrame = Math.round(animProgress * (FRAME_COUNT - 1));
        if (targetFrame !== frameRef.current) {
          frameRef.current = targetFrame;
          render(targetFrame);
        }

        // --- NAV FADE OUT (0% → 10%) ---
        if (nav) {
          if (progress <= 0.1) {
            gsap.set(nav, { opacity: 1 - (progress / 0.1) });
          } else {
            gsap.set(nav, { opacity: 0 });
          }
        }

        // --- HEADER: 3D PUSH INTO SCREEN + FADE (0% → 25%) ---
        // The text recedes INTO the frame sequence like you're walking past it
        if (header) {
          if (progress <= 0.25) {
            const zProgress = progress / 0.25;
            const translateZ = zProgress * -500;

            let opacity = 1;
            if (progress >= 0.18) {
              // Start fading at 18%, fully gone by 25%
              opacity = 1 - Math.min((progress - 0.18) / 0.07, 1);
            }

            gsap.set(header, {
              transform: `translate(-50%, -50%) translateZ(${translateZ}px)`,
              opacity,
            });
          } else {
            gsap.set(header, { opacity: 0 });
          }
        }

        // --- DASHBOARD: SCALE UP + FADE IN (60% → 90%) ---
        // Starts small and transparent, scales to full size
        // Uses scale instead of translateZ to avoid perspective rendering bugs
        if (dash) {
          if (progress < 0.58) {
            // Completely hidden — no GPU compositing cost
            dash.style.visibility = "hidden";
            gsap.set(dash, { opacity: 0, scale: 0.3 });
          } else if (progress >= 0.58 && progress <= 0.9) {
            dash.style.visibility = "visible";
            const imgProgress = (progress - 0.58) / 0.32;
            // Ease-out curve for natural deceleration
            const easedProgress = 1 - Math.pow(1 - imgProgress, 2.5);

            // Scale: 0.3 → 1.0
            const scale = 0.3 + easedProgress * 0.7;

            // Opacity: fade in during first 60% of the range
            let opacity = 0;
            if (imgProgress <= 0.6) {
              opacity = imgProgress / 0.6;
            } else {
              opacity = 1;
            }

            // Slight Y float: starts 60px below, settles to 0
            const y = 60 * (1 - easedProgress);

            gsap.set(dash, {
              opacity,
              scale,
              y,
            });
          } else {
            // Fully arrived and resting
            dash.style.visibility = "visible";
            gsap.set(dash, { opacity: 1, scale: 1, y: 0 });
          }
        }
      },
    });

    // Handle resize
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          canvas.width = 0;
          canvas.height = 0;
        }
      }
      render(frameRef.current);
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      entranceTl.kill();
      trigger.kill();
      window.removeEventListener("resize", handleResize);
    };
  }, [isLoaded, render]);

  // --------------------------------------------------------
  //  4. JSX — ALL LAYERS INSIDE ONE SECTION
  // --------------------------------------------------------
  return (
    <>
      {/* ===== LOADING SCREEN (always rendered, fades out) ===== */}
      <div
        ref={loaderRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000",
          opacity: 1,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              color: "#fff",
              fontSize: "16px",
              fontWeight: 300,
              letterSpacing: "0.05em",
              marginBottom: "20px",
              fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
            }}
          >
            Loading Experience
          </div>
          <div
            style={{
              width: "200px",
              height: "2px",
              background: "rgba(255,255,255,0.15)",
              borderRadius: "2px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                background: "#fff",
                borderRadius: "2px",
                transition: "width 0.3s ease",
                width: `${loadProgress}%`,
              }}
            />
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: "13px",
              marginTop: "12px",
              fontFamily: "'SF Pro Text', -apple-system, sans-serif",
            }}
          >
            {loadProgress}%
          </div>
        </div>
      </div>

      {/* ===== NAVBAR (fixed, z-index 50) ===== */}
      <nav
        ref={navRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          padding: "24px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 50,
          willChange: "opacity",
          pointerEvents: "auto",
          background: "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)",
        }}
      >
        <a
          href="#"
          style={{
            fontSize: "18px",
            fontWeight: 600,
            color: "#fff",
            textDecoration: "none",
            letterSpacing: "-0.02em",
            fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
            textShadow: "0 1px 8px rgba(0,0,0,0.4)",
          }}
        >
          Naeem Sabir
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: "36px" }}>
          {["Websites", "Apps"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{
                fontSize: "14px",
                fontWeight: 400,
                color: "rgba(255,255,255,0.85)",
                textDecoration: "none",
                letterSpacing: "0.01em",
                transition: "color 0.3s ease",
                fontFamily: "'SF Pro Text', -apple-system, sans-serif",
                textShadow: "0 1px 6px rgba(0,0,0,0.35)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
            >
              {item}
            </a>
          ))}
          <a href="#about" onClick={(e) => {
            e.preventDefault();
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
              aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
          }} style={{
            fontSize: "14px",
            fontWeight: 400,
            color: "rgba(255,255,255,0.85)",
            textDecoration: "none",
            letterSpacing: "0.01em",
            transition: "color 0.3s ease",
            fontFamily: "'SF Pro Text', -apple-system, sans-serif",
            textShadow: "0 1px 6px rgba(0,0,0,0.35)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}>
            About
          </a>
          <Link
            href="/quote"
            style={{
              fontSize: "14px",
              fontWeight: 500,
              color: "#000",
              background: "#fff",
              padding: "10px 24px",
              borderRadius: "100px",
              textDecoration: "none",
              transition: "all 0.3s ease",
              fontFamily: "'SF Pro Text', -apple-system, sans-serif",
              boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.85)";
              e.currentTarget.style.transform = "scale(1.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#fff";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Get Quote
          </Link>
        </div>
      </nav>

      {/* ===== THE HERO SECTION — SINGLE PINNED CONTAINER ===== */}
      <section
        ref={heroRef}
        data-scroll-container
        style={{
          position: "relative",
          width: "100vw",
          height: "100svh",
          overflow: "hidden",
          background: "#000",
        }}
      >
        {/* LAYER 1: Canvas (frame sequence) — fills the section */}
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "100%",
            display: isLoaded ? "block" : "none",
          }}
        />

        {/* LAYER 2: Header content — centered, overlaid on canvas */}
        {/* Uses perspective + translateZ for 3D push effect */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            transformStyle: "preserve-3d",
            perspective: "1000px",
          }}
        >
          <div
            ref={headerRef}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100vw",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              transformOrigin: "center",
              willChange: "transform, opacity",
            }}
          >
            {/* Main headline */}
            <h1
              style={{
                margin: 0,
                fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 1.08,
                color: "#fff",
                width: "min(800px, 85vw)",
              }}
            >
              <span data-hero-line style={{ display: "block", fontSize: "clamp(36px, 6vw, 76px)", textShadow: "0 2px 20px rgba(0,0,0,0.3), 0 4px 40px rgba(0,0,0,0.15)" }}>
                I Design & Build
              </span>
              <span data-hero-line style={{ display: "block", fontSize: "clamp(36px, 6vw, 76px)", textShadow: "0 2px 20px rgba(0,0,0,0.3), 0 4px 40px rgba(0,0,0,0.15)" }}>
                Digital Products
              </span>
              <span
                data-hero-line
                style={{
                  display: "block",
                  fontSize: "clamp(36px, 6vw, 76px)",
                  background: "linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.35) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 2px 16px rgba(0,0,0,0.25))",
                }}
              >
                That Perform.
              </span>
            </h1>

            {/* Subtitle */}
            <p
              data-hero-sub
              style={{
                marginTop: "24px",
                fontSize: "clamp(14px, 1.6vw, 18px)",
                fontWeight: 400,
                color: "#fff",
                lineHeight: 1.6,
                maxWidth: "480px",
                fontFamily: "'SF Pro Text', -apple-system, sans-serif",
                textShadow: "0 1px 8px rgba(0,0,0,0.35)",
              }}
            >
              iOS & Android apps, websites, and AI workflows
              <br />
              — engineered for real-world results.
            </p>

            {/* "Projects I have done" label */}
            <p
              data-hero-sub
              style={{
                marginTop: "36px",
                fontSize: "11px",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "rgba(255,255,255,0.45)",
                fontFamily: "'SF Pro Text', -apple-system, sans-serif",
                textShadow: "0 1px 6px rgba(0,0,0,0.3)",
              }}
            >
              Projects I have done
            </p>

            {/* Project ticker — small, centered, fades at edges */}
            <div
              data-hero-ticker
              style={{
                marginTop: "16px",
                width: "min(500px, 70vw)",
                overflow: "hidden",
                position: "relative",
                // CSS mask for fade-at-edges effect
                maskImage: "linear-gradient(90deg, transparent 0%, black 15%, black 85%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 15%, black 85%, transparent 100%)",
              }}
            >
              <div
                className="ticker-track"
                style={{
                  display: "flex",
                  gap: "12px",
                  width: "max-content",
                  animation: "tickerScroll 25s linear infinite",
                }}
              >
                {TICKER_ITEMS.map((name, i) => (
                  <span
                    key={`${name}-${i}`}
                    style={{
                      flexShrink: 0,
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "rgba(255,255,255,0.65)",
                      whiteSpace: "nowrap",
                      fontFamily: "'SF Pro Text', -apple-system, sans-serif",
                      letterSpacing: "0.01em",
                      textShadow: "0 1px 6px rgba(0,0,0,0.3)",
                    }}
                  >
                    {name}
                    {i < TICKER_ITEMS.length - 1 && (
                      <span
                        style={{
                          margin: "0 0 0 12px",
                          color: "rgba(255,255,255,0.15)",
                        }}
                      >
                        ·
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* Scroll hint */}
            <div
              data-scroll-hint
              style={{
                position: "absolute",
                bottom: "-100px",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.25)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  fontFamily: "'SF Pro Text', -apple-system, sans-serif",
                }}
              >
                Scroll
              </span>
              <div
                style={{
                  width: "1px",
                  height: "28px",
                  background: "linear-gradient(180deg, rgba(255,255,255,0.35) 0%, transparent 100%)",
                  animation: "scrollPulse 2s ease-in-out infinite",
                }}
              />
            </div>
          </div>
        </div>

        {/* LAYER 3: Dashboard image — scales in from center */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "min(60vw, 820px)",
            pointerEvents: "none",
            zIndex: 5,
          }}
        >
          <div
            ref={dashRef}
            style={{
              position: "relative",
              width: "100%",
              opacity: 0,
              willChange: "transform, opacity",
            }}
          >
            {/* Glassmorphic frame around the dashboard */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.06)",
                backdropFilter: "blur(20px) saturate(1.8)",
                WebkitBackdropFilter: "blur(20px) saturate(1.8)",
                borderRadius: "18px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 40px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
                overflow: "hidden",
                padding: "6px",
              }}
            >
              <Image
                src="/Dashboard.webp"
                alt="Dashboard Preview"
                width={820}
                height={512}
                priority={false}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "14px",
                  display: "block",
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
