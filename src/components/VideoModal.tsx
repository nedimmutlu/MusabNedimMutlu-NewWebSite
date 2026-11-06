import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft, ArrowRight, ExternalLink, X } from 'lucide-react';
import type { VideoWork } from '../content/videos';
import { useLockBodyScroll } from '../lib/hooks';
import { useLocale } from '../lib/locale';

interface VideoModalProps {
  videos: VideoWork[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function VideoModal({ videos, activeIndex, onClose, onNavigate }: VideoModalProps) {
  const { locale, t } = useLocale();
  const isOpen = activeIndex !== null;
  const index = activeIndex ?? 0;
  const video = videos[index];
  const closeButton = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const [failed, setFailed] = useState(false);

  useLockBodyScroll(isOpen);

  useEffect(() => {
    if (isOpen) {
      returnFocus.current = document.activeElement as HTMLElement | null;
      const frame = window.requestAnimationFrame(() => closeButton.current?.focus());
      return () => {
        window.cancelAnimationFrame(frame);
        returnFocus.current?.focus();
      };
    }
    return undefined;
  }, [isOpen]);

  useEffect(() => {
    setFailed(false);
  }, [video?.id]);

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key === 'ArrowRight') {
        onNavigate((index + 1) % videos.length);
      }

      if (event.key === 'ArrowLeft') {
        onNavigate((index - 1 + videos.length) % videos.length);
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, isOpen, onClose, onNavigate, videos.length]);

  if (!isOpen || !video) return null;

  const previousIndex = (index - 1 + videos.length) % videos.length;
  const nextIndex = (index + 1) % videos.length;

  return createPortal(
    <div className="modal" role="presentation">
      <div className="modal-backdrop" onClick={onClose} aria-hidden="true" />

      <div
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-label={`${video.title[locale]} — ${t.work.gallery}`}
      >
        <div className="modal-top">
          <span className="mono">
            {t.work.gallery} · {String(index + 1).padStart(2, '0')} {t.common.of}{' '}
            {String(videos.length).padStart(2, '0')}
          </span>
          <button
            ref={closeButton}
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label={t.common.close}
          >
            <X size={19} strokeWidth={1.6} />
          </button>
        </div>

        <div className={`modal-video ${video.orientation === 'portrait' ? 'is-portrait' : ''}`}>
          {failed ? (
            <div className="modal-video-error">
              <p>{t.common.videoError}</p>
              <a href={video.src} target="_blank" rel="noreferrer">
                {t.common.open}
                <ExternalLink size={14} strokeWidth={1.6} />
              </a>
            </div>
          ) : (
            <video
              key={video.id}
              src={video.src}
              poster={video.poster}
              controls
              autoPlay
              playsInline
              preload="auto"
              controlsList="nodownload"
              onError={() => setFailed(true)}
            />
          )}
        </div>

        <div className="modal-info">
          <div className="modal-copy">
            <span className="mono modal-meta">
              {video.year} · {video.duration}
            </span>
            <h2>{video.title[locale]}</h2>
            {video.client && (
              <span className="modal-client mono">
                {t.work.clientLabel} — {video.client[locale]}
              </span>
            )}
            <p>{video.description[locale]}</p>
            <ul className="chips" aria-label="Tools">
              {video.tools.map((tool) => (
                <li className="chip" key={tool}>
                  {tool}
                </li>
              ))}
            </ul>
            <span className="modal-credit mono">{video.credits[locale]}</span>
          </div>

          <div className="modal-nav">
            <button
              type="button"
              className="modal-nav-button"
              onClick={() => onNavigate(previousIndex)}
              aria-label={t.common.previous}
            >
              <ArrowLeft size={18} strokeWidth={1.5} />
              <span>{t.common.previous}</span>
            </button>
            <span className="modal-nav-count mono">
              {String(index + 1).padStart(2, '0')} / {String(videos.length).padStart(2, '0')}
            </span>
            <button
              type="button"
              className="modal-nav-button is-next"
              onClick={() => onNavigate(nextIndex)}
              aria-label={t.common.next}
            >
              <span>{t.common.next}</span>
              <ArrowRight size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
