import type { MetadataRoute } from 'next'

import {
	CRAWLER_DISALLOW_PATHS,
	SITE_URL
} from '@/shared/libs/constants/seo.const'

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: [...CRAWLER_DISALLOW_PATHS]
		},
		sitemap: `${SITE_URL}/sitemap.xml`
	}
}
