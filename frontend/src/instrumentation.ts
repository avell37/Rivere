import * as Sentry from '@sentry/nextjs'

export async function register() {
	if (
		process.env.NEXT_RUNTIME === 'nodejs' ||
		process.env.NEXT_RUNTIME === 'edge'
	) {
		await import('@/shared/libs/sentry/init-server')
	}
}

export const onRequestError = Sentry.captureRequestError
