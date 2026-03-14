import React from 'react';
import experience from '../data/experience.json';
import { Briefcase, ChevronRight } from 'lucide-react';

const Experience: React.FC = () => {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty('--mouse-x', `${x}px`);
    target.style.setProperty('--mouse-y', `${y}px`);
  };

  const exp = experience[0]; // Focus on the single major project
  const project = exp.projects[0];

  return (
    <section id="experience" className="section-padding experience-hero-section">
      <div className="container experience-hero-grid">
        {/* Sticky Left Column */}
        <div className="experience-sticky-col">
          <div className="section-header animate-fade-in-up delay-100">
            <Briefcase className="section-icon" size={32} />
            <h2 className="massive-title">Defining Impact.</h2>
          </div>
          <p className="experience-summary animate-fade-in-up delay-200">
            {exp.description}
          </p>
          <div className="role-meta animate-fade-in-up delay-300">
            <span className="role-badge">{exp.role}</span>
            <span className="company-badge">{exp.company}</span>
          </div>
        </div>
        
        {/* Scrolling Right Column */}
        <div className="experience-scroll-col">
          <div className="glow-card massive-project-card" onMouseMove={handleMouseMove}>
            <div className="glow-card-content project-card-inner">
              <span className="duration-tag">{exp.duration}</span>
              <h3 className="project-title">{project.name}</h3>
              <p className="project-desc">{project.description}</p>
              
              <div className="impact-metrics">
                {project.impact.map((impact, iIdx) => (
                  <div key={iIdx} className="impact-metric-item">
                    <ChevronRight size={24} className="metric-icon" />
                    <p>{impact}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
