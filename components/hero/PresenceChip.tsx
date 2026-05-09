"use client";
// Live "online · 02:30 PKT" chip. Auto-detects status by Pakistan business hours.

import { useEffect, useState } from "react";

type Status = { color: string; label: string };

function getStatus(hour: number): Status {
  if (hour >= 9 && hour < 21) return { color: "#52b788", label: "Online" };
  if (hour >= 21 && hour < 24) return { color: "#facc15", label: "Away" };
  return { color: "#60a5fa", label: "Sleeping" };
}

export default function PresenceChip({ dark = true }: { dark?: boolean }) {
  const [time, setTime] = useState<string>("");
  const [status, setStatus] = useState<Status>({ color: "#52b788", label: "Online" });

  useEffect(() => {
    const update = () => {
      const fmt = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Karachi",
        hour: "2-digit", minute: "2-digit", hour12: false,
      });
      const parts = fmt.format(new Date()); // "HH:mm"
      setTime(parts);
      const hour = parseInt(parts.split(":")[0], 10);
      setStatus(getStatus(hour));
    };
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  const fg = dark ? "rgba(255,255,255,0.85)" : "#0f172a";
  const sub = dark ? "rgba(255,255,255,0.45)" : "rgba(15,23,42,0.5)";
  const bg = dark ? "rgba(255,255,255,0.06)" : "rgba(15,23,42,0.05)";
  const bd = dark ? "rgba(255,255,255,0.10)" : "rgba(15,23,42,0.08)";

  return (
    <a
      href="mailto:naeemsabir1@gmail.com?subject=Hi%20Naeem%2C%20saw%20your%20portfolio"
      title={`${status.label} in Karachi · click to email`}
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "5px 10px 5px 8px",
        borderRadius: 100,
        background: bg,
        border: `1px solid ${bd}`,
        textDecoration: "none",
        fontFamily: "var(--font-mono), monospace",
        fontSize: 11,
        fontWeight: 500,
        color: fg,
        transition: "background 0.3s ease, border-color 0.3s ease",
      }}
    >
      <span style={{ position: "relative", display: "inline-flex", width: 8, height: 8 }}>
        <span style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          background: status.color, opacity: 0.55,
          animation: "presenceRipple 1.8s ease-out infinite",
        }} />
        <span style={{
          position: "relative", width: 8, height: 8, borderRadius: "50%",
          background: status.color, boxShadow: `0 0 6px ${status.color}`,
        }} />
      </span>
      <span style={{ color: fg }}>{status.label}</span>
      <span style={{ color: sub }}>·</span>
      <span style={{ color: sub, letterSpacing: "0.04em" }}>{time} PKT</span>
    </a>
  );
}
