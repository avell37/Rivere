import type { MetadataRoute } from 'next'

import {
	SITEMAP_PUBLIC_PATHS,
	SITE_URL
} from '@/shared/libs/constants/seo.const'

export default function sitemap(): MetadataRoute.Sitemap {
	const lastModified = new Date()

	return SITEMAP_PUBLIC_PATHS.map((path) => ({
		url: `${SITE_URL}${path === '/' ? '' : path}`,
		lastModified,
		changeFrequency: path === '/' ? 'weekly' : 'monthly',
		priority: path === '/' ? 1 : 0.3
	}))
}
