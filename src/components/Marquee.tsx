import { marquee } from '../content/site';
import { useLocale } from '../lib/locale';

export function Marquee() {
  const { locale } = useLocale();
  const items = marquee.map((item) => item[locale]);

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((group) => (
          <div className="marquee-group" key={group}>
            {items.map((item) => (
              <span className="marquee-item" key={`${group}-${item}`}>
                <span>{item}</span>
                <span className="marquee-star">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
