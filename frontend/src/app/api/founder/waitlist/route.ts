import {
  NextRequest, NextResponse 
} from 'next/server';

export async function GET(request: NextRequest) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    return NextResponse.json({ message: 'Unavailable.' }, { status: 503 });
  }

  const target = new URL('/api/v1/admin/waitlist', apiUrl);
  target.search = request.nextUrl.search;
  const response = await fetch(target, {
    headers: { Cookie: request.headers.get('cookie') ?? '' },
    cache: 'no-store',
  });

  return NextResponse.json(await response.json(), {status: response.status,});
}
