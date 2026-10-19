import {
  NextRequest, NextResponse 
} from 'next/server';

export async function POST(request: NextRequest) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    return NextResponse.json(
      { message: 'Founder sign-in is unavailable.' },
      { status: 503 },
    );
  }

  const response = await fetch(new URL('/api/v1/founder/login', apiUrl), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: await request.text(),
    cache: 'no-store',
  });
  const body = await response.json();
  const result = NextResponse.json(body, { status: response.status });
  const setCookie = response.headers.get('set-cookie');

  if (setCookie) {
    result.headers.set('set-cookie', setCookie);
  }

  return result;
}
