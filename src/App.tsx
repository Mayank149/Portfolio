import { useEffect, useRef, useState } from 'react';
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { CosmicBackground, OrbitSlotScreenPos } from './components/CosmicBackground';
import { Navbar } from './components/Navbar';
import { CommandPalette } from './components/CommandPalette';
import { ProjectModal } from './components/ProjectModal';
import { ImageLightbox, ZoomedImage } from './components/ImageLightbox';
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { SkillsPage } from './pages/SkillsPage';
import { AboutPage } from './pages/AboutPage';
import { PublicationsPage } from './pages/PublicationsPage';
import { ContactPage } from './pages/ContactPage';
import { ProjectItem } from './data/portfolioData';

function AppShell() {
  const location = useLocation();
  const [warpCount, setWarpCount] = useState(0);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [zoomedImage, setZoomedImage] = useState<ZoomedImage | null>(null);
  const [toastMsg, setToastMsg] = useState('');

  const orbitSlotsRef = useRef<OrbitSlotScreenPos[]>([]);
  const orbitDragRef = useRef<number>(0);
  const [orbitPaused, setOrbitPaused] = useState(false);
  const [orbitHovered, setOrbitHovered] = useState(false);
  const [orbitStepDelta, setOrbitStepDelta] = useState(0);
  const [orbitCount, setOrbitCount] = useState(16);

  useEffect(() => {
    setWarpCount((c) => c + 1);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [location.pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCmdOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setCmdOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    window.setTimeout(() => setToastMsg(''), 2400);
  };

  return (
    <div className="app-root">
      <CosmicBackground
        warpTrigger={warpCount}
        pathname={location.pathname}
        orbitPaused={orbitPaused || orbitHovered}
        orbitStepDelta={orbitStepDelta}
        orbitDragRef={orbitDragRef}
        orbitCount={orbitCount}
        onOrbitFrame={(slots) => {
          orbitSlotsRef.current = slots;
        }}
      />
      <div className="sci-grid-overlay" aria-hidden="true" />
      <div className="hero-vignette" aria-hidden="true" />

      <Navbar onOpenCommand={() => setCmdOpen(true)} />

      <main className="main-stage">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage onSelectProject={setSelectedProject} />} />
            <Route
              path="/projects"
              element={
                <ProjectsPage
                  onSelectProject={setSelectedProject}
                  onZoomImage={setZoomedImage}
                  orbitSlotsRef={orbitSlotsRef}
                  orbitDragRef={orbitDragRef}
                  orbitPaused={orbitPaused}
                  onToggleOrbitPause={() => setOrbitPaused((v) => !v)}
                  onStepOrbit={(d) => setOrbitStepDelta((s) => s + d)}
                  onOrbitHover={setOrbitHovered}
                  onOrbitCountChange={setOrbitCount}
                />
              }
            />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/publications" element={<PublicationsPage />} />
            <Route path="/contact" element={<ContactPage onToast={showToast} />} />
          </Routes>
        </AnimatePresence>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <span>&copy; 2026 Mayank Bansal. Engineered with React, TypeScript &amp; Three.js.</span>
          <div className="footer-links">
            <a href="https://github.com/Mayank149" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/mayank-bansal14"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a href="downloads/resume.pdf" target="_blank" rel="noopener noreferrer">
              Resume
            </a>
          </div>
        </div>
      </footer>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onZoomImage={setZoomedImage}
      />
      <ImageLightbox image={zoomedImage} onClose={() => setZoomedImage(null)} />
      <CommandPalette
        open={cmdOpen}
        onClose={() => setCmdOpen(false)}
        onToast={showToast}
      />
      <div className={`toast ${toastMsg ? 'visible' : ''}`} role="status">
        {toastMsg}
      </div>
    </div>
  );
}

export function App() {
  return (
    <HashRouter>
      <AppShell />
    </HashRouter>
  );
}

export default App;
