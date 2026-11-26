import { useState } from 'react';
import { Expand, ExternalLink, Github, Search } from 'lucide-react';
import { CosmicTransition } from '../components/CosmicTransition';
import { PROJECTS, ProjectItem } from '../data/portfolioData';

interface ProjectsPageProps {
  onSelectProject: (p: ProjectItem) => void;
}

const FILTERS: { id: 'all' | 'rag' | 'cv' | 'nlp'; label: string }[] = [
  { id: 'all', label: 'All Systems (16)' },
  { id: 'rag', label: 'RAG & Agents' },
  { id: 'cv', label: 'Computer Vision' },
  { id: 'nlp', label: 'NLP & ML' },
];

export function ProjectsPage({ onSelectProject }: ProjectsPageProps) {
  const [filter, setFilter] = useState<'all' | 'rag' | 'cv' | 'nlp'>('all');
  const [query, setQuery] = useState('');

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

          <div className="projects-grid">
            {filtered.map((p) => (
              <article className="project-card" key={p.id}>
                <div className="project-visual">
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
                        <a href={p.live} target="_blank" rel="noopener noreferrer" aria-label="Live">
                          <ExternalLink size={15} />
                        </a>
                      )}
                      {p.github && (
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="GitHub"
                        >
                          <Github size={15} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </CosmicTransition>
  );
}
