import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { Boards } from '@/widgets'

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('boards')

	return {
		title: t('heading')
	}
}

export default function BoardsPage() {
	return <Boards />
}
