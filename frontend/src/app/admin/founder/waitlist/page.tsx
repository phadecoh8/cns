import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { WaitlistTable } from '@/components/landing/waitlist-table';

type PageProps = {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
};

type WaitlistResponse = {
  entries: Array<{
    id: number;
    name: string;
    school: string;
    faculty: string;
    department: string;
    level: string;
    email: string;
    createdAt: string;
  }>;
  total: number;
  page: number;
  pageSize: number;
};

export default async function FounderWaitlistPage({searchParams,}: PageProps) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const query = await searchParams;
  const page = Math.max(1, Number(query.page ?? 1) || 1);
  const search = query.search?.slice(0, 180) ?? '';

  if (!apiUrl) {
    redirect('/admin/founder');
  }

  const cookieStore = await cookies();
  const cookie = cookieStore.toString();
  const url = new URL('/api/v1/admin/waitlist', apiUrl);
  url.searchParams.set('page', String(page));
  url.searchParams.set('pageSize', '25');
  url.searchParams.set('search', search);
  const response = await fetch(url, {
    headers: { Cookie: cookie },
    cache: 'no-store',
  });

  if (response.status === 401) {
    redirect('/admin/founder');
  }

  if (!response.ok) {
    return (
      <main className="admin-page container">
        <h1>Waitlist is unavailable</h1>
        <p>Check the backend and waitlist database configuration.</p>
      </main>
    );
  }

  const result = await response.json() as WaitlistResponse;

  return (
    <main className="admin-page container">
      <div className="admin-heading">
        <div>
          <p className="eyebrow">Founder dashboard</p>
          <h1>Waitlist entries</h1>
        </div>
        <form action="/api/founder/logout" method="post">
          <button className="button-primary" type="submit">Sign out</button>
        </form>
      </div>
      <WaitlistTable
        entries={result.entries}
        page={result.page}
        pageSize={result.pageSize}
        search={search}
        total={result.total}
      />
    </main>
  );
}
