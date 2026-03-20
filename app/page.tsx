import dynamic from "next/dynamic";
import HeroScrollSequence from "@/components/HeroScrollSequence";
import HeroDivider from "@/components/sections/HeroDivider";
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
    <main style={{ backgroundColor: "#fafafa" }}>
      {/* === DO NOT TOUCH — Hero Scroll Animation === */}
      <HeroScrollSequence />

      {/* === Dark-to-Light transition bridge === */}
      <HeroDivider />

      {/* === Content Sections === */}
      <AboutSection />
      <StackSection />
      <WorkSection />
      <PlaygroundSection />
      <ContactSection />
    </main>
  );
}
