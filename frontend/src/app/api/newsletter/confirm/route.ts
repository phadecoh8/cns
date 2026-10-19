import {
  NextRequest, NextResponse 
} from 'next/server';

export async function GET(request: NextRequest) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    return NextResponse.json({ status: 'unavailable' }, { status: 503 });
  }

  const target = new URL('/api/v1/newsletter/confirm', apiUrl);
  target.search = request.nextUrl.search;
  const response = await fetch(target, { cache: 'no-store' });

  return NextResponse.json(await response.json(), {status: response.status,});
}
