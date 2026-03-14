import React from 'react';
import identity from '../data/identity.json';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="footer animate-fade-in-up delay-500">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} {identity.name}. Built with React &amp; Vite.</p>
        <p style={{ color: "var(--text-tertiary)", fontSize: "0.85rem", marginTop: "0.5rem" }}>
          Designed with an emphasis on performance, automation, and enterprise elegance.
        </p>
        <div className="social-links" style={{ marginTop: "1.5rem" }}>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github size={20} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin size={20} />
          </a>
          <a href="mailto:contact@srinivasj.dev" aria-label="Email">
            <Mail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
