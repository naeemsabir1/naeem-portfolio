"use client";

import { useEffect, useRef, MouseEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Custom Abstract SVG Icons based on the Apple SF Symbols style logic
const IconFlutter = () => (
    <svg viewBox="0 0 24 24" fill="none" style={{width: '100%', height: '100%'}}>
        <path d="M14.314 0L2.3 12L7.1 16.8L19.114 4.8L14.314 0Z" fill="#027DFD" opacity="0.8"/>
        <path d="M14.314 11.23L11.028 14.516L14.314 17.802L19.114 13.003L14.314 11.23Z" fill="#027DFD"/>
        <path d="M7.10001 16.8001L14.314 24.0141H19.114L9.50001 14.4001L7.10001 16.8001Z" fill="#01579B"/>
    </svg>
);

const IconDart = () => (
    <svg viewBox="0 0 24 24" style={{width: '100%', height: '100%'}}>
        <path d="M12.9 2L2 12.9L2 17.5L8.2 23.7C8.6 24.1 9.2 24.1 9.6 23.7L22 11.3V5.5L18.5 2H12.9Z" fill="#0175C2" opacity="0.8"/>
        <path d="M18.5 2H12.9L9.6 5.3L18.5 14V5.5L18.5 2Z" fill="#0175C2"/>
    </svg>
);

const IconPython = () => (
    <svg viewBox="0 0 24 24" fill="none" style={{width: '100%', height: '100%'}}>
        <path d="M12 2C8 2 8 5 8 5H16V7H8C6 7 5 8.5 5 11C5 13.5 6 15 8 15H10V13C10 11.5 11.5 10 13 10H17C18.5 10 20 8.5 20 6C20 3.5 18.5 2 17 2H12ZM9 3.5A1 1 0 119 5.5A1 1 0 019 3.5ZM12 22C16 22 16 19 16 19H8V17H16C18 17 19 15.5 19 13C19 10.5 18 9 16 9H14V11C14 12.5 12.5 14 11 14H7C5.5 14 4 15.5 4 18C4 20.5 5.5 22 7 22H12ZM15 20.5A1 1 0 1115 18.5A1 1 0 0115 20.5Z" fill="#3776AB"/>
        <path d="M12 22C16 22 16 19 16 19H8V17H16C18 17 19 15.5 19 13C19 10.5 18 9 16 9H14V11C14 12.5 12.5 14 11 14H7C5.5 14 4 15.5 4 18C4 20.5 5.5 22 7 22H12ZM15 20.5A1 1 0 1115 18.5A1 1 0 0115 20.5Z" fill="#FFD43B"/>
    </svg>
);

const IconReact = () => (
    <svg viewBox="-11.5 -10.23 23 20.46" style={{width: '100%', height: '100%'}}>
        <circle cx="0" cy="0" r="2" fill="#61DAFB"/>
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2"/>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
    </svg>
);

const IconNext = () => (
    <svg viewBox="0 0 24 24" style={{width: '100%', height: '100%'}}>
        <circle cx="12" cy="12" r="12" fill="black"/>
        <path d="M10.6 15.65L5.43 8.12V16.87H4.25V7.12H5.43L10.65 14.71L14.06 9.15V14.71H15.25V8.12H14.06L10.6 15.65Z" fill="white"/>
    </svg>
);

const IconTypeScript = () => (
    <svg viewBox="0 0 24 24" style={{width: '100%', height: '100%'}}>
        <rect width="24" height="24" rx="4" fill="#3178C6"/>
        <path d="M11.25 10H6V11.5H7.75V18H9.5V11.5H11.25V10ZM18.5 14C18.5 13 17.5 12.5 16 12C14.75 11.75 14.5 11.5 14.5 11C14.5 10.5 15 10.25 15.5 10.25C16.25 10.25 16.5 10.5 16.75 11L18.25 10C17.75 9 16.75 8.5 15.5 8.5C14 8.5 12.5 9.25 12.5 11C12.5 12 13.5 12.5 15 13C16.5 13.5 16.5 13.75 16.5 14.25C16.5 15 15.75 15.25 15.25 15.25C14.25 15.25 13.75 14.5 13.5 14L12 15C12.5 16 13.75 17 15.25 17C17 17 18.5 16 18.5 14Z" fill="white"/>
    </svg>
);

const IconAI = () => (
    <svg viewBox="0 0 48 48" fill="none" style={{width: '100%', height: '100%', overflow: 'visible'}}>
        <style dangerouslySetInnerHTML={{__html:`
            @keyframes pulse-node {
                0%, 100% { fill: #2d6a4f; r: 3; opacity: 1; }
                50% { fill: #40916c; r: 4; opacity: 0.8; }
            }
            @keyframes dash-flow {
                0% { stroke-dashoffset: 20; }
                100% { stroke-dashoffset: 0; }
            }
            .ai-node { animation: pulse-node 2s infinite ease-in-out; }
            .ai-node:nth-child(2) { animation-delay: 0.3s; }
            .ai-node:nth-child(3) { animation-delay: 0.6s; }
            .ai-node:nth-child(4) { animation-delay: 0.9s; }
            .ai-node:nth-child(5) { animation-delay: 1.2s; }
            .ai-line { 
                stroke: #2d6a4f; stroke-width: 1.5; opacity: 0.4;
                stroke-dasharray: 4 4; animation: dash-flow 2s linear infinite;
            }
        `}} />
        <path d="M12 24 L24 12 L36 24 L24 36 Z M12 24 L36 24 M24 12 L24 36" className="ai-line" />
        <circle cx="12" cy="24" r="3" className="ai-node"/>
        <circle cx="24" cy="12" r="3" className="ai-node"/>
        <circle cx="36" cy="24" r="3" className="ai-node"/>
        <circle cx="24" cy="36" r="3" className="ai-node"/>
        <circle cx="24" cy="24" r="3" className="ai-node" style={{fill: "#1b4332"}}/>
    </svg>
);

const IconSupabase = () => (
    <svg viewBox="0 0 24 24" style={{width: '100%', height: '100%'}}>
        <circle cx="12" cy="12" r="12" fill="#3ECF8E" opacity="0.2"/>
        <path d="M13.2 2.4C13 2.1 12.6 2 12.3 2.1C12 2.2 11.8 2.5 11.8 2.8L11 10H6.5C6.1 10 5.8 10.2 5.7 10.5C5.6 10.8 5.7 11.2 5.9 11.4L15.3 22.4C15.5 22.7 15.9 22.8 16.2 22.7C16.5 22.6 16.7 22.3 16.7 22L17.5 14H22C22.4 14 22.7 13.8 22.8 13.5C22.9 13.2 22.8 12.8 22.6 12.6L13.2 2.4Z" fill="#3ECF8E"/>
    </svg>
);

const IconAngular = () => (
    <svg viewBox="0 0 24 24" style={{width: '100%', height: '100%'}}>
        <path d="M12 2L2 5.5L3.5 17L12 22L20.5 17L22 5.5L12 2ZM12 4.5L17.5 15H15.5L14.2 12H9.8L8.5 15H6.5L12 4.5ZM12 7.5L10.5 10.5H13.5L12 7.5Z" fill="#DD0031"/>
    </svg>
);

const IconHtmlCss = () => (
    <svg viewBox="0 0 24 24" style={{width: '100%', height: '100%'}}>
        <path d="M3 4L4.5 20L12 22L19.5 20L21 4H3ZM16.5 15.5L12 17L7.5 15.5L7.2 11.5H15.8L16 9.5H7L6.8 7.5H16.2L16.5 15.5Z" fill="#E34F26"/>
    </svg>
);


function BentoCard({ 
  name, category, color, span, icon, children, isHero 
}: { 
  name: string, category: string, color: string, span: number, icon: React.ReactNode, children?: React.ReactNode, isHero?: boolean 
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    // Max tilt is 5 degrees
    card.style.transform = `perspective(800px) rotateX(${y * -10}deg) rotateY(${x * 10}deg)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg)`;
  };

  return (
    <div
      ref={cardRef}
      className={`bento-card col-span-${span} ${isHero ? 'hero-card' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-reveal
      style={{
        background: "#ffffff",
        borderRadius: "24px",
        padding: isHero ? "40px" : "32px",
        display: "flex",
        flexDirection: isHero ? "row" : "column",
        gap: "24px",
        alignItems: isHero ? "center" : "flex-start",
        justifyContent: "space-between",
        border: "1px solid rgba(0,0,0,0.04)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
        cursor: "pointer",
        position: "relative",
        transformStyle: "preserve-3d",
        transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, background-color 0.4s ease",
        // Pass the brand color to CSS for the glow
        "--hover-color": color
      } as React.CSSProperties}
    >
        <div className="icon-wrapper" style={{
           width: "48px",
           height: "48px",
           flexShrink: 0,
           transform: "translateZ(30px)",
           transition: "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
        }}>
           {icon}
        </div>

        <div style={{ transform: "translateZ(20px)", flex: 1, position: "relative", zIndex: 2 }}>
            <div style={{
                fontSize: "11px", fontWeight: 700, textTransform: "uppercase",
                letterSpacing: "0.15em", color: "#86868b", marginBottom: "8px"
            }}>
                {category}
            </div>
            <div style={{
                 fontSize: isHero ? "32px" : "20px", fontWeight: 700,
                 color: "#1d1d1f",
                 fontFamily: "'SF Pro Display', -apple-system, sans-serif",
                 letterSpacing: "-0.02em"
            }}>
                {name}
            </div>
            {children}
        </div>
    </div>
  );
}

export default function StackSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        
        const cards = section.querySelectorAll(".bento-card");
        gsap.fromTo(cards,
            { y: 60, opacity: 0, scale: 0.96 },
            { 
               y: 0, opacity: 1, scale: 1,
               duration: 0.7, 
               stagger: 0.08, 
               ease: "power3.out",
               scrollTrigger: { 
                   trigger: section, 
                   start: "top 80%", 
                   toggleActions: "play none none none" 
               } 
            }
        );
        
        if (headingRef.current) {
            gsap.fromTo(headingRef.current,
               { y: 30, opacity: 0 },
               { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: headingRef.current, start: "top 85%" } }
            );
        }

    }, []);

    return (
        <section
            ref={sectionRef}
            style={{
                backgroundColor: "#f7f7f8", // Crisp light gray
                padding: "160px 0",
                width: "100%",
                fontFamily: "'SF Pro Text', Inter, sans-serif",
            }}
        >
            <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
                
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
                    <div style={{ width: "32px", height: "1px", backgroundColor: "#86868b" }}></div>
                    <div style={{
                        fontSize: "11px", fontWeight: 600, textTransform: "uppercase",
                        letterSpacing: "0.18em", color: "#86868b",
                    }}>Capabilities</div>
                </div>
                
                <div ref={headingRef} style={{ marginBottom: "80px" }}>
                    <h2 
                        className="hover-moss-text"
                        style={{
                            fontSize: "clamp(48px, 5.5vw, 80px)", fontWeight: 700,
                            lineHeight: 1.05, letterSpacing: "-0.04em", color: "#1d1d1f",
                            fontFamily: "'SF Pro Display', -apple-system, sans-serif", margin: 0,
                            maxWidth: "800px"
                        }}
                    >
                        The Stack.
                    </h2>
                    <div style={{
                        fontSize: "clamp(20px, 2.5vw, 24px)", color: "#86868b", 
                        letterSpacing: "-0.01em", marginTop: "16px", maxWidth: "600px"
                    }}>
                        Technologies I use to build fast, scalable, and beautiful digital products.
                    </div>
                </div>

                <div className="bento-grid">
                    {/* Row 1 */}
                    <BentoCard name="Flutter" category="Primary Stack" color="#027DFD" span={6} icon={<IconFlutter />} isHero>
                        <div className="hero-text-content" style={{ marginTop: "12px", color: "#6e6e73", fontSize: "15px", lineHeight: 1.6, maxWidth: "340px" }}>
                            Primary expertise. Building complex, native-feeling applications across mobile, web, and desktop from a single codebase.
                        </div>
                        
                        {/* Right-aligned dark mini phone preview */}
                        <div className="hero-mockup-wrapper" style={{
                            position: "absolute", right: "32px", top: "50%", transform: "translateY(-50%) translateZ(40px)",
                            display: "flex", pointerEvents: "none", zIndex: 1
                        }}>
                            <div className="flutter-mockup" style={{
                                width: "120px", height: "180px", borderRadius: "16px", backgroundColor: "#1d1d1f", 
                                border: "4px solid #000", transform: "rotate(-4deg)", // subtle angle
                                display: "flex", flexDirection: "column", overflow: "hidden", 
                                boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
                            }}>
                                <div style={{ width: "100%", height: "24px", borderBottom: "1px solid #333", display: "flex", alignItems: "center", padding: "0 8px" }}>
                                    <div style={{width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "#ff5f56"}}></div>
                                </div>
                                <div style={{ flex: 1, padding: "8px", display: "flex", flexDirection: "column", gap: "6px" }}>
                                    <div style={{width: "60%", height: "4px", backgroundColor: "#333", borderRadius: "2px"}}></div>
                                    <div style={{width: "80%", height: "4px", backgroundColor: "#333", borderRadius: "2px"}}></div>
                                    <div style={{width: "40%", height: "4px", backgroundColor: "#027DFD", borderRadius: "2px", marginTop: "4px"}}></div>
                                    <div style={{width: "100%", height: "40%", backgroundColor: "#333", borderRadius: "4px", marginTop: "12px"}}></div>
                                </div>
                            </div>
                        </div>
                    </BentoCard>
                    <BentoCard name="Dart" category="Mobile Native" color="#0175C2" span={3} icon={<IconDart />} />
                    <BentoCard name="Python" category="AI & Backend" color="#3776AB" span={3} icon={<IconPython />} />
                    
                    {/* Row 2 */}
                    <BentoCard name="React" category="Frontend Layer" color="#61DAFB" span={3} icon={<IconReact />} />
                    <BentoCard name="Next.js" category="Full-Stack Web" color="#000000" span={3} icon={<IconNext />} />
                    <BentoCard name="TypeScript" category="Type System" color="#3178C6" span={3} icon={<IconTypeScript />} />
                    <BentoCard name="AI / LLMs" category="Intelligence" color="#2d6a4f" span={3} icon={<IconAI />}>
                        <div style={{ marginTop: "12px", color: "#6e6e73", fontSize: "14px", lineHeight: 1.5 }}>
                            Integrating intelligence into every layer of the stack.
                        </div>
                    </BentoCard>

                    {/* Row 3 */}
                    <BentoCard name="Supabase" category="Database & Auth" color="#3ECF8E" span={4} icon={<IconSupabase />} />
                    <BentoCard name="Angular" category="Enterprise Web" color="#DD0031" span={4} icon={<IconAngular />} />
                    <BentoCard name="HTML / CSS" category="Design Core" color="#E34F26" span={4} icon={<IconHtmlCss />} />
                </div>
            </div>

            <style jsx global>{`
                .bento-grid {
                    display: grid;
                    grid-template-columns: repeat(12, 1fr);
                    gap: 24px;
                }
                
                .col-span-6 { grid-column: span 6; }
                .col-span-4 { grid-column: span 4; }
                .col-span-3 { grid-column: span 3; }

                .bento-card:hover {
                    background-color: #fafafa !important;
                    box-shadow: 0 0 24px var(--hover-color, rgba(0,0,0,0.1)), 0 8px 32px rgba(0,0,0,0.08) !important;
                    z-index: 10;
                }

                .bento-card:hover .icon-wrapper {
                    transform: translateZ(40px) scale(1.08) !important;
                }

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

                @media (max-width: 1024px) {
                    .bento-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    .col-span-6, .col-span-4, .col-span-3 {
                        grid-column: span 1;
                    }
                    .col-span-6 {
                        grid-column: span 2;
                    }
                }

                @media (max-width: 768px) {
                    .bento-grid {
                        grid-template-columns: 1fr;
                    }
                    .col-span-6, .col-span-4, .col-span-3 {
                        grid-column: span 1;
                    }
                    .hero-card {
                        flex-direction: column !important;
                        align-items: flex-start !important;
                    }
                    .hero-mockup-wrapper {
                        display: none !important;
                    }
                    .hero-text-content {
                        max-width: 100% !important;
                    }
                }
            `}</style>
        </section>
    );
}
