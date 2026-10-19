import {
  Facebook,
  Github,
  Instagram,
  Twitter,
} from 'lucide-react';
import { Logo } from '@/components/layout/logo';
import { landingCopy } from '@/content/landing-copy';

const socials = [
  {
    label: 'Instagram',
    url: process.env.INSTAGRAM_URL,
    Icon: Instagram,
  },
  {
    label: 'X',
    url: process.env.X_URL,
    Icon: Twitter,
  },
  {
    label: 'Facebook',
    url: process.env.FACEBOOK_URL,
    Icon: Facebook,
  },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <a href="#top" aria-label="CNS home"><Logo /></a>
            <p>{landingCopy.footer}</p>
          </div>
          <nav aria-label="Product links">
            <h2>Product</h2>
            <a href="#how-it-works">How it works</a>
            <a href="#about">About CNS</a>
            <a href="#faq">FAQs</a>
          </nav>
          <nav aria-label="Legal links">
            <h2>Legal</h2>
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-of-service">Terms of Service</a>
            <a href="/feedback">Feedback</a>
          </nav>
          <div className="social-links" aria-label="Social media">
            {socials.map(({
              label, url, Icon 
            }) => {
              if (!url) {
                return null;
              }

              return (
                <a href={url} key={label} aria-label={label}>
                  <Icon aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            Copyright {new Date().getFullYear()} and all rights reserved
          </span>
          <span>Fadero Joshua (phadecoh)</span>
          <div>
            <a href="https://github.com/phadecoh8">
              <Github aria-hidden="true" /> GitHub
            </a>
            <a href="https://phadecoh.vercel.app">Portfolio</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
