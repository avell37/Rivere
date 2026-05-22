import { LogOut, Settings } from 'lucide-react'

import { PRIVATE_URL } from '@/shared/libs'

export const userMenuFields = (t: (key: string) => string) => [
	{
		id: 'settings',
		title: t('dropdownUserMenu.settings'),
		url: PRIVATE_URL.userSettings(),
		icon: Settings
	},
	{
		id: 'logout',
		title: t('dropdownUserMenu.logout'),
		url: PRIVATE_URL.boards(),
		icon: LogOut
	}
]
