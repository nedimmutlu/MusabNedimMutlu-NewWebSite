import { useEffect, useState } from 'react';
import { ArrowUpRight, Download, Menu, X } from 'lucide-react';
import { profile } from '../content/site';
import { useActiveSection, useClock, useLockBodyScroll } from '../lib/hooks';
import { useLocale } from '../lib/locale';

const SECTION_IDS = ['work', 'projects', 'skills', 'experience', 'about', 'contact'];

export function Nav() {
  const { locale, setLocale, t } = useLocale();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(SECTION_IDS);
  const clock = useClock(locale);
  useLockBodyScroll(open);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const links = [
    { id: 'work', label: t.nav.work },
    { id: 'projects', label: t.nav.projects },
    { id: 'skills', label: t.nav.skills },
    { id: 'experience', label: t.nav.experience },
    { id: 'about', label: t.nav.about },
  ];

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="nav-inner wrap">
        <a className="brand" href="#top" aria-label={`${profile.name} — ${t.nav.about}`}>
          <span className="brand-mark" aria-hidden="true">
            M
          </span>
          <span className="brand-name">{profile.name}</span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={active === link.id ? 'is-active' : undefined}
              aria-current={active === link.id ? 'true' : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <div className="lang-switch" role="group" aria-label="Dil / Language">
            <button
              type="button"
              className={locale === 'tr' ? 'is-active' : undefined}
              onClick={() => setLocale('tr')}
              aria-pressed={locale === 'tr'}
            >
              TR
            </button>
            <span aria-hidden="true">/</span>
            <button
              type="button"
              className={locale === 'en' ? 'is-active' : undefined}
              onClick={() => setLocale('en')}
              aria-pressed={locale === 'en'}
            >
              EN
            </button>
          </div>

          <a className="nav-cv" href={profile.cv} target="_blank" rel="noreferrer">
            <Download size={14} strokeWidth={1.7} />
            <span>{t.nav.cv}</span>
          </a>

          <a className="nav-contact" href="#contact">
            <span>{t.nav.contact}</span>
            <ArrowUpRight size={15} strokeWidth={1.7} />
          </a>

          <button
            type="button"
            className="menu-btn"
            onClick={() => setOpen(true)}
            aria-label={t.nav.menu}
            aria-expanded={open}
          >
            <Menu size={21} strokeWidth={1.6} />
          </button>
        </div>
      </div>

      {open && (
        <div className="mobile-menu" role="dialog" aria-modal="true" aria-label={t.nav.menu}>
          <div className="mobile-menu-top wrap">
            <span className="mono">
              MENÜ / {locale.toUpperCase()} · {clock} {t.hero.timezone}
            </span>
            <button
              type="button"
              className="menu-close"
              onClick={() => setOpen(false)}
              aria-label={t.nav.close}
            >
              <X size={22} strokeWidth={1.6} />
            </button>
          </div>

          <nav className="mobile-links wrap" aria-label="Mobile">
            {links.map((link, index) => (
              <a key={link.id} href={`#${link.id}`} onClick={() => setOpen(false)}>
                <span className="mobile-index mono">0{index + 1}</span>
                <span>{link.label}</span>
                <ArrowUpRight size={22} strokeWidth={1.4} aria-hidden="true" />
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)}>
              <span className="mobile-index mono">06</span>
              <span>{t.nav.contact}</span>
              <ArrowUpRight size={22} strokeWidth={1.4} aria-hidden="true" />
            </a>
          </nav>

          <div className="mobile-menu-foot wrap">
            <div className="mobile-menu-links">
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href={profile.cv} target="_blank" rel="noreferrer">
                {t.nav.cv}
              </a>
            </div>
            <div className="lang-switch" role="group" aria-label="Dil / Language">
              <button
                type="button"
                className={locale === 'tr' ? 'is-active' : undefined}
                onClick={() => setLocale('tr')}
                aria-pressed={locale === 'tr'}
              >
                TR
              </button>
              <span aria-hidden="true">/</span>
              <button
                type="button"
                className={locale === 'en' ? 'is-active' : undefined}
                onClick={() => setLocale('en')}
                aria-pressed={locale === 'en'}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
