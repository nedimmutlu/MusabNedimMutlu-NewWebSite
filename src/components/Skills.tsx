import { useState } from 'react';
import { Plus } from 'lucide-react';
import { skillCategories, tools } from '../content/site';
import { useLocale } from '../lib/locale';

export function Skills() {
  const { locale, t } = useLocale();
  const [active, setActive] = useState(skillCategories[0].id);

  return (
    <section className="section skills" id="skills">
      <div className="wrap">
        <div className="skills-layout">
          <div className="skills-intro">
            <span className="kicker">{t.skills.kicker}</span>
            <h2>{t.skills.title}</h2>
            <p>{t.skills.body}</p>
            <span className="skills-hint mono">{t.skills.hint}</span>
          </div>

          <div className="skills-list">
            {skillCategories.map((category) => {
              const open = active === category.id;
              return (
                <div className={`skill ${open ? 'is-open' : ''}`} key={category.id}>
                  <button
                    type="button"
                    className="skill-head"
                    onClick={() => setActive(category.id)}
                    aria-expanded={open}
                    aria-controls={`skill-panel-${category.id}`}
                  >
                    <span className="skill-index mono">{category.index}</span>
                    <span className="skill-name">{category.name[locale]}</span>
                    <span className="skill-toggle" aria-hidden="true">
                      <Plus size={17} strokeWidth={1.5} />
                    </span>
                  </button>

                  <div className="skill-panel" id={`skill-panel-${category.id}`}>
                    <div className="skill-panel-inner">
                      <p>{category.description[locale]}</p>
                      <ul className="chips" aria-label={category.name[locale]}>
                        {category.items.map((item) => (
                          <li className="chip" key={item}>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="tools-strip">
          <span className="tools-label mono">{t.skills.toolsLabel}</span>
          <ul className="tools-list" aria-label={t.skills.toolsLabel}>
            {tools.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
