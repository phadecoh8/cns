import { CryingCat } from '@/components/cats/crying-cat';

export default function NotFound() {
  return (
    <main className="not-found">
      <CryingCat />
      <h1>Page not found</h1>
      <p>The page you are looking for is not available.</p>
      <a href="/">Return to CNS</a>
    </main>
  );
}
