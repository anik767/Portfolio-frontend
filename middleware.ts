import { NextRequest, NextResponse } from 'next/server';

const API_URL = 'http://127.0.0.1:8000';

export async function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith('/admin')) return NextResponse.next();

  try {
    const response = await fetch(`${API_URL}/admin/user`, {
      headers: {
        Cookie: request.headers.get('cookie') || '',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

  } catch (error) {
    console.error('Middleware fetch failed:', error);
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
  runtime: 'nodejs',
};
