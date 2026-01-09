import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '5000',
				pathname: '/uploads/**'
			}
		]
	}
}

const withNextIntl = createNextIntlPlugin('./src/shared/libs/i18n/request.ts')

export default withNextIntl(nextConfig)
