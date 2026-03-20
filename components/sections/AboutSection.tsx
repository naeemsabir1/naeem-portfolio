"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { aboutData } from "@/data/content";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const METRICS = [
  { value: 30, suffix: "+", label: "Projects Shipped" },
  { value: 6, suffix: "+", label: "Years Building" },
  { value: 100, suffix: "%", label: "Client Satisfaction" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: value,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
      onUpdate: () => { el.textContent = Math.round(obj.val) + suffix; },
    });
  }, [value, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Animate the photo container from the left
    if (leftColRef.current) {
        gsap.fromTo(leftColRef.current, 
            { x: -40, opacity: 0 },
            { x: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: leftColRef.current, start: "top 80%", toggleActions: "play none none none" } }
        );
    }
    
    // Animate text elements stagger from below
    if (rightColRef.current) {
        const els = rightColRef.current.querySelectorAll("[data-reveal]");
        els.forEach((el, i) => {
        gsap.fromTo(el,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, delay: i * 0.08, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" } }
        );
        });
    }

  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="about-section"
      style={{
        backgroundColor: "#fafafa",
        padding: "160px 0",
        width: "100%",
        fontFamily: "'SF Pro Text', Inter, sans-serif",
        position: "relative",
        overflow: "hidden" // for decorative elements
      }}
    >
      {/* Decorative dot pattern background behind photo area */}
      <div className="dot-pattern-bg" style={{
        position: "absolute",
        top: "-10%",
        left: "-10%",
        width: "60%",
        height: "120%",
        opacity: 0.6,
        pointerEvents: "none",
        zIndex: 0,
      }}></div>

      {/* Thin curved SVG line (tended vine curve) */}
      <svg 
        style={{
            position: "absolute",
            top: "10%",
            right: "5%",
            width: "400px",
            height: "400px",
            opacity: 0.1,
            pointerEvents: "none",
            zIndex: 0,
        }}
        viewBox="0 0 200 200" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M 180 -20 C 130 50, 200 120, 100 180 C 40 216, -20 120, -50 150" stroke="#2d6a4f" strokeWidth="2" strokeLinecap="round" />
        <path d="M 130 -10 C 150 40, 60 90, 80 160" stroke="#2d6a4f" strokeWidth="1" strokeLinecap="round" />
      </svg>


      <div className="about-container" style={{
        maxWidth: "1280px", margin: "0 auto", padding: "0 24px",
        display: "grid", alignItems: "start",
        position: "relative", zIndex: 1
      }}>
        {/* LEFT COLUMN (45%) */}
        <div ref={leftColRef} className="about-left" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          
          <div className="photo-wrapper" style={{ position: "relative", width: "fit-content", marginLeft: "auto", marginRight: "auto" }}>
            {/* Green offset card */}
            <div className="photo-bg-card" style={{
                position: "absolute",
                top: "12px",
                left: "12px",
                right: "-12px",
                bottom: "-12px",
                backgroundColor: "#2d6a4f",
                borderRadius: "24px",
                zIndex: -1,
            }}></div>
            
            {/* Main Photo Card */}
            <div className="photo-container" style={{
                width: "100%",
                maxWidth: "360px",
                aspectRatio: "360 / 440",
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow: "0 4px 16px rgba(0,0,0,0.06), 0 20px 60px rgba(0,0,0,0.08)",
                backgroundColor: "#f5f5f7", /* fallback */
            }}>
                <Image 
                    src="/my-image.webp" 
                    alt="Naeem Sabir"
                    width={360}
                    height={440}
                    priority
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block"
                    }} 
                />
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "16px" }}>
            <div style={{
              fontSize: "24px", fontWeight: 600, color: "#1d1d1f",
              fontFamily: "'SF Pro Display', -apple-system, sans-serif",
              letterSpacing: "-0.01em"
            }}>{aboutData.name}</div>
            <div style={{
              fontSize: "15px", color: "#6e6e73", marginTop: "4px",
              fontWeight: 500
            }}>Digital Product Engineer</div>
            
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "12px" }}>
                <div className="status-dot"></div>
                <div style={{ fontSize: "12px", color: "#86868b", fontWeight: 500 }}>Available for projects</div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (55%) */}
        <div ref={rightColRef} className="about-right" style={{ paddingTop: "20px" }}>
          <div data-reveal style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
            <div style={{ width: "32px", height: "1px", backgroundColor: "#86868b" }}></div>
            <div style={{
                fontSize: "11px", fontWeight: 600, textTransform: "uppercase",
                letterSpacing: "0.18em", color: "#86868b",
            }}>About</div>
          </div>

          {/* Headline with pure CSS moss gradient hover */}
          <h2 
            data-reveal 
            className="hover-moss-text"
            style={{
              fontSize: "clamp(28px, 3.2vw, 44px)", fontWeight: 700,
              lineHeight: 1.1, letterSpacing: "-0.035em", color: "#1d1d1f",
              fontFamily: "'SF Pro Display', -apple-system, sans-serif", margin: 0,
              maxWidth: "600px",
            }}>
            I build software that people genuinely enjoy using.
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginTop: "40px" }}>
            <p data-reveal style={{
              fontSize: "17px", lineHeight: 1.7, color: "#424245",
              maxWidth: "520px"
            }}>
              I engineer high-performance websites and intelligent applications. By deeply integrating agentic models into my workflow, I supercharge my creative and technical output, delivering complex solutions at unprecedented speeds.
            </p>

            <p data-reveal style={{
              fontSize: "17px", lineHeight: 1.7, color: "#424245",
              maxWidth: "520px"
            }}>
              I believe that the best software is not just functional, but deeply intuitive and beautifully crafted. My approach blends rigorous system architecture with an obsessive attention to user experience. Whether it's optimizing a complex background job or refining a micro-animation, I treat every line of code as an opportunity to build something exceptional.
            </p>
          </div>

          {/* Metrics */}
          <div data-reveal style={{
            display: "flex", gap: "48px", marginTop: "64px",
            paddingTop: "40px",
            borderTop: "1px solid rgba(0,0,0,0.06)",
            flexWrap: "wrap",
            maxWidth: "520px"
          }}>
            {METRICS.map((m) => (
               <div key={m.label} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{
                  fontSize: "38px", fontWeight: 700, letterSpacing: "-0.03em",
                  color: "#1d1d1f",
                  fontFamily: "'SF Pro Display', -apple-system, sans-serif",
                }}>
                  <AnimatedCounter value={m.value} suffix={m.suffix} />
                </div>
                <div style={{
                   fontSize: "13px", fontWeight: 500, color: "#86868b",
                   letterSpacing: "-0.01em"
                }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .dot-pattern-bg {
            background-image: radial-gradient(rgba(0,0,0,0.03) 2px, transparent 2px);
            background-size: 24px 24px;
        }

        .about-container {
            grid-template-columns: 45% 55%;
            gap: 64px;
        }

        .photo-container {
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
        }

        div:has(> .photo-bg-card):hover .photo-container {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.08), 0 24px 64px rgba(0,0,0,0.1);
        }

        .status-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #2d6a4f;
            animation: pulse-dot 2s infinite cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes pulse-dot {
            0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(45, 106, 79, 0.7); }
            70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(45, 106, 79, 0); }
            100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(45, 106, 79, 0); }
        }
      `}</style>
      <style jsx global>{`
         .hover-moss-text {
            background: linear-gradient(to right, #1d1d1f 50%, #2d6a4f 100%);
            background-size: 200% auto;
            color: #1d1d1f;
            background-clip: text;
            WebkitBackgroundClip: text;
            WebkitTextFillColor: currentColor;
            transition: background-position 0.5s ease;
         }
         .hover-moss-text:hover {
            background-position: right center;
            WebkitTextFillColor: transparent;
         }

        @media (max-width: 900px) {
          .about-container {
            grid-template-columns: 1fr !important;
            gap: 64px !important;
          }
        }
        
        @media (max-width: 768px) {
          .about-section {
              padding: 80px 0 !important;
          }
          .photo-bg-card {
              display: none !important;
          }
          .photo-container {
              max-width: 280px !important;
          }
          .about-left {
              align-items: center;
          }
          .about-right {
              align-items: center;
              text-align: center;
          }
          .about-right > div:first-child {
              justify-content: center;
          }
          .about-right p {
             margin: 0 auto;
          }
          .about-right .hover-moss-text {
             margin: 0 auto;
          }
          .about-right > div:last-child { /* metrics */
             justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}

