import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import WhyUse from './sections/WhyUse';
import HowItWorks from './sections/HowItWorks';
import TrustSection from './sections/TrustSection';
import CommonRoutes from './sections/CommonRoutes';
import CTA from './sections/CTA';

function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <Hero />
      <WhyUse />
      <HowItWorks />
      <TrustSection />
      <CommonRoutes />
      <CTA />
    </div>
  );
}

export default App;