import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

// Mock heavy components to keep tests fast and avoid WebGL/Three.js in jsdom
vi.mock('./components/CustomCursor', () => ({ default: () => null }));
vi.mock('./components/Hero', () => ({ default: () => <div data-testid="hero">Hero</div> }));
vi.mock('./components/Scene', () => ({ default: () => null }));
vi.mock('./components/Manifesto', () => ({ default: () => null }));
vi.mock('./components/About', () => ({ default: () => null }));
vi.mock('./components/Timeline', () => ({ default: () => null }));
vi.mock('./components/Skills', () => ({ default: () => null }));
vi.mock('./components/AgentSandbox', () => ({ default: () => null }));
vi.mock('./components/Experience', () => ({ default: () => null }));
vi.mock('./components/Footer', () => ({ default: () => null }));

describe('App', () => {
  it('renders skip link for accessibility', () => {
    render(<App />);
    const skipLink = screen.getByText(/skip to main content/i);
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main-content');
  });

  it('renders main content landmark', () => {
    render(<App />);
    const main = document.getElementById('main-content');
    expect(main).toBeInTheDocument();
    expect(main?.tagName).toBe('MAIN');
  });
});
