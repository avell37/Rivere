export function getSentryOptions() {
	const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN

	return {
		dsn,
		enabled: Boolean(dsn),
		environment: process.env.NODE_ENV,
		release: process.env.NEXT_PUBLIC_SENTRY_RELEASE,
		tracesSampleRate: process.env.NODE_ENV === 'development' ? 1.0 : 0.1
	}
}
