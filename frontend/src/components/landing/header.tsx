import { Logo } from '@/components/layout/logo';
import { WaitlistTrigger } from './waitlist-trigger';

export function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="#top" aria-label="CNS home">
          <Logo />
        </a>
        <nav aria-label="Main navigation" className="main-nav">
          <a href="#how-it-works">How it works</a>
          <a href="#about">About</a>
          <a href="#faq">FAQ</a>
          <WaitlistTrigger>Join waitlist</WaitlistTrigger>
        </nav>
      </div>
    </header>
  );
}
