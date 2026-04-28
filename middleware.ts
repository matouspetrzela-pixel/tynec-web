import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const LAUNCHED = process.env.NEXT_PUBLIC_SITE_LAUNCHED === 'true';

export function middleware(request: NextRequest) {
  if (!LAUNCHED && request.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|images|favicon|robots|sitemap).*)'],
};
