import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('creator.notifications')

	return {
		title: t('heading')
	}
}

export default function NotificationsPage() {
	return <div>NotificationPage</div>
}
