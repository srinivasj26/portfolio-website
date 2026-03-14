import React from 'react';
import experienceData from '../data/experience.json';
import { Briefcase, ChevronRight } from 'lucide-react';

type ExperienceEntry = {
  role: string;
  company: string;
  duration: string;
  description: string;
  projects: Array<{ name: string; description: string; impact: string[] }>;
};

const experience = experienceData as ExperienceEntry[];

const Experience: React.FC = () => {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty('--mouse-x', `${x}px`);
    target.style.setProperty('--mouse-y', `${y}px`);
  };

  if (!experience?.length) {
    return null;
  }

  return (
    <section id="experience" className="section-padding experience-hero-section" aria-labelledby="experience-heading">
      <div className="container">
        <div className="scroll-reveal">
          <span className="section-label animate-fade-in-up">Experience</span>
          <div className="section-header animate-fade-in-up delay-100">
            <Briefcase className="section-icon" size={32} aria-hidden />
            <h2 id="experience-heading">Defining impact.</h2>
          </div>
        </div>

        {experience.map((exp, roleIdx) => (
          <div key={`${exp.role}-${exp.company}-${roleIdx}`} className="experience-hero-grid">
            <div className="experience-sticky-col scroll-reveal">
              <p className="experience-summary animate-fade-in-up delay-200">
                {exp.description}
              </p>
              <div className="role-meta animate-fade-in-up delay-300">
                <span className="role-badge">{exp.role}</span>
                <span className="company-badge">{exp.company}</span>
              </div>
              <span className="duration-tag duration-tag-sticky">{exp.duration}</span>
            </div>

            <div className="experience-scroll-col scroll-reveal">
              <div className="experience-projects">
                {exp.projects.map((project, pIdx) => (
                  <div
                    key={`${project.name}-${pIdx}`}
                    className="glow-card experience-project-card"
                    onMouseMove={handleMouseMove}
                  >
                    <div className="glow-card-content project-card-inner">
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
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
