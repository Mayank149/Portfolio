import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal } from 'lucide-react';

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  onToast: (msg: string) => void;
}

export function CommandPalette({ open, onClose, onToast }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const actions = [
    { label: 'Navigate: Home', hint: '/', run: () => navigate('/') },
    { label: 'Navigate: Projects Lab (16+)', hint: '/projects', run: () => navigate('/projects') },
    { label: 'Navigate: Neural Skills Matrix', hint: '/skills', run: () => navigate('/skills') },
    { label: 'Navigate: About & Certificates', hint: '/about', run: () => navigate('/about') },
    { label: 'Navigate: Book & Publications', hint: '/publications', run: () => navigate('/publications') },
    { label: 'Navigate: Establish Contact', hint: '/contact', run: () => navigate('/contact') },
    {
      label: 'Open Resume (PDF)',
      hint: 'New Tab',
      run: () => window.open('/downloads/resume.pdf', '_blank', 'noopener,noreferrer'),
    },
    {
      label: 'Copy Email (bansalmayank1414@gmail.com)',
      hint: 'Clipboard',
      run: () =>
        navigator.clipboard
          .writeText('bansalmayank1414@gmail.com')
          .then(() => onToast('Copied: bansalmayank1414@gmail.com')),
    },
    {
      label: 'Open GitHub Profile',
      hint: 'External',
      run: () => window.open('https://github.com/Mayank149', '_blank', 'noopener,noreferrer'),
    },
  ];

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  if (!open) return null;

  const filtered = actions.filter((a) =>
    a.label.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <div className="cmd-modal" role="dialog" aria-modal="true" aria-label="Command Palette">
      <div className="modal-backdrop" onClick={onClose} />
      <div className="cmd-panel">
        <div className="cmd-input-wrap">
          <Terminal size={16} className="text-pink" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a route or command..."
          />
          <kbd>ESC</kbd>
        </div>
        <ul className="cmd-list">
          {filtered.map((a) => (
            <li key={a.label}>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  a.run();
                }}
              >
                <span>{a.label}</span>
                <span className="cmd-hint">{a.hint}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
