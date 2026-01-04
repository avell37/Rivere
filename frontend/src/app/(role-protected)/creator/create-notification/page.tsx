import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('creator.create.notifications')

	return {
		title: t('heading')
	}
}

export default function CreateNotificationPage() {
	return <div>NotificationPage</div>
}
