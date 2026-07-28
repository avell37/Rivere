import type { MetadataRoute } from 'next'

import {
	SITE_DESCRIPTION,
	SITE_NAME,
	THEME_COLOR
} from '@/shared/libs/constants/seo.const'

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: SITE_NAME,
		short_name: SITE_NAME,
		description: SITE_DESCRIPTION,
		start_url: '/',
		display: 'standalone',
		background_color: THEME_COLOR,
		theme_color: '#3B82F6',
		icons: [
			{
				src: '/icons/favicon-128.png',
				sizes: '128x128',
				type: 'image/png'
			},
			{
				src: '/icons/favicon-256.png',
				sizes: '256x256',
				type: 'image/png'
			},
			{
				src: '/icons/favicon-512.png',
				sizes: '512x512',
				type: 'image/png',
				purpose: 'maskable'
			}
		]
	}
}
