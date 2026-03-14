import React, { useEffect } from 'react';
import './index.css';
import './components.css';
import './sections.css';

import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import About from './components/About';
import Timeline from './components/Timeline';
import Skills from './components/Skills';
import AgentSandbox from './components/AgentSandbox';
import Experience from './components/Experience';
import Footer from './components/Footer';

const App: React.FC = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-reveal:not(.animate-fade-in-up)').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="portfolio-app">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <CustomCursor />
      <main id="main-content">
        <Hero />
        <Manifesto />
        <Experience />
        <Timeline />
        <About />
        <Skills />
        <AgentSandbox />
      </main>
      <Footer />
    </div>
  );
};

export default App;
