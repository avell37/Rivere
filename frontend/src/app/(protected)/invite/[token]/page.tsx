import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { InviteView } from '@/features/board-invite'

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('invite')

	return {
		title: t('heading')
	}
}

export default function InvitePage() {
	return <InviteView />
}
