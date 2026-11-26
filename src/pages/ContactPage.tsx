import { Copy, Mail, Phone } from 'lucide-react';
import { CosmicTransition } from '../components/CosmicTransition';

interface ContactPageProps {
  onToast: (msg: string) => void;
}

export function ContactPage({ onToast }: ContactPageProps) {
  const copyValue = async (val: string) => {
    try {
      await navigator.clipboard.writeText(val);
      onToast(`Copied: ${val}`);
    } catch {
      onToast('Copy failed');
    }
  };

  return (
    <CosmicTransition>
      <section className="section page-top-pad">
        <div className="container">
          <div className="contact-hud-card">
            <div className="section-kicker">
              <span className="kicker-bar" />
              <span>ESTABLISH UPLINK</span>
            </div>
            <h1 className="section-title">
              Let's Build Something <span className="gradient-text">Extraordinary</span>
            </h1>
            <p className="contact-sub">
              Open for AI/ML internships, SDE roles, and ambitious collaborations.
            </p>

            <div className="contact-methods">
              <div className="contact-tile">
                <Mail size={20} className="text-pink" />
                <div>
                  <span className="tile-label">Direct Email</span>
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=bansalmayank1414@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tile-value"
                  >
                    bansalmayank1414@gmail.com
                  </a>
                </div>
                <button
                  type="button"
                  className="copy-btn"
                  onClick={() => copyValue('bansalmayank1414@gmail.com')}
                  aria-label="Copy Email"
                >
                  <Copy size={16} />
                </button>
              </div>

              <div className="contact-tile">
                <Phone size={20} className="text-pink" />
                <div>
                  <span className="tile-label">Phone</span>
                  <a href="tel:+918708574164" className="tile-value">
                    +91 8708574164
                  </a>
                </div>
                <button
                  type="button"
                  className="copy-btn"
                  onClick={() => copyValue('+918708574164')}
                  aria-label="Copy Phone"
                >
                  <Copy size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </CosmicTransition>
  );
}
