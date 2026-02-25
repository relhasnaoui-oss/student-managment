import { auth } from '@/lib/auth';

export const middleware = auth((req) => {
  // Allow login and register pages without authentication
  if (
    req.nextUrl.pathname.startsWith('/login') ||
    req.nextUrl.pathname.startsWith('/api/auth') ||
    req.nextUrl.pathname.startsWith('/api/auth/register') ||
    req.nextUrl.pathname === '/'
  ) {
    return;
  }

  // Require authentication for protected pages
  if (!req.auth) {
    const newUrl = new URL('/login', req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)', '/api/(.*)'],
};
