import { BellPlus, CircleStar } from 'lucide-react'

import { PRIVATE_URL } from '@/shared/libs/constants/url.config'

export const CreatorSidebarFields = (t: (key: string) => string) => [
	{
		title: t('creator.achievements.heading'),
		url: PRIVATE_URL.achievements(),
		icon: CircleStar
	},
	{
		title: t('creator.notifications.heading'),
		url: PRIVATE_URL.notifications(),
		icon: BellPlus
	}
]
