import { NextRequest, NextResponse } from 'next/server';

// Use hardcoded API URL instead of process.env (middleware can't access env properly)
const API_URL = 'http://127.0.0.1:8000'; // Change to your Laravel backend IP if needed

export async function middleware(request: NextRequest) {
  const isAdminPath = request.nextUrl.pathname.startsWith('/admin');
  if (!isAdminPath) return NextResponse.next();

  try {
    const response = await fetch(`${API_URL}/admin/user`, {
      headers: {
        // Forward cookies to the Laravel backend
        Cookie: request.headers.get('cookie') || '',
      },
      credentials: 'include',
      cache: 'no-store',
    });

    // If token is invalid or user not logged in
    if (!response.ok) {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    // Optionally: You can check user role (e.g., is_admin) from response here
    // const user = await response.json();
    // if (!user.is_admin) return NextResponse.redirect(new URL('/unauthorized', request.url));

  } catch (error) {
    console.error('Middleware fetch failed:', error);
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
  runtime: 'nodejs', // Ensure it uses Node.js instead of Edge Runtime
};
