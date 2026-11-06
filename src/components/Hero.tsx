import { useEffect, useRef } from 'react';
import { ArrowDown, Play } from 'lucide-react';
import { showreel, works } from '../content/videos';
import { useClock, useMediaQuery } from '../lib/hooks';
import { useLocale } from '../lib/locale';

interface HeroProps {
  onOpenShowreel: () => void;
}

type Segment = { text: string; em?: boolean };

export function Hero({ onOpenShowreel }: HeroProps) {
  const { locale, t } = useLocale();
  const clock = useClock(locale);
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const videoRef = useRef<HTMLVideoElement>(null);
  const lines = t.hero.titleLines as readonly (readonly Segment[])[];
  const reelMeta = `${String(works.length).padStart(2, '0')} ${t.work.count} · ${showreel.duration}`;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (reducedMotion) {
      video.pause();
    } else {
      video.play().catch(() => {
        // Autoplay can be blocked by the browser; the poster remains visible.
      });
    }
  }, [reducedMotion]);

  return (
    <section className="hero" id="top">
      <div
        className="hero-media"
        style={{ backgroundImage: `url(${showreel.poster})` }}
        aria-hidden="true"
      >
        <video
          ref={videoRef}
          src={showreel.src}
          poster={showreel.poster}
          autoPlay={!reducedMotion}
          muted
          loop
          playsInline
          preload="auto"
          tabIndex={-1}
        />
        <div className="hero-scrim" />
      </div>

      <span className="hero-side mono" aria-hidden="true">
        PORTFOLIO — 2026
      </span>

      <div className="hero-inner wrap">
        <div className="hero-top">
          <span className="status">
            <span className="status-dot" aria-hidden="true" />
            {t.hero.status}
          </span>
          <span className="hero-clock mono">
            {t.hero.location} · {clock} {t.hero.timezone}
          </span>
        </div>

        <div className="hero-main">
          <p className="hero-eyebrow mono">{t.hero.eyebrow}</p>

          <h1 className="hero-title">
            {lines.map((line, lineIndex) => (
              <span className="hero-line" key={`${locale}-${lineIndex}`}>
                {line.map((segment, segmentIndex) =>
                  segment.em ? (
                    <em key={segmentIndex}>{segment.text}</em>
                  ) : (
                    <span key={segmentIndex}>{segment.text}</span>
                  ),
                )}
              </span>
            ))}
          </h1>

          <p className="hero-body">{t.hero.body}</p>

          <div className="hero-actions">
            <button type="button" className="btn btn-primary" onClick={onOpenShowreel}>
              <Play size={15} strokeWidth={1.7} fill="currentColor" />
              <span>{t.hero.primary}</span>
            </button>
            <a className="btn btn-ghost" href="#work">
              <span>{t.hero.secondary}</span>
              <ArrowDown size={15} strokeWidth={1.7} />
            </a>
          </div>
        </div>

        <div className="hero-bottom">
          <div className="hero-metrics">
            {t.hero.metrics.map((metric) => (
              <div className="hero-metric" key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>

          <button type="button" className="hero-reel" onClick={onOpenShowreel}>
            <span className="hero-reel-play" aria-hidden="true">
              <Play size={14} strokeWidth={1.7} fill="currentColor" />
            </span>
            <span className="hero-reel-text">
              <span className="mono">{t.hero.reelLabel}</span>
              <small>{reelMeta}</small>
            </span>
            <span className="hero-reel-line" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
