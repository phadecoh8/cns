import { FounderLoginForm } from '@/components/landing/founder-login-form';

export default function FounderLoginPage() {
  return (
    <main className="admin-page container">
      <section className="admin-card card">
        <p className="eyebrow">CNS administration</p>
        <h1>Founder sign in</h1>
        <FounderLoginForm />
      </section>
    </main>
  );
}
