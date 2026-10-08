'use client';

import {
  FormEvent, useEffect, useRef, useState 
} from 'react';
import { X } from 'lucide-react';
import { CryingCat } from '@/components/cats/crying-cat';

const levels = ['100', '200', '300', '400', '500', 'Other'];

export function WaitlistDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const startedAt = useRef(Date.now());
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    const open = () => {
      startedAt.current = Date.now();
      dialog?.showModal();
    };

    window.addEventListener('cns:open-waitlist', open);
    return () => window.removeEventListener('cns:open-waitlist', open);
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      setError(true);
      setMessage('Waitlist registration is not available right now.');
      return;
    }

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...payload,
          startedAt: startedAt.current,
        }),
      });

      if (!response.ok) {
        throw new Error(
          'We could not add you to the waitlist. Please try again.',
        );
      }

      setError(false);
      setMessage('You are on the list.');
      form.reset();
    } catch (caught) {
      setError(true);
      setMessage(
        caught instanceof Error
          ? caught.message
          : 'We could not add you to the waitlist. Please try again.',
      );
    }
  }

  return (
    <dialog
      aria-labelledby="waitlist-title"
      className="waitlist-dialog"
      ref={dialogRef}
    >
      <div className="dialog-heading">
        <div>
          <p className="eyebrow">Early access</p>
          <h2 id="waitlist-title">Join the CNS waitlist</h2>
          <p className="dialog-description">
            Tell us where you study so we can bring CNS to your campus.
          </p>
        </div>
        <button
          aria-label="Close waitlist dialog"
          className="icon-button"
          onClick={() => dialogRef.current?.close()}
          type="button"
        >
          <X aria-hidden="true" />
        </button>
      </div>
      {message && (
        <div className={error ? 'form-message error-message' : 'form-message'}>
          {error && <CryingCat />}
          <p role={error ? 'alert' : 'status'}>{message}</p>
        </div>
      )}
      <form className="waitlist-form" onSubmit={submit}>
        <label className="waitlist-field waitlist-field-wide">
          Name
          <input
            autoComplete="name"
            name="name"
            placeholder="Your full name"
            required
          />
        </label>
        <label className="waitlist-field waitlist-field-wide">
          School
          <input
            name="school"
            placeholder="University name"
            required
          />
        </label>
        <label className="waitlist-field">
          Faculty
          <input name="faculty" placeholder="e.g. Engineering" required />
        </label>
        <label className="waitlist-field">
          Department
          <input name="department" placeholder="e.g. Mechatronics" required />
        </label>
        <label className="waitlist-field">
          Level
          <select name="level" required defaultValue="">
            <option disabled value="">Select level</option>
            {levels.map((level) => <option key={level}>{level}</option>)}
          </select>
        </label>
        <label className="waitlist-field">
          Email
          <input
            autoComplete="email"
            name="email"
            placeholder="you@example.com"
            required
            type="email"
          />
        </label>
        <div className="honeypot-field" aria-hidden="true">
          <label>
            Leave this field empty
            <input
              autoComplete="off"
              name="website"
              tabIndex={-1}
            />
          </label>
        </div>
        <label className="consent-field">
          <input name="consent" required type="checkbox" value="true" />
          <span>
            I agree to the <a href="/privacy-policy">Privacy Policy</a>.
          </span>
        </label>
        <button className="button-primary" type="submit">
          Join waitlist
        </button>
      </form>
    </dialog>
  );
}
