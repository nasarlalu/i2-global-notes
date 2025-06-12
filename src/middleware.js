import { NextResponse } from 'next/server';

export function middleware(request) {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;

    // Skip API routes and static files
    if (pathname.startsWith('/api') ||
        pathname.startsWith('/_next') ||
        pathname.includes('.')) {
        return NextResponse.next();
    }


    const publicRoutes = ['/authentication/sign-in', '/authentication/sign-up'];

    if (token && publicRoutes.includes(pathname)) {
        if (pathname !== '/notes') {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    if (!token && pathname.startsWith('/notes')) {
        console.log('No token found, redirecting to /authentication/sign-in');
        return NextResponse.redirect(new URL('/authentication/sign-in', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/',
        '/authentication/sign-in',
        '/authentication/sign-up',
        '/notes/:path*',
    ],
};