import dynamic from "next/dynamic";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import StackSection from "@/components/sections/StackSection";

const WorkSection = dynamic(
  () => import("@/components/sections/WorkSection")
);
const PlaygroundSection = dynamic(
  () => import("@/components/sections/PlaygroundSection")
);
const ContactSection = dynamic(
  () => import("@/components/sections/ContactSection")
);

export default function Home() {
  return (
    <main style={{ backgroundColor: "#ffffff" }}>
      {/* === Hero — Dark Cinematic === */}
      <HeroSection />

      {/* === Content Sections === */}
      <AboutSection />
      <StackSection />
      <WorkSection />
      <PlaygroundSection />
      <ContactSection />
    </main>
  );
}
