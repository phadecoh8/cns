import {
  Clock3, Smartphone, UsersRound 
} from 'lucide-react';
import { landingCopy } from '@/content/landing-copy';

const icons = [UsersRound, Smartphone, Clock3];

export function About() {
  return (
    <section className="about-section" id="about">
      <div className="container">
        <p className="eyebrow">Built for real campus life</p>
        <div className="about-heading">
          <h2 className="section-title">
            Less asking around. More getting there.
          </h2>
          <p>
            Whether it is your first day or you are visiting for one meeting,
            CNS makes unfamiliar campuses easier to understand.
          </p>
        </div>
        <div className="about-grid">
          {landingCopy.about.map((item, index) => {
            const Icon = icons[index];

            return (
              <article className="card about-card" key={item.title}>
                <Icon aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
