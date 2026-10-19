import {
  NextRequest, NextResponse 
} from 'next/server';

export async function POST(request: NextRequest) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    return NextResponse.json({ ok: true });
  }

  const response = await fetch(new URL('/api/v1/founder/logout', apiUrl), {
    method: 'POST',
    headers: { Cookie: request.headers.get('cookie') ?? '' },
    cache: 'no-store',
  });
  const body = await response.json();
  const result = NextResponse.json(body, { status: response.status });
  const setCookie = response.headers.get('set-cookie');

  if (setCookie) {
    result.headers.set('set-cookie', setCookie);
  }

  const loginUrl = new URL('/admin/founder', request.url).toString();
  result.headers.set('Location', loginUrl);
  return new NextResponse(null, {
    status: 303,
    headers: result.headers,
  });
}
