import { ArrowDownToLine } from 'lucide-react';
import { profile } from '../content/site';
import { works } from '../content/videos';
import { useLocale } from '../lib/locale';

export function About() {
  const { locale, t } = useLocale();
  const stats = t.about.stats.map((stat, index) =>
    index === 2 ? { ...stat, value: String(works.length).padStart(2, '0') } : stat,
  );

  return (
    <section className="section about" id="about">
      <div className="wrap">
        <div className="about-layout">
          <figure className="about-figure">
            <span className="about-figure-index mono" aria-hidden="true">
              05
            </span>
            <div className="about-image">
              <img
                src={profile.portrait}
                alt={
                  locale === 'tr'
                    ? 'Musab Nedim Mutlu portresi'
                    : 'Portrait of Musab Nedim Mutlu'
                }
                loading="lazy"
                decoding="async"
              />
            </div>
            <span className="about-figure-line" aria-hidden="true" />
          </figure>

          <div className="about-content">
            <span className="kicker">{t.about.kicker}</span>
            <h2>{t.about.title}</h2>

            <div className="about-text">
              {t.about.paragraphs.map((paragraph, index) => (
                <p className={index === 0 ? 'about-lead' : undefined} key={paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>

            <blockquote className="about-quote">
              <span aria-hidden="true">“</span>
              {t.about.quote}
            </blockquote>

            <div className="about-stats">
              {stats.map((stat) => (
                <div className="about-stat" key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="about-actions">
              <a className="btn btn-outline" href={profile.cv} download="Musab-Nedim-Mutlu-CV.pdf">
                <ArrowDownToLine size={15} strokeWidth={1.7} />
                <span>{t.about.cv}</span>
              </a>
              <span className="about-caption mono">{t.about.caption}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
