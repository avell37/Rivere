import { Users } from 'lucide-react'

import { BoardSidebarItem } from '../types/BoardProps'

export type SettingsTab = 'members'

export const getSidebarItems = (
	t: (key: string) => string
): BoardSidebarItem[] => [
	{
		icon: <Users />,
		label: t('board.settings.sidebar.members'),
		value: 'members'
	}
]
