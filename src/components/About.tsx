import React from 'react';
import identity from '../data/identity.json';
import { User } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="section-padding about-section" aria-labelledby="about-heading">
      <div className="container">
        <div className="about-grid scroll-reveal">
          <div className="about-content">
            <span className="section-label animate-fade-in-up">About</span>
            <div className="section-header animate-fade-in-up delay-100">
              <User className="section-icon" size={32} aria-hidden />
              <h2 id="about-heading">About me</h2>
            </div>

            <div className="glass-panel text-content animate-fade-in-up delay-200">
              {identity.about.split('. ').map((sentence, idx) => (
                <p key={idx} className={`delay-${(idx + 1) * 100}`}>
                  {sentence}{idx !== identity.about.split('. ').length - 1 ? '.' : ''}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
