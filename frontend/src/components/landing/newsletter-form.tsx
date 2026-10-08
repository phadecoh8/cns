'use client';

import {
  FormEvent, useState 
} from 'react';

export function NewsletterForm({enabled,}: {
  enabled: boolean;
}) {
  const [message, setMessage] = useState('');
  if (!enabled) {
    return null;
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get('email') ?? '');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Subscription was not accepted. Please try again.');
      }

      setMessage('Check your inbox to confirm your subscription.');
      form.reset();
    } catch {
      setMessage('We could not subscribe you. Please try again later.');
    }
  }

  return (
    <form className="newsletter-form" onSubmit={submit}>
      <label className="visually-hidden" htmlFor="newsletter-email">
        Email address
      </label>
      <input
        autoComplete="email"
        id="newsletter-email"
        name="email"
        placeholder="Enter your email address"
        required
        type="email"
      />
      <button className="button-primary" type="submit">Subscribe</button>
      <small>Occasional product updates. No spam.</small>
      <p aria-live="polite">{message}</p>
    </form>
  );
}
