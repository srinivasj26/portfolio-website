import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MagneticButton from './MagneticButton';

describe('MagneticButton', () => {
  it('renders children', () => {
    render(<MagneticButton>Click me</MagneticButton>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked (button mode)', () => {
    const handleClick = vi.fn();
    render(<MagneticButton onClick={handleClick}>Submit</MagneticButton>);
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders as link when href is provided', () => {
    render(<MagneticButton href="https://example.com">Link</MagneticButton>);
    const link = screen.getByRole('link', { name: /link/i });
    expect(link).toHaveAttribute('href', 'https://example.com');
  });
});
