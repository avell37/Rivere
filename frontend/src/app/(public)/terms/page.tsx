import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { Terms } from '@/widgets/Terms/ui/Terms'
import { MainHeader } from '@/widgets'

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('terms')

	return {
		title: t('heading')
	}
}

export default function TermsPage() {
	return (
		<div>
			<MainHeader />
			<Terms />
		</div>
	)
}
