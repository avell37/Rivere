import { LogOut, Settings, User } from 'lucide-react'

import { PUBLIC_URL } from '@/shared/libs/constants/url.config'

export const userMenuFields = (t: (key: string) => string) => [
	{
		id: 'profile',
		title: t('dropdownUserMenu.profile'),
		url: PUBLIC_URL.dashboard(),
		icon: User
	},
	// {
	//     title: "Действия",
	//     url: PUBLIC_URL.boards(),
	//     icon: SquareKanban
	// },
	// {
	//     title: "Карточки",
	//     url: PUBLIC_URL.boards(),
	//     icon: SquareKanban
	// },
	{
		id: 'settings',
		title: t('dropdownUserMenu.settings'),
		url: PUBLIC_URL.userSettings(),
		icon: Settings
	},
	{
		id: 'logout',
		title: t('dropdownUserMenu.logout'),
		url: PUBLIC_URL.boards(),
		icon: LogOut
	}
]
