import * as React from 'react';
import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet, useLocation, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Log React version
console.log('React version:', React.version);

// Check if framer-motion is recognized
console.log('Framer Motion:', motion);

// Lazy-loaded Pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Toolbox = lazy(() => import('./pages/Toolbox'));
const CaseStudies = lazy(() => import('./pages/CaseStudies'));
const DeepDive = lazy(() => import('./pages/DeepDive'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Gallery = lazy(() => import('./pages/gallery'));

// Lazy-loaded Live Apps Pages
const ClinicalCompass = lazy(() => import('./pages/apps/ClinicalCompass'));
const ROICalculator = lazy(() => import('./pages/apps/ROICalculator'));
const LicenseRequirements = lazy(() => import('./pages/apps/LicenseRequirements'));
const SmartPricing = lazy(() => import('./pages/apps/SmartPricing'));
const Resume = lazy(() => import('./pages/Resume'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Lazy-loaded MarTech Stack Pages
const MarTechStack = lazy(() => import('./pages/MarTechStack'));
const EnterpriseSecurity = lazy(() => import('./pages/martech/EnterpriseSecurity'));
const PerformanceOptimization = lazy(() => import('./pages/martech/PerformanceOptimization'));
const MarketingAnalytics = lazy(() => import('./pages/martech/MarketingAnalytics'));
const LeadConversion = lazy(() => import('./pages/martech/LeadConversion'));
const InteractiveMaps = lazy(() => import('./pages/martech/InteractiveMaps'));
const BackendReliability = lazy(() => import('./pages/martech/BackendReliability'));

// Lazy-loaded Platform Pages
const PlatformOverview = lazy(() => import('./pages/PlatformOverview'));
const PlatformDemo = lazy(() => import('./pages/PlatformDemo'));

// Layout
import Header from './components/layout/Header';
import Preloader from './components/ui/Preloader';
import Footer from './components/layout/Footer';
import RouteLoader from './components/ui/RouteLoader';

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_ID;

function useGA() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) return;

    if (!document.querySelector('script[data-gtag]')) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      script.dataset.gtag = 'true';
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = (...args: unknown[]) => {
        window.dataLayer?.push(args);
      };

      window.gtag('js', new Date());
      window.gtag('config', GA_MEASUREMENT_ID, { send_page_view: false });
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !GA_MEASUREMENT_ID || !window.gtag) return;

    window.gtag('config', GA_MEASUREMENT_ID, { page_path: pathname + search });
  }, [pathname, search]);
}

const AppLayout = () => {
  const location = useLocation();
  useGA();

  // Handle hash scrolling for anchor links
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.replace('#', ''));
      if (element) {
        // Small delay to ensure the page has rendered
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location]);

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
          <Suspense fallback={<RouteLoader />}>
            <Outlet />
          </Suspense>
        </motion.main>
      </AnimatePresence>
      <Footer />
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

// Extend window type for Google Analytics
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
