import {
  MapPin, Route, Search 
} from 'lucide-react';
import { landingCopy } from '@/content/landing-copy';

const icons = [Search, Route, MapPin];

export function HowItWorks() {
  return (
    <section className="steps-section" id="how-it-works">
      <div className="container">
        <p className="eyebrow">How it works</p>
        <h2 className="section-title">Three simple steps.</h2>
        <p className="section-intro">
          From searching to arriving, CNS keeps every step clear.
        </p>
        <div className="steps-grid">
          {landingCopy.howItWorks.map((step, index) => {
            const Icon = icons[index];

            return (
              <article className="card step-card" key={step.title}>
                <span className="step-icon"><Icon aria-hidden="true" /></span>
                <span className="step-number">0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
