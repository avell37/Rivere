import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
	const session = req.cookies.get('session')?.value
	const pathname = req.nextUrl.pathname

	const isPublicRoute =
		pathname.startsWith('/auth') || pathname.startsWith('/privacy')

	if (!session && !isPublicRoute) {
		return NextResponse.redirect(new URL('/auth/login', req.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: [
		'/statistics/:path*',
		'/boards/:path*',
		'/achievements/:path*',
		'/invite/:path*',
		'/profile/:path*',
		'/privacy'
	]
}
