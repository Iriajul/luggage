// src/pages/Home.jsx
import Hero from '../sections/Hero';
import WhyUse from '../sections/WhyUse';
import HowItWorksSection from '../sections/HowItWorks';
import TrustSection from '../sections/TrustSection';
import CommonRoutes from '../sections/CommonRoutes';
import CTA from '../sections/CTA';

export default function Home() {
  return (
    <>
      <Hero />
      <WhyUse />
      <HowItWorksSection />
      <TrustSection />
      <CommonRoutes />
      <CTA />
    </>
  );
}