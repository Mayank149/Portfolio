import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  Brain,
  Code2,
  Cpu,
  Github,
  Layers,
  Mail,
  Server,
  Sparkles,
  Terminal,
  Zap,
} from 'lucide-react';
import { CosmicTransition } from '../components/CosmicTransition';
import { ProjectItem, PROJECTS, STATS } from '../data/portfolioData';

interface HomePageProps {
  onSelectProject: (p: ProjectItem) => void;
}

const TYPING_PHRASES = [
  'LangGraph & Agentic AI',
  'Multi-Hop RAG Pipelines',
  'PyTorch & Computer Vision',
  'FastAPI & Docker Systems',
];

const CAPABILITY_PORTALS = [
  {
    title: 'RAG & Agentic AI',
    sub: 'LangGraph · FAISS · ChromaDB',
    icon: Brain,
    to: '/projects',
  },
  {
    title: 'Machine Learning & CV',
    sub: 'PyTorch · TensorFlow · CNNs',
    icon: Cpu,
    to: '/skills',
  },
  {
    title: 'Full-Stack AI APIs',
    sub: 'FastAPI · Flask · React · TS',
    icon: Code2,
    to: '/projects',
  },
  {
    title: 'MLOps & Deployment',
    sub: 'Docker · MLFlow · Cloud',
    icon: Server,
    to: '/skills',
  },
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
        {/* 3D Figure Merged Seamlessly Into Cosmic Background */}
        <div
          className="hero-bg-figure-layer"
          aria-hidden="true"
          style={{
            transform: `translate3d(calc(-50% + ${mouseOffset.x * -0.5}px), ${mouseOffset.y * -0.4}px, 0)`,
          }}
        >
          <img
            src="/img/hero-3d-mayank.jpg"
            alt=""
            className="hero-bg-figure-img"
          />
          <div className="hero-bg-figure-fade" />
        </div>

        <div className="container hero-grid-merged">
          {/* Left Column: Core Headline & CTAs */}
          <div className="hero-content">
            <div className="hero-badge-row">
              <div className="hero-badge">
                <span className="pulse-dot" />
                <span>AI / ML · SDE · BUILDER</span>
              </div>
              <div className="role-pill-blue">
                <span className="blue-dot" />
                <span>Tech Intern @ Wissen Technology · Bangalore (Onsite)</span>
              </div>
            </div>

            <h1 className="hero-title">
              Building
              <br />
              <span className="gradient-text">AI-Powered</span>
              <br />
              Solutions
            </h1>

            <p className="hero-subtitle">
              Computer Science student, AI Engineer and SDE &mdash; turning ideas into real, usable
              products with AI, code and design.
            </p>

            <div className="hero-ctas">
              <Link to="/projects" className="btn-primary">
                <span>Explore Projects</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/about" className="btn-glass">
                <span>About Me</span>
              </Link>
            </div>

            <div className="hero-typing-bar">
              <span className="mono-prefix">&gt;_ active_stack:</span>
              <span className="typed-output">{typedText}</span>
              <span className="typed-cursor" aria-hidden="true" />
            </div>
          </div>

          {/* Center Spacer: Open Breathing Room for Background 3D Figure & Planet */}
          <div className="hero-center-spacer" aria-hidden="true" />

          {/* Right Column: Floating Telemetry & Domain Portals */}
          <div className="hero-right-rail">
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

            <div className="capability-rail">
              {CAPABILITY_PORTALS.map((item) => {
                const Icon = item.icon;
                return (
                  <Link to={item.to} key={item.title} className="capability-card">
                    <span className="cap-icon">
                      <Icon size={16} />
                    </span>
                    <div className="cap-text">
                      <strong>{item.title}</strong>
                      <span>{item.sub}</span>
                    </div>
                    <ArrowRight size={14} className="cap-arrow" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Telemetry Stats Strip */}
        <div className="container stats-strip-wrap">
          <div className="stats-strip">
            {STATS.map((s, idx) => {
              const Icon = idx === 0 ? Code2 : idx === 1 ? Layers : idx === 2 ? Cpu : Zap;
              return (
                <div className="stat-item" key={s.label}>
                  <div className="stat-icon">
                    <Icon size={17} />
                  </div>
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

      {/* Cosmic Overview Bento (Instead of duplicating the Projects page) */}
      <section className="section">
        <div className="container">
          <div className="section-header-row">
            <div>
              <div className="section-kicker">
                <span className="kicker-bar" />
                <span>MISSION CONTROL</span>
              </div>
              <h2 className="section-title">
                Explore the <span className="gradient-text">Ecosystem</span>
              </h2>
            </div>
            <p className="section-lead">
              A quick launchpad into my flagship AI engineering, published book, neural stack, and
              credentials.
            </p>
          </div>

          <div className="home-bento-grid">
            {/* 1. Flagship Project Spotlight */}
            <div className="bento-card bento-wide">
              <div className="bento-top">
                <span className="bento-kicker">
                  <Sparkles size={13} /> FLAGSHIP BUILD
                </span>
                <Link to="/projects" className="bento-link">
                  All 16 Projects <ArrowRight size={13} />
                </Link>
              </div>
              <div className="bento-flagship-body">
                <img src={flagship.img} alt={flagship.title} className="bento-thumb" />
                <div>
                  <h3>{flagship.title}</h3>
                  <p>{flagship.summary}</p>
                  <div className="project-tags" style={{ margin: '12px 0' }}>
                    <span>90% Recall@4</span>
                    <span>0.83 MRR@4</span>
                    <span>0.81s P50</span>
                    <span>LangGraph</span>
                  </div>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      className="btn-glass"
                      style={{ padding: '8px 16px', fontSize: '0.84rem' }}
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
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Published Book */}
            <div className="bento-card">
              <div className="bento-top">
                <span className="bento-kicker">
                  <BookOpen size={13} /> PUBLISHED AUTHOR
                </span>
                <Link to="/publications" className="bento-link">
                  Publications <ArrowRight size={13} />
                </Link>
              </div>
              <div className="bento-book-row">
                <img
                  src="/img/blog/Book cover front.webp"
                  alt="ML Projects Book"
                  className="bento-book-cover"
                />
                <div>
                  <h4>Machine Learning Projects</h4>
                  <p>A Practical Guide for B.Tech CSE Students — available on Amazon Kindle.</p>
                </div>
              </div>
            </div>

            {/* 3. Neural Stack & Credentials */}
            <div className="bento-card">
              <div className="bento-top">
                <span className="bento-kicker">
                  <Terminal size={13} /> STACK &amp; CREDENTIALS
                </span>
                <Link to="/skills" className="bento-link">
                  Full Stack <ArrowRight size={13} />
                </Link>
              </div>
              <h4>Core Engineering Matrix</h4>
              <p>
                BTech CSE @ LPU (9.41 CGPA) with 9 verified credentials across AI, ML, and Cloud.
              </p>
              <div className="project-tags" style={{ marginTop: 12 }}>
                <span>Python</span>
                <span>PyTorch</span>
                <span>LangChain</span>
                <span>FastAPI</span>
                <span>Docker</span>
              </div>
            </div>

            {/* 4. Current Role & Uplink */}
            <div className="bento-card bento-accent">
              <div className="bento-top">
                <span className="bento-kicker">
                  <Mail size={13} /> CURRENT ROLE
                </span>
                <span className="blue-dot" />
              </div>
              <h4>Tech Intern · Wissen Technology</h4>
              <p>
                Bangalore (Onsite) &mdash; engineering production software &amp; AI systems. Open to
                high-impact collaborations.
              </p>
              <Link to="/contact" className="btn-primary" style={{ marginTop: 14 }}>
                <span>Establish Uplink</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </CosmicTransition>
  );
}
