import { About } from '@/components/landing/about';
// import { Countdown } from '@/components/landing/countdown';
import { Faq } from '@/components/landing/faq';
import { Footer } from '@/components/landing/footer';
import { Header } from '@/components/landing/header';
import { Hero } from '@/components/landing/hero';
import { HowItWorks } from '@/components/landing/how-it-works';
import { MapAnimation } from '@/components/landing/map-animation';
import { Newsletter } from '@/components/landing/newsletter';
import { WaitlistDialog } from '@/components/landing/waitlist-dialog';

export default function LandingPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />
      <main id="main-content">
        <Hero />
        {/* <Countdown /> */}
        <MapAnimation />
        <HowItWorks />
        <About />
        <Faq />
        <Newsletter />
      </main>
      <Footer />
      <WaitlistDialog />
    </>
  );
}
