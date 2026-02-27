import { Hero } from "@/components/landing/Hero";
import { About } from "@/components/landing/About";
import { Pricing } from "@/components/landing/Pricing";
import { Waitlist } from "@/components/landing/Waitlist";
import { SectionWrapper } from "@/components/landing/SectionWrapper";

export default function Home() {
  return (
    <main className="min-h-screen bg-black overflow-x-hidden">
      <Hero />

      <SectionWrapper>
        <About />
      </SectionWrapper>

      <SectionWrapper>
        <Pricing />
      </SectionWrapper>

      <SectionWrapper>
        <Waitlist />
      </SectionWrapper>
    </main>
  );
}
