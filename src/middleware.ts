import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const LANGS = ['lv', 'en', 'lt', 'ee']
const DEFAULT_LANG = 'lv'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip API routes and static files
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // If already on a lang route, proceed
  const firstSegment = pathname.split('/')[1]
  if (LANGS.includes(firstSegment)) {
    return NextResponse.next()
  }

  // Redirect root and unknown paths to default language
  return NextResponse.redirect(new URL(`/${DEFAULT_LANG}${pathname === '/' ? '' : pathname}`, request.url))
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
