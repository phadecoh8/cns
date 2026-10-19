import { ArrowRight } from 'lucide-react';
import { landingCopy } from '@/content/landing-copy';
import { WaitlistTrigger } from './waitlist-trigger';

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-backdrop" aria-hidden="true" />
      <div className="container hero-content">
        <p className="eyebrow">Campus navigation, simplified</p>
        <h1 id="hero-title">{landingCopy.headline}</h1>
        <p className="hero-intro">{landingCopy.introduction}</p>
        <div className="hero-actions">
          <WaitlistTrigger>
            Join the waitlist <ArrowRight aria-hidden="true" size={18} />
          </WaitlistTrigger>
          <a href="#how-it-works" className="text-link">
            See how it works
          </a>
        </div>
      </div>
    </section>
  );
}
