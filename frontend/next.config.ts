import type { NextConfig } from 'next'
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

export default withNextIntl(nextConfig)
