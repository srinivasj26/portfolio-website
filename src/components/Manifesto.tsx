import React from 'react';

const Manifesto: React.FC = () => {
  return (
    <section className="section-padding manifesto-section" aria-labelledby="manifesto-heading">
      <div className="container">
        <div className="manifesto-wrapper scroll-reveal">
          <p className="manifesto-eyebrow animate-fade-in-up">Philosophy</p>
          <h2 id="manifesto-heading" className="manifesto-text animate-fade-in-up delay-100">
            I get excited about problems that don't have a playbook.<br />
            <span className="manifesto-accent">Software, architecture, and AI</span>{' '}
            are how I turn complexity into systems people can rely on.
          </h2>
        </div>
      </div>
    </section>
  );
};

export default Manifesto;
