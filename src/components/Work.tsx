import { useRef } from 'react';
import { ArrowUpRight, Plus } from 'lucide-react';
import { works, type VideoWork } from '../content/videos';
import { useMediaQuery } from '../lib/hooks';
import { useLocale } from '../lib/locale';

interface WorkProps {
  onOpenVideo: (video: VideoWork) => void;
}

function WorkCard({
  video,
  index,
  onOpen,
}: {
  video: VideoWork;
  index: number;
  onOpen: (video: VideoWork) => void;
}) {
  const { locale, t } = useLocale();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)');

  const startPreview = () => {
    if (!canHover) return;
    const element = videoRef.current;
    if (!element) return;
    element.play().catch(() => {
      // The poster stays visible when the browser refuses playback.
    });
  };

  const stopPreview = () => {
    const element = videoRef.current;
    if (!element) return;
    element.pause();
    if (element.readyState > 0) element.currentTime = 0;
  };

  const meta = video.client?.[locale] ?? video.tools.join(' · ');

  return (
    <article
      className={`work-card ${index === 0 ? 'is-feature' : ''}`}
      data-orientation={video.orientation}
      onMouseEnter={startPreview}
      onMouseLeave={stopPreview}
    >
      <div className="work-media">
        <video
          ref={videoRef}
          src={video.src}
          poster={video.poster}
          muted
          loop
          playsInline
          preload="none"
          tabIndex={-1}
          aria-hidden="true"
        />

        <div className="work-overlay" aria-hidden="true" />

        <div className="work-top">
          <span className="mono">{String(index + 1).padStart(2, '0')}</span>
          <span className="mono">
            {video.duration} · {video.year}
          </span>
        </div>

        <div className="work-bottom">
          <div className="work-copy">
            <h3 className="work-title">{video.title[locale]}</h3>
            <p className="work-tools mono">{meta}</p>
          </div>
          <span className="work-arrow" aria-hidden="true">
            <ArrowUpRight size={19} strokeWidth={1.5} />
          </span>
        </div>

        <button
          type="button"
          className="work-open"
          onClick={() => onOpen(video)}
          aria-label={`${video.title[locale]} — ${t.work.open}`}
        />
      </div>
    </article>
  );
}

export function Work({ onOpenVideo }: WorkProps) {
  const { t } = useLocale();

  return (
    <section className="section work" id="work">
      <div className="wrap">
        <div className="section-head">
          <div className="section-head-main">
            <span className="kicker">{t.work.kicker}</span>
            <h2>{t.work.title}</h2>
          </div>
          <div className="section-head-side">
            <p>{t.work.body}</p>
            <span className="work-count mono">
              {String(works.length).padStart(2, '0')} {t.work.count}
            </span>
          </div>
        </div>

        {works.length > 0 ? (
          <div className="work-grid">
            {works.map((video, index) => (
              <WorkCard
                key={video.id}
                video={video}
                index={index}
                onOpen={onOpenVideo}
              />
            ))}
          </div>
        ) : (
          <p className="work-empty">{t.work.empty}</p>
        )}

        <a className="work-next" href="#contact">
          <span className="work-next-mark" aria-hidden="true">
            <Plus size={28} strokeWidth={1.2} />
          </span>
          <span className="work-next-copy">
            <span className="mono">{t.work.nextKicker}</span>
            <h3>{t.work.nextTitle}</h3>
            <p>{t.work.nextBody}</p>
          </span>
          <span className="work-next-cta">
            <span>{t.work.nextCta}</span>
            <ArrowUpRight size={16} strokeWidth={1.5} />
          </span>
        </a>
      </div>
    </section>
  );
}
