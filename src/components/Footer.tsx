import React from 'react';
import identity from '../data/identity.json';
import { Github, Linkedin, Mail } from 'lucide-react';

type IdentityWithLinks = typeof identity & { links?: { github?: string; linkedin?: string; email?: string } };
const id = identity as IdentityWithLinks;
const links = id.links ?? {};
const githubUrl = links.github ?? 'https://github.com';
const linkedinUrl = links.linkedin ?? 'https://linkedin.com';
const emailUrl = links.email ?? 'mailto:contact@srinivasj.dev';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} {identity.name}. Built with React &amp; Vite.</p>
        <p className="footer-tagline">
          Designed for performance, automation, and clarity.
        </p>
        <nav className="social-links" aria-label="Connect">
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
            <Github size={20} aria-hidden />
          </a>
          <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
            <Linkedin size={20} aria-hidden />
          </a>
          <a href={emailUrl} aria-label="Email">
            <Mail size={20} aria-hidden />
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
