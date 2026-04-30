import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { Privacy } from '@/widgets/Privacy/Privacy'

import { MainHeader } from '@/widgets'

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('privacy')

	return {
		title: t('heading')
	}
}

export default function PrivacyPage() {
	return (
		<div>
			<MainHeader />
			<Privacy />
		</div>
	)
}
