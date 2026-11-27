import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { Terminal } from 'lucide-react';

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  onToast: (msg: string) => void;
}

export function CommandPalette({ open, onClose, onToast }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const actions = useMemo(
    () => [
      { label: 'Navigate: Home', hint: '/', keywords: 'home main start', run: () => navigate('/') },
      {
        label: 'Navigate: Projects Lab (16+)',
        hint: '/projects',
        keywords: 'projects work portfolio',
        run: () => navigate('/projects'),
      },
      {
        label: 'Navigate: Neural Skills Matrix',
        hint: '/skills',
        keywords: 'skills tech stack belt',
        run: () => navigate('/skills'),
      },
      {
        label: 'Navigate: About & Certificates',
        hint: '/about',
        keywords: 'about bio education certificates wissen',
        run: () => navigate('/about'),
      },
      {
        label: 'Navigate: Book & Publications',
        hint: '/publications',
        keywords: 'publications book blog medium paper',
        run: () => navigate('/publications'),
      },
      {
        label: 'Navigate: Establish Contact',
        hint: '/contact',
        keywords: 'contact email phone hire',
        run: () => navigate('/contact'),
      },
      {
        label: 'Open Resume (PDF)',
        hint: 'New Tab',
        keywords: 'resume cv pdf download',
        run: () => window.open('downloads/resume.pdf', '_blank', 'noopener,noreferrer'),
      },
      {
        label: 'Copy Email (bansalmayank1414@gmail.com)',
        hint: 'Clipboard',
        keywords: 'copy email mail gmail',
        run: () =>
          navigator.clipboard
            .writeText('bansalmayank1414@gmail.com')
            .then(() => onToast('Copied: bansalmayank1414@gmail.com')),
      },
      {
        label: 'Open GitHub Profile',
        hint: 'External',
        keywords: 'github code repo',
        run: () => window.open('https://github.com/Mayank149', '_blank', 'noopener,noreferrer'),
      },
    ],
    [navigate, onToast]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter(
      (a) =>
        a.label.toLowerCase().includes(q) ||
        a.hint.toLowerCase().includes(q) ||
        a.keywords.includes(q)
    );
  }, [actions, query]);

  useEffect(() => {
    if (open) {
      setActiveIdx(0);
      setTimeout(() => inputRef.current?.focus(), 20);
    } else {
      setQuery('');
    }
  }, [open]);

  useEffect(() => {
    setActiveIdx(0);
  }, [query]);

  if (!open) return null;

  const runAction = (idx: number) => {
    const item = filtered[idx];
    if (!item) return;
    onClose();
    item.run();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (filtered.length > 0) setActiveIdx((i) => (i + 1) % filtered.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (filtered.length > 0) setActiveIdx((i) => (i - 1 + filtered.length) % filtered.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      runAction(activeIdx);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  return createPortal(
    <div className="cmd-modal" role="dialog" aria-modal="true" aria-label="Command Palette">
      <div className="modal-backdrop" onClick={onClose} />
      <div className="cmd-panel">
        <div className="cmd-input-wrap">
          <Terminal size={16} className="text-pink" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a route or command (Enter to run)..."
          />
          <kbd>ESC</kbd>
        </div>
        <ul className="cmd-list">
          {filtered.length === 0 ? (
            <li className="cmd-empty">No matching commands</li>
          ) : (
            filtered.map((a, idx) => (
              <li key={a.label}>
                <button
                  type="button"
                  className={idx === activeIdx ? 'is-selected' : ''}
                  onMouseEnter={() => setActiveIdx(idx)}
                  onClick={() => runAction(idx)}
                >
                  <span>{a.label}</span>
                  <span className="cmd-hint">{a.hint}</span>
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>,
    document.body
  );
}
