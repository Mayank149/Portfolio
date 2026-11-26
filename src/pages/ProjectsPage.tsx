import { useState } from 'react';
import { Expand, ExternalLink, Github, LayoutGrid, Orbit, Search } from 'lucide-react';
import { CosmicTransition } from '../components/CosmicTransition';
import { OrbitalProjects } from '../components/OrbitalProjects';
import { ZoomedImage } from '../components/ImageLightbox';
import { OrbitSlotScreenPos } from '../components/CosmicBackground';
import { PROJECTS, ProjectItem } from '../data/portfolioData';

interface ProjectsPageProps {
  onSelectProject: (p: ProjectItem) => void;
  onZoomImage: (img: ZoomedImage) => void;
  orbitSlotsRef: React.MutableRefObject<OrbitSlotScreenPos[]>;
  orbitPaused: boolean;
  onToggleOrbitPause: () => void;
  onStepOrbit: (delta: number) => void;
  onOrbitHover: (hovered: boolean) => void;
}

const FILTERS: { id: 'all' | 'rag' | 'cv' | 'nlp'; label: string }[] = [
  { id: 'all', label: 'All Systems (16)' },
  { id: 'rag', label: 'RAG & Agents' },
  { id: 'cv', label: 'Computer Vision' },
  { id: 'nlp', label: 'NLP & ML' },
];

export function ProjectsPage({
  onSelectProject,
  onZoomImage,
  orbitSlotsRef,
  orbitPaused,
  onToggleOrbitPause,
  onStepOrbit,
  onOrbitHover,
}: ProjectsPageProps) {
  const [filter, setFilter] = useState<'all' | 'rag' | 'cv' | 'nlp'>('all');
  const [query, setQuery] = useState('');
  const [viewMode, setViewMode] = useState<'orbit' | 'grid'>('orbit');

  const filtered = PROJECTS.filter((p) => {
    const matchesCat = filter === 'all' || p.category === filter;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.summary.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q));
    return matchesCat && matchesQuery;
  });

  return (
    <CosmicTransition>
      <section className="section page-top-pad">
        <div className="container">
          <div className="section-header-row">
            <div>
              <div className="section-kicker">
                <span className="kicker-bar" />
                <span>PROJECT LAB</span>
              </div>
              <h1 className="section-title">
                Engineered <span className="gradient-text">AI Systems</span>
              </h1>
            </div>

            <div className="projects-toolbar-right">
              <div className="view-mode-toggle" role="group" aria-label="View mode">
                <button
                  type="button"
                  className={`view-toggle-btn ${viewMode === 'orbit' ? 'active' : ''}`}
                  onClick={() => setViewMode('orbit')}
                >
                  <Orbit size={15} />
                  <span>Orbital Ring</span>
                </button>
                <button
                  type="button"
                  className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <LayoutGrid size={15} />
                  <span>Grid View</span>
                </button>
              </div>

              <div className="search-box">
                <Search size={15} />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search stack or project..."
                />
              </div>
            </div>
          </div>

          <div className="project-filter-bar" style={{ marginBottom: 28 }}>
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`filter-pill ${filter === f.id ? 'active' : ''}`}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>

          {viewMode === 'orbit' ? (
            <div className="orbital-page-spacer">
              <OrbitalProjects
                projects={filtered.slice(0, 8)}
                slotsRef={orbitSlotsRef}
                paused={orbitPaused}
                onTogglePause={onToggleOrbitPause}
                onStepOrbit={onStepOrbit}
                onHoverChange={onOrbitHover}
                onSelectProject={onSelectProject}
                onZoomImage={onZoomImage}
              />
            </div>
          ) : (
            <div className="projects-grid">
              {filtered.map((p) => (
                <article className="project-card" key={p.id}>
                  <div
                    className="project-visual clickable-visual"
                    onClick={() => onZoomImage({ src: p.img, alt: p.title })}
                    title="Click to zoom image"
                  >
                    <img src={p.img} alt={p.title} loading="lazy" />
                    {p.chips && (
                      <div className="visual-hud-overlay">
                        {p.chips.map((c) => (
                          <span className="hud-chip" key={c}>
                            {c}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="project-body">
                    <div className="project-top-row">
                      <h3>{p.title}</h3>
                      <span className={`project-badge ${p.isLive ? 'live' : ''}`}>{p.badge}</span>
                    </div>
                    <p className="project-summary">{p.summary}</p>
                    <div className="project-tags">
                      {p.tags.slice(0, 4).map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                    <div className="project-footer">
                      <button
                        type="button"
                        className="inspect-btn"
                        onClick={() => onSelectProject(p)}
                      >
                        <span>Inspect Specs</span>
                        <Expand size={13} />
                      </button>
                      <div className="project-ext-links">
                        {p.live && (
                          <a
                            href={p.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-link-pill live"
                            aria-label={`${p.title} Live Demo`}
                          >
                            <ExternalLink size={13} />
                            <span>Live</span>
                          </a>
                        )}
                        {p.github && (
                          <a
                            href={p.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-link-pill github"
                            aria-label={`${p.title} GitHub`}
                          >
                            <Github size={14} />
                            <span>GitHub</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </CosmicTransition>
  );
}
