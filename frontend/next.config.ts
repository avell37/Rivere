import type { NextConfig } from 'next'
import { withSentryConfig } from '@sentry/nextjs'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
	async rewrites() {
		if (process.env.NODE_ENV === 'development') {
			return [
				{
					source: '/api/:path*',
					destination: 'http://localhost:5000/api/:path*'
				}
			]
		}

		return []
	},
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '5000',
				pathname: '/uploads/**'
			},
			{
				protocol: 'https',
				hostname: 'cdn.rivere.ru',
				pathname: '/**'
			},
			{
				protocol: 'http',
				hostname: 'cdn.rivere.ru',
				pathname: '/**'
			}
		]
	}
}

const withNextIntl = createNextIntlPlugin('./src/shared/libs/i18n/request.ts')

export default withSentryConfig(withNextIntl(nextConfig), {
	org: 'rivere',
	project: 'javascript-nextjs',
	authToken: process.env.SENTRY_AUTH_TOKEN,
	release: process.env.SENTRY_RELEASE
		? { name: process.env.SENTRY_RELEASE }
		: undefined,
	silent: !process.env.CI,
	widenClientFileUpload: true,
	tunnelRoute: '/sentry-tunnel'
})
