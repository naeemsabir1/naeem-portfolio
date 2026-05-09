"use client";
// LinkedIn / GitHub / Email — replaces the "Beyond the Code" block.

import { sounds } from "@/lib/audio";

const CHIPS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/-naeemsabir/",
    handle: "/in/-naeemsabir",
    accent: "#0a66c2",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.86-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.86 3.37-1.86 3.6 0 4.27 2.37 4.27 5.46v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/>
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/naeemsabir1",
    handle: "@naeemsabir1",
    accent: "#0f172a",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 .3a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.94 0-1.31.47-2.39 1.24-3.23-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23A11.5 11.5 0 0 1 12 6.8c1.02 0 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.92 1.24 3.23 0 4.62-2.81 5.63-5.49 5.93.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.58A12 12 0 0 0 12 .3"/>
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:naeemsabir1@gmail.com?subject=Hi%20Naeem%2C%20saw%20your%20portfolio",
    handle: "naeemsabir1@gmail.com",
    accent: "#2d6a4f",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
];

export default function ConnectChips() {
  return (
    <div style={{
      display: "flex", flexWrap: "wrap", gap: 10,
      maxWidth: 540,
    }}>
      {CHIPS.map((c) => (
        <a
          key={c.label}
          href={c.href}
          target={c.href.startsWith("http") ? "_blank" : undefined}
          rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
          data-cursor="click"
          onMouseEnter={() => sounds.hover()}
          className="connect-chip"
          style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "10px 16px",
            borderRadius: 100,
            background: "#ffffff",
            border: "1px solid rgba(15,23,42,0.10)",
            textDecoration: "none",
            fontFamily: "var(--font-inter), Inter, sans-serif",
            transition: "transform 0.25s cubic-bezier(0.16,1,0.3,1), border-color 0.25s ease, box-shadow 0.25s ease",
            ["--chipAccent" as string]: c.accent,
          } as React.CSSProperties}
        >
          <span style={{
            color: c.accent, display: "inline-flex",
          }}>{c.icon}</span>
          <span style={{
            display: "inline-flex", alignItems: "baseline", gap: 6,
          }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#0f172a", letterSpacing: "-0.01em" }}>
              {c.label}
            </span>
            <span style={{ fontSize: 11, color: "#94a3b8", fontFamily: "var(--font-mono), monospace" }}>
              {c.handle}
            </span>
          </span>
          <span aria-hidden className="connect-arrow" style={{
            display: "inline-flex", color: c.accent,
            transition: "transform 0.25s cubic-bezier(0.16,1,0.3,1), opacity 0.2s ease",
            opacity: 0,
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </span>
        </a>
      ))}
      <style jsx>{`
        .connect-chip:hover {
          transform: translateY(-2px);
          border-color: var(--chipAccent) !important;
          box-shadow: 0 6px 20px rgba(15,23,42,0.08);
        }
        .connect-chip:hover .connect-arrow { opacity: 1; transform: translate(2px,-2px); }
      `}</style>
    </div>
  );
}
