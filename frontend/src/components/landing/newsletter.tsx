import { NewsletterForm } from './newsletter-form';

export function Newsletter() {
  const enabled =
    Boolean(process.env.NEXT_PUBLIC_API_URL)
    && process.env.NEWSLETTER_ENABLED === 'true';

  return (
    <section className="newsletter-section" aria-labelledby="newsletter-title">
      <div className="container newsletter-layout">
        <div>
          <p className="eyebrow">Stay in the loop</p>
          <h2 id="newsletter-title">
            Campus navigation is about to get easier.
          </h2>
        </div>
        <NewsletterForm enabled={enabled} />
      </div>
    </section>
  );
}
