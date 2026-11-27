import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Brain, Code2, Github, Layers } from 'lucide-react';
import { CosmicTransition } from '../components/CosmicTransition';
import { ProjectItem, PROJECTS, STATS } from '../data/portfolioData';

interface HomePageProps {
  onSelectProject: (p: ProjectItem) => void;
}

const TYPING_PHRASES = [
  'LangGraph & Agentic AI',
  'Multi-Hop RAG Pipelines',
  'PyTorch & Computer Vision',
  'FastAPI & TypeScript',
];

export function HomePage({ onSelectProject }: HomePageProps) {
  const [typedText, setTypedText] = useState('');
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const flagship = PROJECTS[0];

  useEffect(() => {
    let phraseIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let timer = 0;

    const tick = () => {
      const current = TYPING_PHRASES[phraseIdx];
      if (!deleting) {
        charIdx++;
        setTypedText(current.slice(0, charIdx));
        if (charIdx === current.length) {
          deleting = true;
          timer = window.setTimeout(tick, 1700);
          return;
        }
        timer = window.setTimeout(tick, 55);
      } else {
        charIdx--;
        setTypedText(current.slice(0, charIdx));
        if (charIdx === 0) {
          deleting = false;
          phraseIdx = (phraseIdx + 1) % TYPING_PHRASES.length;
          timer = window.setTimeout(tick, 320);
          return;
        }
        timer = window.setTimeout(tick, 28);
      }
    };
    tick();
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 18;
      const y = (e.clientY / window.innerHeight - 0.5) * 14;
      setMouseOffset({ x, y });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <CosmicTransition>
      <section className="hero">
        {/* 3D Figure Merged Seamlessly Into Cosmic Background (Lower-Right) */}
        <div
          className="hero-bg-figure-layer"
          aria-hidden="true"
          style={{
            transform: `translate3d(${mouseOffset.x * -0.5}px, ${mouseOffset.y * -0.4}px, 0)`,
          }}
        >
          <img src="img/hero-3d-mayank.png" alt="Mayank Bansal" className="hero-bg-figure-img" />
        </div>

        <div className="container hero-grid-clean">
          {/* Left Column: Clean Role & Engineering Intro */}
          <div className="hero-content">
            <div className="hero-badge-row">
              <div className="role-pill-blue">
                <span className="blue-dot" />
                <span>Tech Intern @ Wissen Technology · Bangalore</span>
              </div>
            </div>

            <h1 className="hero-title">
              AI Engineer &amp;
              <br />
              <span className="gradient-text">Intelligent</span> System Builder<span className="accent-dot">.</span>
            </h1>

            <div className="hero-title-rule" aria-hidden="true" />

            <p className="hero-subtitle hero-subtitle-crisp">
              I like <span className="about-hl">building things</span>, figuring out how they work,
              and finding ways to make them better. These days, that usually involves{' '}
              <span className="about-hl">AI</span>, from <span className="about-hl">RAG pipelines</span>{' '}
              and <span className="about-hl">intelligent agents</span> to applications that solve
              actual problems.
            </p>

            <div className="hero-ctas">
              <Link to="/projects" className="btn-primary">
                <span>Explore My Work</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/about" className="btn-glass">
                <span>About Me</span>
              </Link>
            </div>

            <div className="hero-typing-inline">
              <span className="mono-prefix">&lt;/&gt;</span>
              <span className="typed-output">{typedText}</span>
              <span className="typed-cursor" aria-hidden="true" />
            </div>
          </div>

          {/* Open Center + Lower-Right Portrait Stage */}
          <div className="hero-center-spacer" aria-hidden="true" />

          {/* Right Top: Floating Currently Building HUD Card */}
          <div className="hero-right-minimal">
            <div className="hud-building-card rail-hud">
              <div className="hud-card-header">
                <span className="hud-icon">
                  <Code2 size={13} />
                </span>
                <span className="hud-label">Currently Building</span>
                <span className="pulse-dot small" />
              </div>
              <h3 className="hud-project-title">The Last Mile</h3>
              <p className="hud-project-desc">An AI Product Intelligence Tool</p>
              <div className="hud-progress-row">
                <div className="hud-progress-track">
                  <div className="hud-progress-fill" style={{ width: '72%' }} />
                </div>
                <span className="hud-progress-pct">72%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Frosted Stats Bar (Matching Reference Photo) */}
        <div className="container stats-strip-wrap">
          <div className="stats-open-bar">
            {STATS.map((s, idx) => {
              const Icon = idx === 0 ? Code2 : idx === 1 ? Layers : idx === 2 ? Brain : BookOpen;
              const isPink = idx % 2 === 0;
              return (
                <div className="stat-open-item" key={s.label}>
                  <span className={`stat-inline-icon ${isPink ? 'pink' : 'blue'}`}>
                    <Icon size={20} />
                  </span>
                  <div className="stat-meta">
                    <span className="stat-value">
                      {s.decimals ? s.value.toFixed(s.decimals) : s.value}
                      {s.suffix ?? ''}
                    </span>
                    <span className="stat-label">{s.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Editorial Overview (Less Boxy, Inviting & Scannable) */}
      <section className="section overview-section">
        <div className="container">
          <div className="overview-split">
            {/* Left: Flagship Work Spotlight */}
            <div className="overview-spotlight">
              <div className="section-kicker">
                <span className="kicker-bar" />
                <span>FEATURED WORK</span>
              </div>
              <h2 className="overview-heading">{flagship.title}</h2>
              <p className="overview-text">{flagship.summary}</p>
              <div className="overview-metrics">
                <span>90% Recall@4</span>
                <span>·</span>
                <span>0.83 MRR@4</span>
                <span>·</span>
                <span>0.81s P50</span>
              </div>
              <div className="overview-actions">
                <button
                  type="button"
                  className="btn-glass"
                  onClick={() => onSelectProject(flagship)}
                >
                  Inspect Architecture
                </button>
                {flagship.github && (
                  <a
                    href={flagship.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link-pill github"
                  >
                    <Github size={14} />
                    <span>GitHub</span>
                  </a>
                )}
                <Link to="/projects" className="overview-text-link">
                  View all 16 projects <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Right: Clean Editorial Directory (Zero Boxes) */}
            <div className="overview-directory">
              <Link to="/about" className="directory-row">
                <div>
                  <span className="dir-kicker">EXPERIENCE &amp; EDUCATION</span>
                  <h3>Tech Intern at Wissen Technology</h3>
                  <p>Bangalore (Onsite) · BTech CSE @ LPU (9.41 CGPA)</p>
                </div>
                <ArrowRight size={17} className="dir-arrow" />
              </Link>

              <Link to="/skills" className="directory-row">
                <div>
                  <span className="dir-kicker">NEURAL STACK</span>
                  <h3>RAG, Agentic AI &amp; Deep Learning</h3>
                  <p>LangGraph, PyTorch, TensorFlow, FastAPI, Docker</p>
                </div>
                <ArrowRight size={17} className="dir-arrow" />
              </Link>

              <Link to="/publications" className="directory-row">
                <div>
                  <span className="dir-kicker">PUBLISHED AUTHOR</span>
                  <h3>Machine Learning Projects (Kindle)</h3>
                  <p>Practical guide for B.Tech CSE students + Medium &amp; preprints</p>
                </div>
                <ArrowRight size={17} className="dir-arrow" />
              </Link>

              <Link to="/contact" className="directory-row">
                <div>
                  <span className="dir-kicker">CONNECT</span>
                  <h3>Let&apos;s Build Something Together</h3>
                  <p>Reach out directly via email or LinkedIn</p>
                </div>
                <ArrowRight size={17} className="dir-arrow" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </CosmicTransition>
  );
}
