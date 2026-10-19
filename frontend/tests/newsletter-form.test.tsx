import {
  cleanup, render, screen 
} from '@testing-library/react';
import {
  afterEach, describe, expect, it, vi 
} from 'vitest';
import { NewsletterForm } from '@/components/landing/newsletter-form';

describe('newsletter form', () => {
  afterEach(() => {
    cleanup();
    vi.unstubAllEnvs();
  });

  it('stays hidden when the API is not configured', () => {
    const { container } = render(<NewsletterForm enabled={false} />);

    expect(container.firstChild).toBeNull();
    expect(screen.queryByLabelText('Email address')).not.toBeInTheDocument();
  });

  it('stays hidden until newsletter email is enabled', () => {
    const { container } = render(<NewsletterForm enabled={false} />);

    expect(container.firstChild).toBeNull();
  });
});
