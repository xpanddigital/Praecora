import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Auth middleware — protects the dashboard surface only.
 *
 * Default: pages are PUBLIC. The marketing site (/, /pricing, /faq,
 * /how-it-works, /demo, /legal/*) is reachable to anyone.
 *
 * Only paths matching a PROTECTED_PREFIX require an active Supabase
 * session. Unauthenticated users hitting a protected path are bounced
 * to /login (with their original destination preserved as ?next=).
 *
 * Authenticated users hitting /login or /signup are bounced to /dashboard.
 */

const PROTECTED_PREFIXES = [
  '/dashboard',
  '/admin',
  '/analytics',
  '/artists',
  '/enrichment-logs',
  '/inbox',
  '/outreach',
  '/pipeline',
  '/scouts',
  '/scraping',
  '/settings',
  '/templates',
]

function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + '/')
  )
}

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet: { name: string; value: string; options?: any }[]) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh session — required so Server Components can read it
  const { data: { user } } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  // Unauthenticated user trying to access a dashboard route → /login
  if (!user && isProtectedPath(pathname)) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('next', pathname)
    return NextResponse.redirect(url)
  }

  // Authenticated user landing on login/signup → /dashboard
  if (user && (pathname === '/login' || pathname === '/signup')) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
}
