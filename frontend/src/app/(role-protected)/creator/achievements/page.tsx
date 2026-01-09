import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('creator.achievements')

	return {
		title: t('heading')
	}
}

export default function AchievementsPage() {
	return <div>AchievementPage</div>
}
