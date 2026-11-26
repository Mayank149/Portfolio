import { Brain, Code2, Cpu, Server } from 'lucide-react';
import { CosmicTransition } from '../components/CosmicTransition';
import { SKILL_GROUPS } from '../data/portfolioData';

export function SkillsPage() {
  const getIcon = (icon: 'brain' | 'cpu' | 'code' | 'server') => {
    if (icon === 'brain') return <Brain size={20} />;
    if (icon === 'cpu') return <Cpu size={20} />;
    if (icon === 'code') return <Code2 size={20} />;
    return <Server size={20} />;
  };

  return (
    <CosmicTransition>
      <section className="section page-top-pad">
        <div className="container">
          <div className="section-header-row">
            <div>
              <div className="section-kicker">
                <span className="kicker-bar" />
                <span>NEURAL STACK</span>
              </div>
              <h1 className="section-title">
                Technologies <span className="gradient-text">I Work With</span>
              </h1>
            </div>
            <p className="section-lead">
              Production-oriented tools across agentic orchestration, deep learning, and backend
              deployment.
            </p>
          </div>

          <div className="skills-bento">
            {SKILL_GROUPS.map((g) => (
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
            ))}
          </div>
        </div>
      </section>
    </CosmicTransition>
  );
}
