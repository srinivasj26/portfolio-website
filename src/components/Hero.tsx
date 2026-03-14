import React from 'react';
import identity from '../data/identity.json';
import MagneticButton from './MagneticButton';
import Scene from './Scene';

const Hero: React.FC = () => {
  return (
    <section id="home" className="hero-section">
      <div className="hero-background">
        <Scene />
      </div>
      
      <div className="container hero-content-wrapper">
        <div className="hero-text-content">
          <p className="hero-greeting animate-fade-in-up">
            Hi, I'm {identity.name} —
          </p>
          
          <h1 className="hero-title animate-fade-in-up delay-100">
            {identity.title}.
          </h1>
          
          <p className="hero-description animate-fade-in-up delay-200">
            {identity.tagline}
          </p>

          <div className="hero-actions animate-fade-in-up delay-300">
            <MagneticButton className="btn btn-primary" onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}>
              View My Work
            </MagneticButton>
            <MagneticButton className="btn btn-outline" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
              About Me
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
