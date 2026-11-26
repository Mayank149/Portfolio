import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export interface ZoomedImage {
  src: string;
  alt: string;
}

interface ImageLightboxProps {
  image: ZoomedImage | null;
  onClose: () => void;
}

export function ImageLightbox({ image, onClose }: ImageLightboxProps) {
  useEffect(() => {
    if (!image) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [image, onClose]);

  if (!image) return null;

  return createPortal(
    <div className="scifi-modal" role="dialog" aria-modal="true" aria-label={image.alt}>
      <div className="modal-backdrop" onClick={onClose} />
      <motion.div
        className="project-zoom-panel"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
      >
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close zoomed image">
          <X size={18} />
        </button>
        <img src={image.src} alt={image.alt} className="project-zoom-img" />
        <div className="lightbox-caption">{image.alt}</div>
      </motion.div>
    </div>,
    document.body
  );
}
