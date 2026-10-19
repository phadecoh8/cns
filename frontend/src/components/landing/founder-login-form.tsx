'use client';

import {
  FormEvent, useState 
} from 'react';

export function FounderLoginForm() {
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage('');
    const data = new FormData(event.currentTarget);

    try {
      const response = await fetch('/api/founder/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.get('email'),
          password: data.get('password'),
        }),
      });

      if (!response.ok) {
        setMessage('Email or password is incorrect.');
        return;
      }

      window.location.assign('/admin/founder/waitlist');
    } catch {
      setMessage('Sign-in is unavailable. Please try again later.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="admin-form" onSubmit={submit}>
      <label>
        Email
        <input autoComplete="username" name="email" required type="email" />
      </label>
      <label>
        Dashboard password
        <input
          autoComplete="current-password"
          name="password"
          required
          type="password"
        />
      </label>
      <button className="button-primary" disabled={busy} type="submit">
        {busy ? 'Signing in...' : 'Sign in'}
      </button>
      <p aria-live="polite" role="alert">{message}</p>
    </form>
  );
}
