import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { Statistics } from '@/widgets'

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('statistics')

	return {
		title: t('heading')
	}
}

export default function StatisticsPage() {
	return <Statistics />
}
