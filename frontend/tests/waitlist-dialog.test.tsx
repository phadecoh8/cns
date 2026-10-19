import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { WaitlistDialog } from '../src/components/landing/waitlist-dialog';

describe('waitlist dialog', () => {
  afterEach(() => {
    cleanup();
    vi.unstubAllEnvs();
  });

  it('opens from a waitlist trigger event', () => {
    render(<WaitlistDialog />);
    window.dispatchEvent(new Event('cns:open-waitlist'));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText(/privacy policy/i)).toBeInTheDocument();
  });

  it('shows an unavailable message if the API is missing', async () => {
    vi.stubEnv('NEXT_PUBLIC_API_URL', '');
    render(<WaitlistDialog />);
    window.dispatchEvent(new Event('cns:open-waitlist'));

    fireEvent.change(
      screen.getByLabelText('Name'),
      { target: { value: 'Example' } },
    );
    fireEvent.submit(document.querySelector('form') as HTMLFormElement);

    expect(
      await screen.findByRole('alert'),
    ).toHaveTextContent('Waitlist registration is not available');
  });
});
