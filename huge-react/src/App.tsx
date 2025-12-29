import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
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
import Loader from './components/Loader';

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
    if (loading) {
      // Lock scroll but keep scrollbar visible
      document.body.style.position = 'fixed';
      document.body.style.top = '0';
      document.body.style.width = '100%';
      document.body.style.overflowY = 'scroll';
    } else {
      // Restore scroll
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
    }
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

          <footer className="bg-huge-black text-huge-white py-20 px-6 md:px-10 border-t border-gray-800 relative z-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
              <div className="text-[15vw] font-bold leading-none tracking-tighter text-huge-magenta font-monument">Huge</div>
              <div className="flex flex-wrap gap-8 mt-10 md:mb-4 text-xl font-medium">
                <a href="#" className="hover:text-huge-magenta transition-colors">Linkedin</a>
                <a href="#" className="hover:text-huge-magenta transition-colors">Instagram</a>
                <a href="#" className="hover:text-huge-magenta transition-colors">Twitter</a>
              </div>
            </div>
            <div className="mt-20 flex justify-between text-sm text-huge-grayText flex-wrap gap-4">
              <span>© 2024 Huge</span>
              <div className="flex gap-6">
                <Link to="/legal-notices" className="hover:text-white">Legal Notices</Link>
                <Link to="/newsletter" className="hover:text-white">Newsletter</Link>
                <span>Privacy Policy</span>
              </div>
            </div>
          </footer>
        </div>
      )}
    </Router>
  );
}

export default App;