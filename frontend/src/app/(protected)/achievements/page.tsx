import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { Achievements } from '@/features/achievements/ui/Achievements'

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('achievements')

	return {
		title: t('heading')
	}
}

export default function AchievementsPage() {
	return <Achievements />
}
