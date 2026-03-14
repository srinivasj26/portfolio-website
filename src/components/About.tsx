import React from 'react';
import identity from '../data/identity.json';

const About: React.FC = () => {

  return (
    <section id="about" className="section-padding about-section">
      <div className="container">
        <div className="about-grid">
          <div className="about-content animate-fade-in-up">
            <h2>About Me</h2>
            
            <div className="glass-panel text-content">
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
