import { BellPlus, CircleStar } from 'lucide-react'

import { PRIVATE_URL } from '@/shared/libs/constants/url.config'

export const CreatorSidebarFields = (t: (key: string) => string) => [
	{
		title: t('creator.create.achievements.heading'),
		url: PRIVATE_URL.createAchievement(),
		icon: CircleStar
	},
	{
		title: t('creator.create.notifications.heading'),
		url: PRIVATE_URL.createNotification(),
		icon: BellPlus
	}
]
