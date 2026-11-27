import { useEffect, useMemo, useRef, useState } from 'react';
import { Brain, Code2, Cpu, LayoutGrid, Orbit, Pause, Play, Server } from 'lucide-react';
import { CosmicTransition } from '../components/CosmicTransition';
import { SKILL_GROUPS } from '../data/portfolioData';

interface SkillBeltNode {
  key: string;
  name: string;
  groupId: string;
  lane: number; // 0..3, one ring per category
  baseProgress: number;
  speed: number;
  radialJitter: number;
  shapeIdx: number;
}

const ASTEROID_SHAPES = [
  'polygon(8% 12%, 52% 0%, 94% 14%, 100% 56%, 84% 96%, 34% 100%, 4% 78%, 0% 38%)',
  'polygon(14% 4%, 66% 0%, 96% 24%, 92% 76%, 62% 100%, 16% 92%, 0% 58%, 4% 22%)',
  'polygon(4% 22%, 44% 0%, 88% 8%, 100% 48%, 88% 92%, 42% 100%, 8% 84%, 0% 48%)',
];

export function SkillsPage() {
  const [activeGroup, setActiveGroup] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'belt' | 'grid'>('belt');
  const [paused, setPaused] = useState(false);
  const [hoveredName, setHoveredName] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  const stageRef = useRef<HTMLDivElement | null>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    pausedRef.current = paused || hoveredName !== null;
  }, [paused, hoveredName]);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const totalUniqueSkills = useMemo(
    () => SKILL_GROUPS.reduce((acc, g) => acc + g.skills.length, 0),
    []
  );

  // 4 dedicated rings (one per category), tiled twice around the 360-deg loop so every visible arc is full & dense
  const nodes: SkillBeltNode[] = useMemo(() => {
    const list: SkillBeltNode[] = [];
    const speeds = [0.024, 0.019, 0.015, 0.012];

    SKILL_GROUPS.forEach((group, lane) => {
      const doubled = [...group.skills, ...group.skills];
      doubled.forEach((skill, idx) => {
        list.push({
          key: `${group.id}-${idx}-${skill}`,
          name: skill,
          groupId: group.id,
          lane,
          baseProgress: idx / doubled.length + lane * 0.06,
          speed: speeds[lane] ?? 0.016,
          radialJitter: ((idx % 3) - 1) * 10,
          shapeIdx: (idx + lane) % ASTEROID_SHAPES.length,
        });
      });
    });

    return list;
  }, []);

  useEffect(() => {
    if (viewMode !== 'belt') return;
    let rafId = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!pausedRef.current) {
        progressRef.current += dt;
      }

      const stageH = stageRef.current?.clientHeight || (isMobile ? 420 : 580);
      const rxList = isMobile ? [185, 280, 375, 470] : [360, 580, 800, 1020];
      const ryList = isMobile ? [130, 200, 270, 340] : [185, 300, 415, 530];

      for (let i = 0; i < nodes.length; i++) {
        const el = nodeRefs.current[i];
        if (!el) continue;
        const n = nodes[i];
        const jitter = isMobile ? n.radialJitter * 0.35 : n.radialJitter * 0.6;
        const rx = rxList[n.lane] + jitter;
        const ry = ryList[n.lane] + jitter * 0.55;

        const theta = ((n.baseProgress + progressRef.current * n.speed) % 1) * Math.PI * 2;
        const x = Math.cos(theta) * rx;
        const y = stageH - Math.sin(theta) * ry;

        const inVisibleArc = theta >= 0.02 && theta <= Math.PI * 0.53;
        let arcAlpha = 0;
        if (inVisibleArc) {
          const edgeFade = Math.min(
            (theta - 0.02) / 0.12,
            (Math.PI * 0.53 - theta) / 0.12,
            1
          );
          arcAlpha = Math.max(0, edgeFade);
        }

        const isDimmed = activeGroup !== 'all' && n.groupId !== activeGroup;
        const opacity = inVisibleArc ? arcAlpha * (isDimmed ? 0.14 : 1) : 0;

        el.style.transform = `translate3d(calc(${x}px - 50%), calc(${y}px - 50%), 0)`;
        el.style.opacity = String(opacity);
        el.style.pointerEvents = opacity > 0.15 ? 'auto' : 'none';
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [nodes, activeGroup, viewMode, isMobile]);

  const getIcon = (icon: 'brain' | 'cpu' | 'code' | 'server') => {
    if (icon === 'brain') return <Brain size={20} />;
    if (icon === 'cpu') return <Cpu size={20} />;
    if (icon === 'code') return <Code2 size={20} />;
    return <Server size={20} />;
  };

  return (
    <CosmicTransition>
      <section className="section page-top-pad skills-page-compact">
        <div className="container">
          <div className="section-header-row" style={{ marginBottom: 16 }}>
            <div>
              <div className="section-kicker">
                <span className="kicker-bar" />
                <span>NEURAL STACK</span>
              </div>
              <h1 className="section-title">
                Technologies <span className="gradient-text">I Work With</span>
              </h1>
            </div>

            <div className="skills-header-controls">
              {viewMode === 'belt' && (
                <button
                  type="button"
                  className="cert-nav-btn"
                  onClick={() => setPaused((v) => !v)}
                  aria-label={paused ? 'Resume' : 'Pause'}
                  title={paused ? 'Resume' : 'Pause'}
                >
                  {paused ? <Play size={14} /> : <Pause size={14} />}
                </button>
              )}
              <div className="view-mode-toggle" role="group" aria-label="Skills view mode">
                <button
                  type="button"
                  className={`view-toggle-btn ${viewMode === 'belt' ? 'active' : ''}`}
                  onClick={() => setViewMode('belt')}
                >
                  <Orbit size={15} />
                  <span>Cosmic</span>
                </button>
                <button
                  type="button"
                  className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <LayoutGrid size={15} />
                  <span>Grid</span>
                </button>
              </div>
            </div>
          </div>

          {/* Cluster Filter Pills */}
          <div className="project-filter-bar" style={{ marginBottom: 8 }}>
            <button
              type="button"
              className={`filter-pill ${activeGroup === 'all' ? 'active' : ''}`}
              onClick={() => setActiveGroup('all')}
            >
              All Skills ({totalUniqueSkills})
            </button>
            {SKILL_GROUPS.map((g) => (
              <button
                key={g.id}
                type="button"
                className={`filter-pill ${activeGroup === g.id ? 'active' : ''}`}
                onClick={() => setActiveGroup(g.id)}
              >
                {g.title}
              </button>
            ))}
          </div>
        </div>

        {viewMode === 'belt' ? (
          <div className="arc-belt-stage full-bleed-belt four-ring-belt" ref={stageRef}>
            {/* 4 Dedicated Category Rings */}
            <div className="arc-track visible-belt ring-cat-0" aria-hidden="true" />
            <div className="arc-track visible-belt ring-cat-1" aria-hidden="true" />
            <div className="arc-track visible-belt ring-cat-2" aria-hidden="true" />
            <div className="arc-track visible-belt ring-cat-3" aria-hidden="true" />

            {nodes.map((n, idx) => (
              <div
                key={n.key}
                ref={(el) => {
                  nodeRefs.current[idx] = el;
                }}
                className={`skill-asteroid full-asteroid arc-pill group-${n.groupId} ${
                  hoveredName === n.name ? 'is-active' : ''
                }`}
                style={{ clipPath: ASTEROID_SHAPES[n.shapeIdx] }}
                onMouseEnter={() => setHoveredName(n.name)}
                onMouseLeave={() => setHoveredName(null)}
              >
                <span>{n.name}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="container">
            <div className="skills-bento">
              {SKILL_GROUPS.filter((g) => activeGroup === 'all' || g.id === activeGroup).map(
                (g) => (
                  <div className="skill-panel" key={g.id}>
                    <div className="skill-panel-head">
                      <span className="skill-panel-icon">{getIcon(g.icon)}</span>
                      <div>
                        <h3>{g.title}</h3>
                        <p>{g.subtitle}</p>
                      </div>
                    </div>
                    <div className="skill-chips">
                      {g.skills.map((s) => (
                        <span key={s}>{s}</span>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </section>
    </CosmicTransition>
  );
}
