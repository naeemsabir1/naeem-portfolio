import HeroScrollSequence from "@/components/HeroScrollSequence";
import HeroDivider from "@/components/sections/HeroDivider";
import AboutSection from "@/components/sections/AboutSection";
import StackSection from "@/components/sections/StackSection";
import WorkSection from "@/components/sections/WorkSection";
import PlaygroundSection from "@/components/sections/PlaygroundSection";
import ContactSection from "@/components/sections/ContactSection";

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
