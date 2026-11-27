import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, Expand, Github, Pause, Play } from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';
import { ZoomedImage } from './ImageLightbox';
import { OrbitSlotScreenPos } from './CosmicBackground';

interface OrbitalProjectsProps {
  projects: ProjectItem[];
  slotsRef: React.MutableRefObject<OrbitSlotScreenPos[]>;
  dragRef: React.MutableRefObject<number>;
  paused: boolean;
  onTogglePause: () => void;
  onStepOrbit: (delta: number) => void;
  onHoverChange: (hovered: boolean) => void;
  onSelectProject: (p: ProjectItem) => void;
  onZoomImage: (img: ZoomedImage) => void;
}

export function OrbitalProjects({
  projects,
  slotsRef,
  dragRef,
  paused,
  onTogglePause,
  onStepOrbit,
  onHoverChange,
  onSelectProject,
  onZoomImage,
}: OrbitalProjectsProps) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const draggingRef = useRef(false);
  const movedRef = useRef(false);
  const lastXRef = useRef(0);

  // Apply 3D-projected ring coordinates directly to card DOM nodes at 60fps
  useEffect(() => {
    let rafId = 0;
    const sync = () => {
      const slots = slotsRef.current;
      for (let i = 0; i < projects.length; i++) {
        const el = cardRefs.current[i];
        const slot = slots[i];
        if (!el || !slot) continue;

        const norm = (slot.depth + 1) / 2;
        const scale = 0.44 + norm * 0.52;
        const opacity = slot.occluded
          ? 0.06
          : slot.depth < -0.2
          ? 0.18 + norm * 0.3
          : 0.35 + norm * 0.65;
        const zIndex = slot.depth < 0 ? 1 : Math.round(norm * 40) + 10;

        el.style.transform = `translate3d(calc(${slot.x}px - 50%), calc(${slot.y}px - 50%), 0) scale(${scale})`;
        el.style.opacity = String(opacity);
        el.style.zIndex = String(zIndex);
        el.style.pointerEvents = slot.occluded ? 'none' : 'auto';
        el.classList.toggle('is-front', slot.depth > 0.65);
      }
      rafId = requestAnimationFrame(sync);
    };
    rafId = requestAnimationFrame(sync);
    return () => cancelAnimationFrame(rafId);
  }, [projects.length, slotsRef]);

  // Global window pointer listeners so dragging works smoothly even if cursor leaves card
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      const dx = e.clientX - lastXRef.current;
      if (Math.abs(dx) > 3) movedRef.current = true;
      lastXRef.current = e.clientX;
      dragRef.current -= dx * 0.0065;
    };

    const onUp = () => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      onHoverChange(false);
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, [dragRef, onHoverChange]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button, a')) return;
    draggingRef.current = true;
    movedRef.current = false;
    lastXRef.current = e.clientX;
    onHoverChange(true);
  };

  return createPortal(
    <>
      {/* Pass-through full-viewport layer; only individual project cards capture pointer events */}
      <div className="orbital-viewport-layer">
        {projects.map((p, i) => (
          <div
            key={p.id}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="orbital-moon-card"
            onMouseEnter={() => onHoverChange(true)}
            onMouseLeave={() => {
              if (!draggingRef.current) onHoverChange(false);
            }}
            onPointerDown={handlePointerDown}
          >
            <div
              className="orbital-moon-visual"
              onClick={() => {
                if (!movedRef.current) onZoomImage({ src: p.img, alt: p.title });
              }}
              title="Click to zoom image or drag to rotate"
            >
              <img src={p.img} alt={p.title} loading="lazy" draggable={false} />
              <span className="project-badge orbital-badge">{p.badge}</span>
            </div>

            <div className="orbital-moon-body">
              <h4>{p.title}</h4>
              <p>{p.summary}</p>
              <div className="orbital-moon-actions">
                <button
                  type="button"
                  className="inspect-btn"
                  onClick={() => onSelectProject(p)}
                >
                  <span>Inspect Specs</span>
                  <Expand size={12} />
                </button>
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link-pill github"
                  >
                    <Github size={12} />
                    <span>GitHub</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Orbit Controls — Portaled to body below the planet */}
      <div className="orbital-controls-fixed">
        <button
          type="button"
          className="cert-nav-btn"
          onClick={() => onStepOrbit(1)}
          aria-label="Previous project in orbit"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          className="cert-nav-btn"
          onClick={onTogglePause}
          aria-label={paused ? 'Resume orbit' : 'Pause orbit'}
          title={paused ? 'Resume orbit' : 'Pause orbit'}
        >
          {paused ? <Play size={15} /> : <Pause size={15} />}
        </button>
        <button
          type="button"
          className="cert-nav-btn"
          onClick={() => onStepOrbit(-1)}
          aria-label="Next project in orbit"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </>,
    document.body
  );
}
