import { ArrowUpRight, Code2, Smartphone, Workflow } from 'lucide-react';
import { projects, type Project } from '../content/site';
import { useLocale } from '../lib/locale';

const icons: Record<Project['icon'], typeof Smartphone> = {
  phone: Smartphone,
  workflow: Workflow,
  code: Code2,
};

export function Projects() {
  const { locale, t } = useLocale();

  return (
    <section className="section projects" id="projects">
      <div className="wrap">
        <div className="section-head">
          <div className="section-head-main">
            <span className="kicker">{t.projects.kicker}</span>
            <h2>{t.projects.title}</h2>
          </div>
          <div className="section-head-side">
            <p>{t.projects.body}</p>
          </div>
        </div>

        <div className="project-list">
          {projects.map((project) => {
            const Icon = icons[project.icon];
            const status =
              project.status === 'inProgress' ? t.projects.inProgress : t.projects.completed;

            return (
              <article className="project-row" key={project.id}>
                <div className="project-rail">
                  <span className="project-index mono">{project.index}</span>
                  <span className="project-icon" aria-hidden="true">
                    <Icon size={21} strokeWidth={1.4} />
                  </span>
                </div>

                <div className="project-content">
                  <div className="project-title-row">
                    <h3>{project.title[locale]}</h3>
                    <span className={`project-status ${project.status}`}>
                      <span aria-hidden="true" />
                      {status}
                    </span>
                  </div>
                  <p className="project-subtitle mono">{project.subtitle[locale]}</p>
                  <p className="project-description">{project.description[locale]}</p>

                  <ul className="project-bullets">
                    {project.bullets.map((bullet) => (
                      <li key={bullet[locale]}>{bullet[locale]}</li>
                    ))}
                  </ul>

                  <ul className="chips project-tags" aria-label="Tags">
                    {project.tags.map((tag) => (
                      <li className="chip" key={tag}>
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  className="project-link"
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${project.title[locale]} — ${t.projects.viewRepo}`}
                >
                  <ArrowUpRight size={20} strokeWidth={1.5} />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
