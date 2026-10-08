import {
  render, screen 
} from '@testing-library/react';
import {
  describe, expect, it 
} from 'vitest';
import LandingPage from '../src/app/(marketing)/page';

describe('landing page', () => {
  it('renders the main sections and one page heading', () => {
    render(<LandingPage />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Find any place on campus. Know what is inside.',
      }),
    ).toBeInTheDocument();
    expect(screen.getByText('Three simple steps.')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Questions, answered.',
      }),
    )
      .toBeInTheDocument();
  });
});
