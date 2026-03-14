import React from 'react';
import skills from '../data/skills.json';
import { Layers } from 'lucide-react';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="section-padding skills-section skills-section-bordered" aria-labelledby="skills-heading">
      <div className="container">
        <div className="scroll-reveal">
          <span className="section-label animate-fade-in-up">Capabilities</span>
          <div className="section-header animate-fade-in-up delay-100">
            <Layers className="section-icon" size={32} aria-hidden />
            <h2 id="skills-heading">Skills &amp; tools</h2>
          </div>
        </div>

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
