import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { ProjectItem } from '../data/portfolioData';
import { ExternalLink, Github, Layers, Maximize2, X } from 'lucide-react';
import { ZoomedImage } from './ImageLightbox';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onZoomImage?: (img: ZoomedImage) => void;
}

export function ProjectModal({ project, onClose, onZoomImage }: ProjectModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  if (!project) return null;

  return createPortal(
    <div className="scifi-modal" role="dialog" aria-modal="true" aria-label={project.title}>
      <div className="modal-backdrop" onClick={onClose} />

      <motion.div
        className="modal-panel enhanced-modal"
        initial={{ opacity: 0, y: 14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
      >
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        {/* Uncropped full-view visual */}
        <div
          className="modal-visual uncropped-visual"
          onClick={() => onZoomImage?.({ src: project.img, alt: project.title })}
          title="Click to zoom image"
        >
          <img src={project.img} alt={project.title} />
          {onZoomImage && (
            <span className="visual-zoom-pill">
              <Maximize2 size={12} /> Zoom
            </span>
          )}
        </div>

        <div className="modal-content enhanced-content">
          <div className="modal-badges-row" style={{ marginBottom: 8 }}>
            <span className="modal-kicker">SYSTEM DOSSIER · {project.badge.toUpperCase()}</span>
            {project.chips?.map((c) => (
              <span className="hud-chip" key={c}>
                {c}
              </span>
            ))}
          </div>

          <h3 className="modal-clean-title">{project.title}</h3>
          <p className="modal-summary-lead">{project.summary}</p>

          <div className="modal-section-label">
            <Layers size={13} />
            <span>ARCHITECTURE &amp; HIGHLIGHTS</span>
          </div>

          <div className="modal-highlights">
            {project.bullets.map((b, idx) => (
              <div className="modal-highlight-row" key={idx}>
                <span className="highlight-index">{String(idx + 1).padStart(2, '0')}</span>
                <p>{b}</p>
              </div>
            ))}
          </div>

          <div className="modal-section-label" style={{ marginTop: 18 }}>
            <span>TECH STACK</span>
          </div>
          <div className="project-tags">
            {project.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>

          <div className="modal-actions enhanced-actions">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <ExternalLink size={16} />
                <span>Live Demo</span>
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link-pill github modal-gh-btn"
              >
                <Github size={16} />
                <span>View on GitHub</span>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>,
    document.body
  );
}
