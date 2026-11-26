import { useEffect } from 'react';
import { ProjectItem } from '../data/portfolioData';
import { ExternalLink, Github, X } from 'lucide-react';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
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

  return (
    <div className="scifi-modal" role="dialog" aria-modal="true" aria-label={project.title}>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-panel">
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>
        <div className="modal-visual">
          <img src={project.img} alt={project.title} />
        </div>
        <div className="modal-content">
          <span className="modal-kicker">SYSTEM DOSSIER · {project.badge.toUpperCase()}</span>
          <h3>{project.title}</h3>
          <ul className="modal-bullets">
            {project.bullets.map((b, idx) => (
              <li key={idx}>{b}</li>
            ))}
          </ul>
          <div className="project-tags">
            {project.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <div className="modal-actions">
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
                className="btn-glass"
              >
                <Github size={16} />
                <span>View Repository</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
