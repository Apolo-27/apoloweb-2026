import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// App supported locales
const locales = ['es', 'en'];
const defaultLocale = 'es';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if the path already starts with a locale
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) return;

    // Optional: You can parse the 'accept-language' header here to auto-detect
    // const acceptLang = request.headers.get('accept-language');
    // let locale = defaultLocale;
    // if (acceptLang?.includes('en')) { locale = 'en'; }
    // else if (acceptLang?.includes('es')) { locale = 'es'; }

    const locale = defaultLocale;

    // Redirect to the URL with the locale
    const newUrl = new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url);
    // Preserve search params
    if (request.nextUrl.search) {
        newUrl.search = request.nextUrl.search;
    }
    
    return NextResponse.redirect(newUrl);
}

export const config = {
    // Only run middleware on page requests, ignoring public assets, API routes, and _next internals
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|images|videos|logos|robots.txt|sitemap.xml|rovers|social_media|stem|.*\\..*).*)'
    ],
};
