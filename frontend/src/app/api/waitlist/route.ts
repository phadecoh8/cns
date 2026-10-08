import {
  NextRequest, NextResponse 
} from 'next/server';

export async function POST(request: NextRequest) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    return NextResponse.json(
      { message: 'Waitlist registration is unavailable.' },
      { status: 503 },
    );
  }

  const response = await fetch(new URL('/api/v1/waitlist', apiUrl), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: await request.text(),
    cache: 'no-store',
  });
  const body = await response.json();

  return NextResponse.json(body, { status: response.status });
}
