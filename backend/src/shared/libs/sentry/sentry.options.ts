export function getSentryOptions() {
    const dsn = process.env.SENTRY_DSN;

    return {
        dsn,
        enabled: Boolean(dsn),
        environment: process.env.NODE_ENV,
        release: process.env.SENTRY_RELEASE,
        tracesSampleRate: process.env.NODE_ENV === 'development' ? 1.0 : 0.1,
    };
}
