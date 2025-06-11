import { NextResponse } from 'next/server';

export function middleware(request) {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;

    const publicRoutes = ['/auth/sign-in', '/auth/sign-up'];

    if (token && publicRoutes.includes(pathname)) {
        if (pathname !== '/notes') {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    if (!token && pathname.startsWith('/notes')) {
        console.log('No token found, redirecting to /auth/sign-in');
        return NextResponse.redirect(new URL('/auth/sign-in', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/',
        '/auth/sign-in',
        '/auth/sign-up',
        '/notes/:path*',
    ],
};