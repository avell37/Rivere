import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const ADMIN_ROLES = new Set(['ADMIN', 'CREATOR'])

export async function middleware(req: NextRequest) {
	const session = req.cookies.get('session')?.value
	const pathname = req.nextUrl.pathname

	const isPublicRoute =
		pathname === '/' ||
		pathname.startsWith('/auth') ||
		pathname.startsWith('/privacy') ||
		pathname.startsWith('/terms')

	if (pathname.startsWith('/admin')) {
		if (!session) {
			return NextResponse.redirect(new URL('/auth/login', req.url))
		}

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/account`,
				{
					headers: {
						cookie: req.headers.get('cookie') ?? ''
					},
					cache: 'no-store'
				}
			)

			if (!response.ok) {
				return NextResponse.redirect(new URL('/auth/login', req.url))
			}

			const user = (await response.json()) as { role?: string }

			if (!user.role || !ADMIN_ROLES.has(user.role)) {
				return NextResponse.redirect(new URL('/boards', req.url))
			}

			if (
				pathname.startsWith('/admin/audit') &&
				user.role !== 'CREATOR'
			) {
				return NextResponse.redirect(new URL('/admin', req.url))
			}
		} catch {
			return NextResponse.redirect(new URL('/auth/login', req.url))
		}

		return NextResponse.next()
	}

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
		'/admin/:path*',
		'/privacy',
		'/terms'
	]
}
