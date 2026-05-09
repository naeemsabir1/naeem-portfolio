"use client";

import ForgeSection from "@/components/stack/forge/ForgeSection";

/**
 * "The Forge" — a 2026 living-bento of interactive micro-demos floating over an
 * ambient WebGL constellation, with a Linear-style command bar + ⌘K palette.
 *
 * The legacy chip-grid implementation is preserved on disk under
 * components/stack/{HeroSkillCard,SkillCard,ConstellationCanvas,CategoryTabs}.tsx
 * but is no longer imported. Safe rollback: re-import them here if needed.
 */
export default function StackSection() {
  return <ForgeSection />;
}
