import { experience, metrics } from '../content/site';
import { useLocale } from '../lib/locale';

export function Experience() {
  const { locale, t } = useLocale();

  return (
    <section className="section experience" id="experience">
      <div className="wrap">
        <div className="section-head">
          <div className="section-head-main">
            <span className="kicker">{t.experience.kicker}</span>
            <h2>{t.experience.title}</h2>
          </div>
          <div className="section-head-side">
            <p>{t.experience.body}</p>
          </div>
        </div>

        <div className="metrics-band">
          {metrics.map((metric) => (
            <div className="metric" key={metric.value + metric.label.en}>
              <strong>{metric.value}</strong>
              <span>{metric.label[locale]}</span>
            </div>
          ))}
        </div>

        <div className="timeline">
          {experience.map((job) => (
            <article className="job" key={job.id}>
              <div className="job-period mono">{job.period[locale]}</div>

              <div className="job-body">
                <div className="job-heading">
                  <div className="job-title">
                    <h3>{job.role[locale]}</h3>
                    <span className="job-company">{job.company}</span>
                  </div>
                  <span className="job-location mono">
                    {job.location[locale]}
                    {job.remote && <em>{t.experience.remote}</em>}
                  </span>
                </div>

                <ul className="job-bullets">
                  {job.bullets.map((bullet) => (
                    <li key={bullet[locale]}>{bullet[locale]}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="edu-band">
          <span className="edu-label mono">{t.experience.educationTitle}</span>

          <div className="edu-grid">
            <div className="edu-item">
              <h3>{t.experience.education}</h3>
              <p>{t.experience.educationMeta}</p>
            </div>

            <div className="edu-item">
              <ul className="language-list">
                {t.experience.languages.map((language) => (
                  <li key={language.name}>
                    <span>{language.name}</span>
                    <em>{language.level}</em>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
