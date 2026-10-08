type PageProps = {
  searchParams: Promise<{ token?: string }>;
};

export default async function NewsletterUnsubscribePage(
  { searchParams }: PageProps,
) {
  const { token } = await searchParams;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  let message = 'This unsubscribe link is not available.';

  if (token && apiUrl) {
    const url = new URL('/api/v1/newsletter/unsubscribe', apiUrl);
    url.searchParams.set('token', token);

    try {
      const response = await fetch(url, { cache: 'no-store' });
      message = response.ok
        ? 'Your subscription has been removed.'
        : 'This unsubscribe link has expired or is invalid.';
    } catch {
      message = 'Unsubscribe is unavailable right now.';
    }
  }

  return (
    <main className="admin-page container">
      <h1>Newsletter unsubscribe</h1>
      <p>{message}</p>
      <a href="/">Return to CNS</a>
    </main>
  );
}
