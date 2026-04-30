import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { Banned } from '@/widgets/Banned/Banned'

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('banned')

	return {
		title: t('heading')
	}
}

export default function BannedPage() {
	return <Banned />
}
