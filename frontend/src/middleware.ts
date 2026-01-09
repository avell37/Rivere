import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
	const session = req.cookies.get('session')?.value
	const pathname = req.nextUrl.pathname

	const isCreatorPanel = pathname.startsWith('/creator')

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

	if (isCreatorPanel) {
		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/account`,
				{
					headers: { cookie: req.headers.get('cookie') || '' }
				}
			)

			if (!res.ok) {
				return NextResponse.redirect(new URL('/boards', req.url))
			}

			const user = await res.json()
			const allowedRoles = ['CREATOR', 'ADMIN']

			if (!allowedRoles.includes(user.role)) {
				return NextResponse.redirect(new URL('/boards', req.url))
			}
		} catch (err) {
			return NextResponse.redirect(new URL('/', req.url))
		}
	}

	return NextResponse.next()
}

export const config = {
	matcher: [
		'/auth/:path*',
		'/statistics/:path*',
		'/boards/:path*',
		'/creator/:path*'
	]
}
