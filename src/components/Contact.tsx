import {
  ArrowDownToLine,
  ArrowUpRight,
  Check,
  Clock3,
  Copy,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons';
import { profile } from '../content/site';
import { useClock, useCopy } from '../lib/hooks';
import { useLocale } from '../lib/locale';

export function Contact() {
  const { locale, t } = useLocale();
  const { copied, copyText } = useCopy();
  const clock = useClock(locale);

  return (
    <section className="section contact" id="contact">
      <div className="contact-glow" aria-hidden="true" />

      <div className="wrap contact-layout">
        <div className="contact-main">
          <span className="kicker">{t.contact.kicker}</span>
          <h2>{t.contact.title}</h2>
          <p className="contact-body">{t.contact.body}</p>

          <div className="contact-email-block">
            <span className="contact-label mono">{t.contact.emailLabel}</span>
            <div className="contact-email-row">
              <a className="contact-email" href={`mailto:${profile.email}`}>
                <span>{profile.email}</span>
                <ArrowUpRight size={24} strokeWidth={1.3} aria-hidden="true" />
              </a>
              <button
                type="button"
                className="copy-button"
                onClick={() => copyText(profile.email)}
                aria-label={copied ? t.contact.copied : t.contact.copy}
              >
                {copied ? (
                  <Check size={14} strokeWidth={1.8} />
                ) : (
                  <Copy size={14} strokeWidth={1.6} />
                )}
                <span aria-live="polite">{copied ? t.contact.copied : t.contact.copy}</span>
              </button>
            </div>
          </div>

          <span className="status contact-status">
            <span className="status-dot" aria-hidden="true" />
            {t.contact.availability}
          </span>
        </div>

        <div className="contact-side">
          <div className="contact-row">
            <span className="contact-row-icon" aria-hidden="true">
              <MapPin size={16} strokeWidth={1.5} />
            </span>
            <div>
              <span className="mono">{t.hero.location}</span>
              <strong>
                {profile.name} · {clock} {t.hero.timezone}
              </strong>
            </div>
          </div>

          <div className="contact-row">
            <span className="contact-row-icon" aria-hidden="true">
              <Clock3 size={16} strokeWidth={1.5} />
            </span>
            <div>
              <span className="mono">{t.contact.timeLabel}</span>
              <strong>
                {clock} · UTC+3
              </strong>
            </div>
          </div>

          <div className="contact-row">
            <span className="contact-row-icon" aria-hidden="true">
              <Phone size={16} strokeWidth={1.5} />
            </span>
            <div>
              <span className="mono">{t.contact.phoneLabel}</span>
              <a href={`tel:${profile.phoneHref}`}>{profile.phone}</a>
            </div>
          </div>

          <div className="contact-row">
            <span className="contact-row-icon" aria-hidden="true">
              <Mail size={16} strokeWidth={1.5} />
            </span>
            <div>
              <span className="mono">{t.contact.emailLabel}</span>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </div>
          </div>

          <div className="contact-socials">
            <span className="mono">{t.contact.socialLabel}</span>
            <div className="contact-social-links">
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                <LinkedinIcon size={16} strokeWidth={1.5} />
                <span>LinkedIn</span>
                <ArrowUpRight size={13} strokeWidth={1.5} aria-hidden="true" />
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer">
                <GithubIcon size={16} strokeWidth={1.5} />
                <span>GitHub</span>
                <ArrowUpRight size={13} strokeWidth={1.5} aria-hidden="true" />
              </a>
              <a href={profile.cv} download="Musab-Nedim-Mutlu-CV.pdf">
                <ArrowDownToLine size={16} strokeWidth={1.5} />
                <span>{t.contact.cv}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
