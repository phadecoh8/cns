'use client';

import {
  useEffect, useState 
} from 'react';

type CountdownValue = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const labels = ['Days', 'Hours', 'Minutes', 'Seconds'] as const;

function getReleaseDate() {
  const existing = window.localStorage.getItem('cns-release-date');

  if (existing) {
    return new Date(existing);
  }

  const release = new Date();
  release.setMonth(release.getMonth() + 5);
  window.localStorage.setItem('cns-release-date', release.toISOString());

  return release;
}

function getRemaining(target: Date): CountdownValue {
  const remaining = Math.max(0, target.getTime() - Date.now());
  const totalSeconds = Math.floor(remaining / 1000);

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

export function Countdown() {
  const [target, setTarget] = useState<Date | null>(null);
  const [remaining, setRemaining] = useState<CountdownValue>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const release = getReleaseDate();
    setTarget(release);
    setRemaining(getRemaining(release));

    const interval = window.setInterval(() => {
      setRemaining(getRemaining(release));
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const values = target
    ? [remaining.days, remaining.hours, remaining.minutes, remaining.seconds]
    : [0, 0, 0, 0];

  return (
    <section className="countdown-section" aria-labelledby="countdown-title">
      <div className="container countdown-inner">
        <div>
          <p className="eyebrow">Coming soon</p>
          <h2 id="countdown-title">The way around campus is getting closer.</h2>
        </div>
        <div className="countdown-cards" aria-live="off">
          {labels.map((label, index) => (
            <div className="countdown-card" key={label}>
              <span>{String(values[index]).padStart(2, '0')}</span>
              <small>{label}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
