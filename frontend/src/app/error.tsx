'use client';

import { CryingCat } from '@/components/cats/crying-cat';

export default function ErrorPage({reset,}: {
  reset: () => void;
}) {
  return (
    <main className="not-found">
      <CryingCat />
      <h1>Something went wrong</h1>
      <p>Please try again.</p>
      <button className="button-primary" onClick={reset}>
        Try again
      </button>
    </main>
  );
}
