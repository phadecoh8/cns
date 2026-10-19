import {
  NextRequest, NextResponse 
} from 'next/server';

export async function POST(request: NextRequest) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    return NextResponse.json(
      { message: 'Newsletter subscriptions are unavailable.' },
      { status: 503 },
    );
  }

  const response = await fetch(new URL('/api/v1/newsletter', apiUrl), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: await request.text(),
    cache: 'no-store',
  });

  return NextResponse.json(await response.json(), {status: response.status,});
}
