import { BrowserRouter, Routes, Route, Outlet, useLocation, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Import Pages
import Home from './pages/Home';
import About from './pages/About';
import Toolbox from './pages/Toolbox';
import CaseStudies from './pages/CaseStudies';
import DeepDive from './pages/DeepDive';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Gallery from './pages/gallery';

// Import Live Apps Pages
import ClinicalCompass from './pages/apps/ClinicalCompass';
import ROICalculator from './pages/apps/ROICalculator';
import LicenseRequirements from './pages/apps/LicenseRequirements';
import SmartPricing from './pages/apps/SmartPricing';
import Resume from './pages/Resume';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Import MarTech Stack Pages
import MarTechStack from './pages/MarTechStack';
import EnterpriseSecurity from './pages/martech/EnterpriseSecurity';
import PerformanceOptimization from './pages/martech/PerformanceOptimization';
import MarketingAnalytics from './pages/martech/MarketingAnalytics';
import LeadConversion from './pages/martech/LeadConversion';
import InteractiveMaps from './pages/martech/InteractiveMaps';
import BackendReliability from './pages/martech/BackendReliability';

// Import Platform Pages
import PlatformOverview from './pages/PlatformOverview';
import PlatformDemo from './pages/PlatformDemo';

// Import Layout
import Header from './components/layout/Header';
import Preloader from './components/ui/Preloader';
import Footer from './components/layout/Footer';
import HepAssistant from './components/ui/HepAssistant';

function useGA(){
  const { pathname, search } = useLocation();
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', 'G-XXXX', { page_path: pathname + search });
    }
  }, [pathname, search]);
}

const AppLayout = () => {
  const location = useLocation();
  useGA();
  return (
    <>
      <Preloader />
      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <HepAssistant />
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/toolbox" element={<Toolbox />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/deep/:slug" element={<DeepDive />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />

          {/* Live Apps Routes */}
          <Route path="/apps/clinical-compass" element={<ClinicalCompass />} />
          <Route path="/apps/roi" element={<ROICalculator />} />
          <Route path="/apps/license" element={<LicenseRequirements />} />
          <Route path="/apps/smart-pricing" element={<SmartPricing />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/cv" element={<Navigate to="/resume" replace />} />
          <Route path="/contact" element={<Contact />} />

          {/* MarTech Stack Routes */}
          <Route path="/martech" element={<MarTechStack />} />
          <Route path="/martech/enterprise-security" element={<EnterpriseSecurity />} />
          <Route path="/martech/performance-optimization" element={<PerformanceOptimization />} />
          <Route path="/martech/marketing-analytics" element={<MarketingAnalytics />} />
          <Route path="/martech/lead-conversion" element={<LeadConversion />} />
          <Route path="/martech/interactive-maps" element={<InteractiveMaps />} />
          <Route path="/martech/backend-reliability" element={<BackendReliability />} />

          {/* Platform Routes */}
          <Route path="/platform" element={<PlatformOverview />} />
          <Route path="/platform/demo" element={<PlatformDemo />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
