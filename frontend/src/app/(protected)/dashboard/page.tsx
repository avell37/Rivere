import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { Dashboard } from '@/widgets/Dashboard/ui/Dashboard'

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('dashboard')

	return {
		title: t('heading')
	}
}

export default function LoginPage() {
	return <Dashboard />
}
