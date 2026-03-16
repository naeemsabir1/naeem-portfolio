"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { aboutData } from "@/data/content";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section || !contentRef.current) return;
        
        // Ensure animations trigger cleanly once per scroll down
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top 75%",
                toggleActions: "play none none none"
            }
        });

        // 1. Label
        timeline.fromTo(".contact-label", 
            { y: 20, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
        );

        // 2. Heading
        if (headingRef.current) {
            timeline.fromTo(headingRef.current,
                { scale: 0.95, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.8, ease: "power3.out" },
                "-=0.4"
            );
        }

        // 3. Subtitle
        timeline.fromTo(".contact-subtitle",
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
            "-=0.6"
        );

        // 4. Service Cards - Staggered
        timeline.fromTo(".service-card",
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
            "-=0.4"
        );

        // 5. Primary CTA Button
        timeline.fromTo(".primary-cta",
            { scale: 0.9, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.5)" },
            "-=0.2"
        );

        // 6. Secondary Buttons & Rest
        timeline.fromTo(".secondary-fade",
            { y: 15, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
            "-=0.2"
        );
        
        return () => {
            timeline.kill();
        };
    }, []);

    const serviceCardStyle = {
        background: "#ffffff",
        border: "1px solid rgba(0,0,0,0.06)",
        borderRadius: "16px",
        padding: "28px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        flex: "1 1 300px",
        transition: "all 0.3s ease",
        cursor: "default"
    } as React.CSSProperties;

    return (
        <section
            id="contact"
            ref={sectionRef}
            style={{
                backgroundColor: "#fafafa",
                padding: "160px 0 0",
                width: "100%",
                fontFamily: "'SF Pro Text', Inter, sans-serif",
                position: "relative"
            }}
        >
            <div ref={contentRef} style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 24px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                
                <div className="contact-label" style={{
                    fontSize: "12px", fontWeight: 600, textTransform: "uppercase",
                    letterSpacing: "0.2em", color: "#86868b", marginBottom: "24px"
                }}>
                    — Let's Build Together
                </div>

                <h2 
                    ref={headingRef}
                    className="closing-heading"
                    style={{
                        fontSize: "clamp(44px, 7vw, 88px)", fontWeight: 800,
                        lineHeight: 1.05, letterSpacing: "-0.04em", margin: "0 0 24px 0",
                        display: "inline-block",
                        background: "linear-gradient(135deg, #1d1d1f 0%, #2d6a4f 100%)",
                        backgroundSize: "200% auto",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        transition: "background-position 0.6s ease"
                    }}
                >
                    Let's turn your<br/>idea into reality.
                </h2>

                <p className="contact-subtitle" style={{
                    fontSize: "18px", lineHeight: 1.6, color: "#6e6e73",
                    margin: "0 0 64px 0", maxWidth: "560px", fontWeight: 500
                }}>
                    I craft apps, websites, and AI-powered systems that deliver real business results. Tell me about your project — no commitment, just a conversation.
                </p>

                {/* Service Cards */}
                <div style={{ display: "flex", gap: "24px", width: "100%", flexWrap: "wrap", justifyContent: "center", marginBottom: "64px" }}>
                    {/* Card 1 */}
                    <div className="service-card" style={serviceCardStyle}>
                        <div style={{ alignSelf: "flex-start", display: "flex", alignItems: "center", justifyContent: "center", width: "48px", height: "48px", borderRadius: "12px", backgroundColor: "rgba(45,106,79,0.08)" }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2d6a4f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                                <line x1="12" y1="18" x2="12.01" y2="18" />
                            </svg>
                        </div>
                        <div style={{ textAlign: "left" }}>
                            <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#1d1d1f", margin: "0 0 4px 0", fontFamily: "'SF Pro Display', sans-serif" }}>Mobile App</h3>
                            <p style={{ fontSize: "13px", color: "#86868b", margin: "0" }}>iOS & Android</p>
                        </div>
                        <div style={{ textAlign: "left", marginTop: "auto", paddingTop: "8px" }}>
                            <span style={{ fontSize: "14px", fontWeight: 600, color: "#2d6a4f" }}>Affordable & Custom</span>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="service-card" style={serviceCardStyle}>
                        <div style={{ alignSelf: "flex-start", display: "flex", alignItems: "center", justifyContent: "center", width: "48px", height: "48px", borderRadius: "12px", backgroundColor: "rgba(45,106,79,0.08)" }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2d6a4f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="2" y1="12" x2="22" y2="12" />
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                            </svg>
                        </div>
                        <div style={{ textAlign: "left" }}>
                            <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#1d1d1f", margin: "0 0 4px 0", fontFamily: "'SF Pro Display', sans-serif" }}>Website</h3>
                            <p style={{ fontSize: "13px", color: "#86868b", margin: "0" }}>Web Platform or E-Commerce</p>
                        </div>
                        <div style={{ textAlign: "left", marginTop: "auto", paddingTop: "8px" }}>
                            <span style={{ fontSize: "14px", fontWeight: 600, color: "#2d6a4f" }}>Tailored to Your Needs</span>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="service-card" style={serviceCardStyle}>
                        <div style={{ alignSelf: "flex-start", display: "flex", alignItems: "center", justifyContent: "center", width: "48px", height: "48px", borderRadius: "12px", backgroundColor: "rgba(45,106,79,0.08)" }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2d6a4f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
                                <rect x="9" y="9" width="6" height="6" />
                                <line x1="9" y1="1" x2="9" y2="4" />
                                <line x1="15" y1="1" x2="15" y2="4" />
                                <line x1="9" y1="20" x2="9" y2="23" />
                                <line x1="15" y1="20" x2="15" y2="23" />
                                <line x1="20" y1="9" x2="23" y2="9" />
                                <line x1="20" y1="14" x2="23" y2="14" />
                                <line x1="1" y1="9" x2="4" y2="9" />
                                <line x1="1" y1="14" x2="4" y2="14" />
                            </svg>
                        </div>
                        <div style={{ textAlign: "left" }}>
                            <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#1d1d1f", margin: "0 0 4px 0", fontFamily: "'SF Pro Display', sans-serif" }}>AI Workflow</h3>
                            <p style={{ fontSize: "13px", color: "#86868b", margin: "0" }}>Automation & Intelligence</p>
                        </div>
                        <div style={{ textAlign: "left", marginTop: "auto", paddingTop: "8px" }}>
                            <span style={{ fontSize: "14px", fontWeight: 600, color: "#2d6a4f" }}>Smart & Cost-Effective</span>
                        </div>
                    </div>
                </div>

                {/* Primary CTA */}
                <div className="primary-cta" style={{ width: "100%", display: "flex", justifyContent: "center", marginBottom: "32px" }}>
                    <Link 
                        href="/quote"
                        className="cta-primary banner-cta"
                        style={{
                            display: "flex", justifyContent: "center", alignItems: "center", gap: "12px",
                            width: "min(480px, 100%)", height: "60px", 
                            backgroundColor: "#2d6a4f", color: "#ffffff",
                            fontSize: "18px", fontWeight: 700, borderRadius: "16px", textDecoration: "none",
                            boxShadow: "0 4px 16px rgba(45,106,79,0.2), 0 12px 40px rgba(45,106,79,0.15)",
                            fontFamily: "'SF Pro Display', sans-serif"
                        }}
                    >
                        Get a Free Quote
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                        </svg>
                    </Link>
                </div>

                {/* Secondary Row */}
                <div className="secondary-fade" style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center", width: "100%", marginBottom: "40px" }}>
                    <a
                        href="https://wa.me/923066166152?text=Hi%20Naeem%2C%20I%20found%20your%20portfolio%20and%20I%27d%20like%20to%20discuss%20a%20project."
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "16px 36px",
                            borderRadius: "14px",
                            background: "transparent",
                            color: "#1d1d1f",
                            fontSize: "16px",
                            fontWeight: 600,
                            textDecoration: "none",
                            border: "1px solid rgba(0,0,0,0.12)",
                            fontFamily: "'SF Pro Text', -apple-system, sans-serif",
                            transition: "all 0.3s ease",
                        }}
                    >
                        {/* WhatsApp icon — inline SVG */}
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="#25D366"/>
                        </svg>
                        Start a Conversation
                    </a>
                    
                    <a 
                        href={aboutData.githubUrl || "https://github.com/naeemsabir1"} 
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            padding: "14px 32px", border: "1px solid rgba(0,0,0,0.12)", backgroundColor: "transparent", color: "#1d1d1f",
                            borderRadius: "12px", textDecoration: "none", fontWeight: 600, fontSize: "16px",
                            display: "inline-flex", alignItems: "center", gap: "10px", transition: "all 0.2s"
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.03)"; e.currentTarget.style.borderColor = "rgba(0,0,0,0.2)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(0,0,0,0.12)"; }}
                    >
                        View GitHub
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="7" y1="17" x2="17" y2="7" />
                            <polyline points="7 7 17 7 17 17" />
                        </svg>
                    </a>
                </div>

                <div className="secondary-fade" style={{ marginBottom: "64px" }}>
                    <a 
                        href="mailto:naeemsabir002@gmail.com"
                        className="email-link-light"
                        style={{
                            color: "#86868b",
                            fontFamily: "'SF Mono', JetBrains Mono, monospace",
                            fontSize: "14px",
                            textDecoration: "none",
                            transition: "color 0.2s ease"
                        }}
                    >
                        naeemsabir002@gmail.com
                    </a>
                </div>

                {/* Testimonial */}
                <div className="secondary-fade" style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "80px", maxWidth: "480px" }}>
                    <div style={{ fontSize: "48px", color: "rgba(45,106,79,0.2)", lineHeight: "0.5", margin: "0" }}>"</div>
                    <p style={{ fontSize: "15px", color: "#86868b", fontStyle: "italic", lineHeight: 1.6, margin: "16px 0 8px 0" }}>
                        Working with Naeem was exceptional. He delivered beyond our expectations and on time.
                    </p>
                    <div style={{ fontSize: "13px", color: "#a1a1a6", fontWeight: 500 }}>
                        — A satisfied client
                    </div>
                </div>

            </div>

            {/* Dark Footer Bar */}
            <div style={{
                width: "100%", backgroundColor: "#1d1d1f", borderRadius: "24px 24px 0 0",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "24px 40px", fontSize: "13px", color: "rgba(255,255,255,0.4)", fontWeight: 500,
            }} className="footer-layout">
                <div>© {new Date().getFullYear()} {aboutData.name}. All rights reserved.</div>
                
                <div style={{ display: "flex", gap: "24px" }}>
                    <a href={aboutData.githubUrl || "https://github.com/naeemsabir1"} target="_blank" rel="noreferrer" className="social-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                    </a>
                    <a href="https://www.linkedin.com/in/-naeemsabir/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                            <rect x="2" y="9" width="4" height="12"></rect>
                            <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                    </a>
                </div>

                <div>Built with Next.js, GSAP & <span style={{ color: "#52b788" }}>♥</span></div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .closing-heading:hover {
                    background-position: right center !important;
                }
                .service-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 12px 32px rgba(45,106,79,0.08);
                    border-color: rgba(45,106,79,0.2) !important;
                }
                .banner-cta:hover {
                    transform: translateY(-3px) !important;
                }
                .email-link-light:hover {
                    color: #2d6a4f !important;
                    text-decoration: underline !important;
                }
                .social-icon {
                    color: rgba(255,255,255,0.3);
                    transition: color 0.3s ease, transform 0.3s ease;
                }
                .social-icon:hover {
                    color: #ffffff;
                    transform: translateY(-2px);
                }
                @media (max-width: 600px) {
                    .footer-layout {
                        flex-direction: column;
                        gap: 20px;
                        text-align: center;
                        padding: 32px 24px !important;
                        border-radius: 16px 16px 0 0 !important;
                    }
                    .service-card {
                        flex: 1 1 100% !important;
                    }
                }
            `}} />
        </section>
    );
}
