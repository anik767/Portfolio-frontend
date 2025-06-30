import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const isAdminPath = request.nextUrl.pathname.startsWith('/admin');
  if (!isAdminPath) return NextResponse.next();

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/user`, {
      headers: {
        Cookie: request.headers.get('cookie') || '',
      },
      credentials: 'include',
      // Use absolute URL (no localhost if Edge Runtime)
      cache: 'no-store',
    });

    // If unauthorized or bad token
    if (!response.ok) {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

  } catch (error) {
    // Handle fetch failure (network, env var, etc.)
    console.error('Middleware fetch failed:', error);

    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
