import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const isAdminPath = request.nextUrl.pathname.startsWith('/admin');

  if (!isAdminPath) return NextResponse.next();

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/user`, {
    headers: {
      Cookie: request.headers.get('cookie') || '',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
