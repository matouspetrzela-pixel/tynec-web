import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const LAUNCHED = process.env.NEXT_PUBLIC_SITE_LAUNCHED === 'true';
/** V lokálním `next dev` je vše dostupné; na Vercelu zůstává uzamčení dokud nespuštíš launch */
const PHASE_LOCK_SKIP = process.env.NODE_ENV === 'development';

/**
 * Phase 1.5 — sekce, které jsou odemčené i když `NEXT_PUBLIC_SITE_LAUNCHED=false`.
 * Vše ostatní (Program, Kandidáti, Podpořte nás, …) zůstává redirectované na `/`.
 */
const PHASE_15_UNLOCKED = ['/o-nas', '/aktuality'];

const isUnlockedPath = (pathname: string) =>
  pathname === '/' ||
  PHASE_15_UNLOCKED.some(
    (base) => pathname === base || pathname.startsWith(`${base}/`),
  );

export function middleware(request: NextRequest) {
  if (
    !LAUNCHED &&
    !PHASE_LOCK_SKIP &&
    !isUnlockedPath(request.nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|images|favicon|robots|sitemap).*)'],
};
