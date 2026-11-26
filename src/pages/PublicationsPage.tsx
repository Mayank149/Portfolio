import { useState } from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { CosmicTransition } from '../components/CosmicTransition';
import { PUBLICATIONS } from '../data/portfolioData';

export function PublicationsPage() {
  const [tab, setTab] = useState<'book' | 'articles'>('book');

  return (
    <CosmicTransition>
      <section className="section page-top-pad">
        <div className="container">
          <div className="section-header-row">
            <div>
              <div className="section-kicker">
                <span className="kicker-bar" />
                <span>PUBLICATIONS</span>
              </div>
              <h1 className="section-title">
                Book, Research <span className="gradient-text">&amp; Writing</span>
              </h1>
            </div>
            <div className="pub-tabs">
              <button
                type="button"
                className={`pub-tab ${tab === 'book' ? 'active' : ''}`}
                onClick={() => setTab('book')}
              >
                Published Book
              </button>
              <button
                type="button"
                className={`pub-tab ${tab === 'articles' ? 'active' : ''}`}
                onClick={() => setTab('articles')}
              >
                Articles &amp; Preprint
              </button>
            </div>
          </div>

          {tab === 'book' ? (
            <div className="book-showcase">
              <div className="book-cover-wrap">
                <img
                  src="img/blog/Book cover front.webp"
                  alt="Machine Learning Projects: A Practical Guide for B.Tech CSE Students"
                />
              </div>
              <div className="book-info">
                <span className="pub-tag">Kindle Edition · Author</span>
                <h3>Machine Learning Projects: A Practical Guide for B.Tech CSE Students</h3>
                <p>
                  Most machine learning courses teach you theory. This book teaches you how to build.
                  Written by a B.Tech CSE student for B.Tech CSE students, this guide bridges the
                  gap between passing exams and confidently engineering projects you can explain and
                  ship.
                </p>
                <div className="project-tags">
                  <span>Machine Learning</span>
                  <span>Practical Guide</span>
                  <span>B.Tech CSE</span>
                  <span>Amazon Kindle</span>
                </div>
                <a
                  href="https://www.amazon.in/dp/B0GX34T5HF"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <BookOpen size={16} />
                  <span>View on Amazon</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="articles-grid">
              {PUBLICATIONS.map((item) => (
                <article className="article-card" key={item.title}>
                  <img src={item.img} alt={item.title} loading="lazy" />
                  <div className="article-body">
                    <span className="article-date">
                      {item.date} · {item.type}
                    </span>
                    <h3>{item.title}</h3>
                    <p>{item.summary}</p>
                    <div className="article-links">
                      <a href={item.primaryUrl} target="_blank" rel="noopener noreferrer">
                        {item.primaryLabel} <ArrowRight size={13} />
                      </a>
                      {item.secondaryUrl && (
                        <a href={item.secondaryUrl} target="_blank" rel="noopener noreferrer">
                          {item.secondaryLabel}
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </CosmicTransition>
  );
}
