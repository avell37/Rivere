import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { Main } from '@/widgets/Main'

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('home')

	return {
		title: t('heading')
	}
}

export default function MainPage() {
	return <Main />
}
