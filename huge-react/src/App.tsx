import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WeBelieve from './components/WeBelieve';
import Services from './components/Services';
import Work from './components/Work';
import IntelligentExperiences from './pages/IntelligentExperiences';
import LegalNotices from './pages/LegalNotices';
import News from './pages/News';
import Newsletter from './pages/Newsletter';
import WorkPage from './pages/WorkPage';
import Platform from './components/Platform';
import Partnerships from './components/Partnerships';
import Footer from './components/Footer';
import Loader from './components/Loader';
import Journey from './components/Journey';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Wrapper for scrolling content
const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Home Component
const Home = () => {
  return (
    <div className="font-monument antialiased selection:bg-huge-magenta selection:text-white">
      <Hero />
      {/* Main Content Scrolls Over Fixed Hero */}
      <main className="relative z-10 bg-huge-black min-h-screen">
        <WeBelieve />
        <Journey />
        <Services />
        <Platform />
        <Partnerships />
        <Work />
      </main>
    </div>
  );
}

function App() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Lenis Smooth Scroll
    let lenis: any = null;
    if ((window as any).Lenis) {
      lenis = new (window as any).Lenis();

      const raf = (time: number) => {
        lenis?.raf(time);
        requestAnimationFrame(raf);
      };

      requestAnimationFrame(raf);
    }

    if (loading) {
      document.body.style.position = 'fixed';
      document.body.style.top = '0';
      document.body.style.width = '100%';
      document.body.style.overflowY = 'scroll';
    } else {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
    }

    return () => {
      lenis?.destroy();
    };
  }, [loading]);

  return (
    <Router>
      <ScrollToTop />

      {/* Show Loader while loading */}
      {loading && <Loader onLoadingComplete={() => setLoading(false)} />}

      {/* Show main app content after loading */}
      {!loading && (
        <div className="bg-huge-black min-h-screen text-huge-white font-sans">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/intelligent-experiences" element={<IntelligentExperiences />} />
            <Route path="/legal-notices" element={<LegalNotices />} />
            <Route path="/news" element={<News />} />
            <Route path="/newsletter" element={<Newsletter />} />
            <Route path="/work" element={<WorkPage />} />
          </Routes>

          <Footer />
        </div>
      )}
    </Router>
  );
}

export default App;