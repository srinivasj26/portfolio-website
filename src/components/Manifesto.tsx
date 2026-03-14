import React from 'react';

const Manifesto: React.FC = () => {
  return (
    <section className="section-padding manifesto-section">
      <div className="container">
        <div className="manifesto-wrapper">
          <p className="manifesto-eyebrow animate-fade-in-up">Philosophy</p>
          <h2 className="manifesto-text animate-fade-in-up delay-100">
            I don't just write code.<br />
            <span className="manifesto-accent">I build intelligent systems</span>{' '}
            that accelerate entire engineering organizations.
          </h2>
        </div>
      </div>
    </section>
  );
};

export default Manifesto;
