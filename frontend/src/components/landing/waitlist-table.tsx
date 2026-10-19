import { formatDate } from '@/lib/utils';

type Entry = {
  id: number;
  name: string;
  school: string;
  faculty: string;
  department: string;
  level: string;
  email: string;
  createdAt: string;
};

export function WaitlistTable({
  entries,
  page,
  pageSize,
  search,
  total,
}: {
  entries: Entry[];
  page: number;
  pageSize: number;
  search: string;
  total: number;
}) {
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const previous = new URLSearchParams({
    page: String(Math.max(1, page - 1)),
    search,
  });
  const next = new URLSearchParams({
    page: String(Math.min(pageCount, page + 1)),
    search,
  });

  return (
    <>
      <form action="/admin/founder/waitlist" className="admin-search">
        <label className="visually-hidden" htmlFor="waitlist-search">
          Search entries
        </label>
        <input
          defaultValue={search}
          id="waitlist-search"
          maxLength={180}
          name="search"
          placeholder="Search name, school, faculty or email"
        />
        <button className="button-primary" type="submit">Search</button>
      </form>
      <p>{total} registered entries</p>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>School</th>
              <th>Faculty</th>
              <th>Department</th>
              <th>Level</th>
              <th>Email</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.name}</td>
                <td>{entry.school}</td>
                <td>{entry.faculty}</td>
                <td>{entry.department}</td>
                <td>{entry.level}</td>
                <td>{entry.email}</td>
                <td>{formatDate(entry.createdAt)}</td>
              </tr>
            ))}
            {entries.length === 0 && (
              <tr><td colSpan={7}>No entries found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <nav className="admin-pagination" aria-label="Waitlist pages">
        <a href={`?${previous.toString()}`} aria-disabled={page <= 1}>
          Previous
        </a>
        <span>Page {page} of {pageCount}</span>
        <a href={`?${next.toString()}`} aria-disabled={page >= pageCount}>
          Next
        </a>
      </nav>
    </>
  );
}
