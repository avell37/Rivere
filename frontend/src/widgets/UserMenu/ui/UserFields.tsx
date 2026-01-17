import { LogOut, Settings } from 'lucide-react'

import { PUBLIC_URL } from '@/shared/libs'

export const userMenuFields = (t: (key: string) => string) => [
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
