import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { profile } from '../content/site';
import { useClock } from '../lib/hooks';
import { useLocale } from '../lib/locale';

export function Footer() {
  const { locale, t } = useLocale();
  const clock = useClock(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <a className="brand" href="#top" aria-label={profile.name}>
              <span className="brand-mark" aria-hidden="true">
                M
              </span>
              <span className="brand-name">{profile.name}</span>
            </a>
            <p>{t.footer.tagline}</p>
            <span className="footer-clock mono">
              {t.hero.location} · {clock} {t.hero.timezone}
            </span>
          </div>

          <nav className="footer-nav" aria-label="Footer">
            <a href="#work">{t.nav.work}</a>
            <a href="#projects">{t.nav.projects}</a>
            <a href="#skills">{t.nav.skills}</a>
            <a href="#experience">{t.nav.experience}</a>
            <a href="#about">{t.nav.about}</a>
            <a href="#contact">{t.nav.contact}</a>
          </nav>

          <div className="footer-links">
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn <ArrowUpRight size={13} strokeWidth={1.5} />
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub <ArrowUpRight size={13} strokeWidth={1.5} />
            </a>
            <a href={`mailto:${profile.email}`}>
              {profile.email} <ArrowUpRight size={13} strokeWidth={1.5} />
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {year} {profile.name}. {t.footer.rights}
          </span>
          <span>{t.footer.built}</span>
          <a className="footer-top-link" href="#top">
            {t.footer.top}
            <ArrowUp size={14} strokeWidth={1.6} />
          </a>
        </div>

        <div className="footer-wordmark" aria-hidden="true">
          MUSAB
        </div>
      </div>
    </footer>
  );
}
