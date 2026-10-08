type PageProps = {
  searchParams: Promise<{ token?: string }>;
};

export default async function NewsletterConfirmPage(
  { searchParams }: PageProps,
) {
  const { token } = await searchParams;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  let message = 'This confirmation link is not available.';

  if (token && apiUrl) {
    const url = new URL('/api/v1/newsletter/confirm', apiUrl);
    url.searchParams.set('token', token);

    try {
      const response = await fetch(url, { cache: 'no-store' });
      message = response.ok
        ? 'Your email subscription is confirmed.'
        : 'This confirmation link has expired or is invalid.';
    } catch {
      message = 'Subscription confirmation is unavailable right now.';
    }
  }

  return (
    <main className="admin-page container">
      <h1>Newsletter confirmation</h1>
      <p>{message}</p>
      <a href="/">Return to CNS</a>
    </main>
  );
}
