import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { UserSettings } from '@/features/settings/user/ui/UserSettings'

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('dashboard')

	return {
		title: t('heading')
	}
}

export default function UserSettingsPage() {
	return <UserSettings />
}
