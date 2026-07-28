import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export const SITE_NAME = 'Rivere'
export const SITE_DESCRIPTION =
	'A small app, where you can organize projects, create boards, track tasks, and collaborate with your team in one place.'

export const SITE_TAGLINE = 'Kanban boards for teams — organize projects and tasks in one place.'

export const THEME_COLOR = '#0F172A'
export const THEME_COLOR_LIGHT = '#ffffff'

const DEFAULT_SITE_URL = 'https://rivere.ru'

export function getSiteUrl(): string {
	const configured = process.env.NEXT_PUBLIC_APP_URL?.trim()

	if (configured) {
		return configured.replace(/\/$/, '')
	}

	if (process.env.NODE_ENV === 'development') {
		return 'http://localhost:3000'
	}

	return DEFAULT_SITE_URL
}

export const SITE_URL = getSiteUrl()

export const OG_IMAGE = {
	url: '/opengraph-image',
	width: 1200,
	height: 630,
	alt: `${SITE_NAME} — ${SITE_TAGLINE}`
} as const

export const CRAWLER_DISALLOW_PATHS = [
	'/boards/',
	'/profile/',
	'/admin/',
	'/invite/',
	'/achievements/',
	'/statistics/',
	'/auth/',
	'/banned'
] as const

export const SITEMAP_PUBLIC_PATHS = ['/', '/terms', '/privacy'] as const

export const NO_INDEX_PAGE = { robots: { index: false, follow: false } }

export function createOpenGraph(params: {
	title: string
	description: string
	path?: string
}): NonNullable<Metadata['openGraph']> {
	const url = params.path ? `${SITE_URL}${params.path}` : SITE_URL

	return {
		type: 'website',
		url,
		siteName: SITE_NAME,
		title: params.title,
		description: params.description,
		images: [OG_IMAGE]
	}
}

export function createTwitter(params: {
	title: string
	description: string
}): NonNullable<Metadata['twitter']> {
	return {
		card: 'summary_large_image',
		title: params.title,
		description: params.description,
		images: [OG_IMAGE.url]
	}
}

export const SHARED_METADATA: Metadata = {
	metadataBase: new URL(SITE_URL),
	applicationName: SITE_NAME,
	authors: [{ name: SITE_NAME, url: SITE_URL }],
	creator: SITE_NAME,
	description: SITE_DESCRIPTION,
	openGraph: createOpenGraph({
		title: SITE_NAME,
		description: SITE_DESCRIPTION
	}),
	twitter: createTwitter({
		title: SITE_NAME,
		description: SITE_DESCRIPTION
	}),
	icons: {
		icon: [
			{ url: '/icons/favicon.svg', type: 'image/svg+xml' },
			{ url: '/icons/favicon-16.png', sizes: '16x16', type: 'image/png' },
			{ url: '/icons/favicon-32.png', sizes: '32x32', type: 'image/png' },
			{ url: '/icons/favicon.png', sizes: '32x32', type: 'image/png' },
			{
				url: '/icons/favicon-512.png',
				sizes: '512x512',
				type: 'image/png'
			}
		],
		shortcut: '/icons/favicon.png',
		apple: '/icons/favicon-256.png'
	}
}

export async function createPageMetadata(
	namespace: string,
	options?: {
		titleKey?: string
		descriptionKey?: string
		noIndex?: boolean
		path?: string
	}
): Promise<Metadata> {
	const t = await getTranslations(namespace)
	const title = t(options?.titleKey ?? 'heading')
	const description = options?.descriptionKey
		? t(options.descriptionKey)
		: SITE_DESCRIPTION

	return {
		title,
		description,
		...(options?.noIndex ? NO_INDEX_PAGE : {}),
		openGraph: createOpenGraph({ title, description, path: options?.path }),
		twitter: createTwitter({ title, description }),
		...(options?.path
			? { alternates: { canonical: `${SITE_URL}${options.path}` } }
			: {})
	}
}

export const createAdminPageMetadata = (namespace: string) =>
	createPageMetadata(namespace, { noIndex: true })

export const createPrivatePageMetadata = (namespace: string) =>
	createPageMetadata(namespace, { noIndex: true })
