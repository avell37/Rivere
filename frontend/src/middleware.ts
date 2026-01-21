import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
	const session = req.cookies.get('session')?.value
	const pathname = req.nextUrl.pathname

	const authRoutes = ['/auth/login', '/auth/register']

	if (authRoutes.includes(pathname)) {
		if (session) {
			return NextResponse.redirect(new URL('/boards', req.url))
		}
		return NextResponse.next()
	}

	if (!session) {
		return NextResponse.redirect(new URL('/auth/login', req.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: [
		'/auth/:path*',
		'/statistics/:path*',
		'/boards/:path*',
		'/achievements/:path*',
		'/invite/:path*',
		'/profile/:path*'
	]
}
