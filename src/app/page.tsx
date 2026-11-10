import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import ProcessSection from "@/components/sections/ProcessSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import FAQSection from "@/components/sections/FAQSection";
import CTABanner from "@/components/sections/CTABanner";
import { FlowStory } from "@/components/flow/FlowStory";
import { bookingFlow } from "@/components/flow/BookingFlowScenes";
import { getFeaturedPortfolioItems } from "@/lib/portfolio";

export default function HomePage() {
  return (
    <>
      <HeroSection flow={<FlowStory {...bookingFlow} autoPlay />} />
      <ServicesSection />
      <WhyUsSection />
      <ProcessSection />
      <PortfolioSection items={getFeaturedPortfolioItems()} />
      <FAQSection />
      <CTABanner />
    </>
  );
}
