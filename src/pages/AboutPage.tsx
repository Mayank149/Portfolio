import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Award, ChevronLeft, ChevronRight, Code2, Download, Eye, Github, GraduationCap, Linkedin, Terminal, X } from 'lucide-react';
import { CosmicTransition } from '../components/CosmicTransition';
import { CERTIFICATES } from '../data/portfolioData';

export function AboutPage() {
  const [certIdx, setCertIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const stepCert = (delta: number) => {
    setCertIdx((prev) => (prev + delta + CERTIFICATES.length) % CERTIFICATES.length);
  };

  useEffect(() => {
    if (!lightboxOpen) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      else if (e.key === 'ArrowLeft') stepCert(-1);
      else if (e.key === 'ArrowRight') stepCert(1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [lightboxOpen]);

  return (
    <CosmicTransition>
      <section className="section page-top-pad">
        <div className="container">
          <div className="about-grid">
            <div className="about-portrait-card">
              <div className="portrait-hud-frame">
                <img src="img/profile.jpeg" alt="Mayank Bansal" />
              </div>
              <div className="education-badge-card" style={{ marginBottom: 12 }}>
                <div className="edu-icon wissen-logo-box" aria-hidden="true">
                  <svg viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="18">
                    <path
                      d="M2.5 3.5L8.2 20.5L13.5 7.5L18.8 20.5L24.5 3.5"
                      stroke="url(#wissenGrad)"
                      strokeWidth="3.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="28.5" cy="18.5" r="2.2" fill="#38bdf8" />
                    <defs>
                      <linearGradient id="wissenGrad" x1="2.5" y1="3.5" x2="24.5" y2="20.5" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#f8fafc" />
                        <stop offset="1" stopColor="#38bdf8" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div>
                  <h4>Tech Intern &mdash; Wissen Technology</h4>
                  <p>Bangalore · Onsite</p>
                  <span className="cgpa-pill blue-pill">
                    <span className="blue-dot" /> Current Role
                  </span>
                </div>
              </div>
              <div className="education-badge-card">
                <div className="edu-icon">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <h4>BTech in Computer Science &amp; Engineering</h4>
                  <p>Lovely Professional University &mdash; 3rd Year</p>
                  <span className="cgpa-pill">
                    <Award size={13} /> CGPA: 9.41 / 10
                  </span>
                </div>
              </div>
            </div>

            <div className="about-details">
              <div className="section-kicker">
                <span className="kicker-bar" />
                <span>ABOUT ME</span>
              </div>
              <h1 className="section-title">
                Engineering <span className="gradient-text">Intelligent Systems</span>
              </h1>
              <p className="about-paragraph">
                I'm an AI/ML engineer in training and a 3rd-year BTech CSE student focused on
                building and shipping intelligent systems &mdash; not just experimenting with models.
              </p>
              <p className="about-paragraph">
                My work spans RAG, Agentic AI, Deep Learning, and NLP, with hands-on experience
                building retrieval pipelines, LLM-powered applications, computer vision systems, and
                containerized APIs. I learn by building, validate through benchmarks, and push
                prototypes toward reliable products.
              </p>

              <div className="about-actions">
                <a href="downloads/resume.pdf" className="btn-primary" download>
                  <Download size={16} />
                  <span>Download CV</span>
                </a>
                <a
                  href="downloads/resume.pdf"
                  className="btn-glass"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Eye size={16} />
                  <span>View CV</span>
                </a>
              </div>

              <div className="social-pill-row">
                <a
                  href="https://github.com/Mayank149"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-pill"
                >
                  <Github size={14} /> GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/mayank-bansal14"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-pill"
                >
                  <Linkedin size={14} /> LinkedIn
                </a>
                <a
                  href="https://leetcode.com/u/Mayankbansal1234/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-pill"
                >
                  <Code2 size={14} /> LeetCode
                </a>
                <a
                  href="https://www.geeksforgeeks.org/user/bansalmaywdpv/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-pill"
                >
                  <Terminal size={14} /> GeeksforGeeks
                </a>
              </div>
            </div>
          </div>

          {/* Verified Certificates */}
          <div style={{ marginTop: 80 }}>
            <div className="section-header-row">
              <div>
                <div className="section-kicker">
                  <span className="kicker-bar" />
                  <span>CREDENTIALS</span>
                </div>
                <h2 className="section-title">
                  Verified <span className="gradient-text">Certificates</span>
                </h2>
              </div>
              <div className="cert-controls">
                <span className="cert-counter">
                  {String(certIdx + 1).padStart(2, '0')} / 09
                </span>
                <button
                  type="button"
                  className="cert-nav-btn"
                  onClick={() => stepCert(-1)}
                  aria-label="Previous Certificate"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  className="cert-nav-btn"
                  onClick={() => stepCert(1)}
                  aria-label="Next Certificate"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            <div className="cert-stage" onClick={() => setLightboxOpen(true)}>
              <img src={CERTIFICATES[certIdx]} alt={`Verified Certificate ${certIdx + 1}`} />
              <span className="cert-zoom-hint">Click to Inspect</span>
            </div>
          </div>
        </div>
      </section>

      {lightboxOpen &&
        createPortal(
          <div className="scifi-modal" role="dialog" aria-modal="true" aria-label="Certificate Lightbox">
            <div className="modal-backdrop" onClick={() => setLightboxOpen(false)} />
            <div className="cert-lightbox-panel">
              <button
                type="button"
                className="modal-close"
                onClick={() => setLightboxOpen(false)}
                aria-label="Close"
              >
                <X size={18} />
              </button>
              <button
                type="button"
                className="lightbox-arrow prev"
                onClick={() => stepCert(-1)}
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </button>
              <img src={CERTIFICATES[certIdx]} alt={`Certificate ${certIdx + 1}`} />
              <button
                type="button"
                className="lightbox-arrow next"
                onClick={() => stepCert(1)}
                aria-label="Next"
              >
                <ChevronRight size={18} />
              </button>
              <div className="lightbox-caption">
                Certificate {certIdx + 1} of {CERTIFICATES.length}
              </div>
            </div>
          </div>,
          document.body
        )}
    </CosmicTransition>
  );
}
