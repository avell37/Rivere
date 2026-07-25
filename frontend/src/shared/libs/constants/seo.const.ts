import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export const SITE_NAME = 'Rivere'
export const SITE_DESCRIPTION =
	'A small app, where you can organize projects, create boards, track tasks, and collaborate with your team in one place.'

export const NO_INDEX_PAGE = { robots: { index: false, follow: false } }

export async function createPageMetadata(
	namespace: string,
	options?: { titleKey?: string; noIndex?: boolean }
): Promise<Metadata> {
	const t = await getTranslations(namespace)

	return {
		title: t(options?.titleKey ?? 'heading'),
		...(options?.noIndex ? NO_INDEX_PAGE : {})
	}
}

export const createAdminPageMetadata = (namespace: string) =>
	createPageMetadata(namespace, { noIndex: true })

export const createPrivatePageMetadata = (namespace: string) =>
	createPageMetadata(namespace, { noIndex: true })
