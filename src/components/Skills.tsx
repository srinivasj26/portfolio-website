import React from 'react';
import skills from '../data/skills.json';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="section-padding skills-section" style={{ borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="container">
        
        <div className="skills-clear-grid">
          {skills.map((skillGroup, index) => (
            <div key={index} className="skill-category-block animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
              <h3 className="skill-category-title">{skillGroup.category}</h3>
              <div className="skill-clear-list">
                {skillGroup.items.map((item, idx) => (
                  <span key={idx} className="skill-clear-item">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
