import { Award, SquareKanban, SquareMenu } from 'lucide-react'

import { PUBLIC_URL } from '@/shared/libs'

export const HeaderNavFields = (t: (key: string) => string) => [
	{
		title: t('boards.heading'),
		url: PUBLIC_URL.boards(),
		icon: SquareKanban
	},
	{
		title: t('statistics.heading'),
		url: PUBLIC_URL.statistics(),
		icon: SquareMenu
	},
	{
		title: t('achievements.heading'),
		url: PUBLIC_URL.achievements(),
		icon: Award
	}
]
