import Hero from "@/components/marketing/Hero";
import Features from "@/components/marketing/Features";
import EventsSlider from "@/components/marketing/EventsSlider";
import OdsSection from "@/components/marketing/OdsSection";
import JoinUs from "@/components/marketing/JoinUs";
import ContactSection from "@/components/marketing/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="relative z-10 bg-slate-50">
        <Features />
        <EventsSlider />
        <OdsSection />
        <JoinUs />
      </div>
      <ContactSection />
    </>
  );
}
