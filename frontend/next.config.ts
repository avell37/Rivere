import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
	images: {
		domains: ['res.cloudinary.com']
	}
}

const withNextIntl = createNextIntlPlugin('./src/shared/libs/i18n/request.ts')

export default withNextIntl(nextConfig)
