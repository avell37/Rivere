import { Award, LayoutDashboard, SquareKanban } from 'lucide-react'

import { PUBLIC_URL } from '@/shared/libs/constants/url.config'

export const MainSidebarFields = (t: (key: string) => string) => [
	{
		title: t('dashboard.heading'),
		url: PUBLIC_URL.dashboard(),
		icon: LayoutDashboard
	},
	{
		title: t('boards.heading'),
		url: PUBLIC_URL.boards(),
		icon: SquareKanban
	},
	{
		title: t('achievements.heading'),
		url: PUBLIC_URL.achievements(),
		icon: Award
	}
]
