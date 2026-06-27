import { NotepadText, Users } from 'lucide-react'

import { BoardSidebarItem } from '../types/BoardProps'

export type SettingsTab = 'members' | 'activity'

export const getSidebarItems = (
	t: (key: string) => string
): BoardSidebarItem[] => [
	{
		icon: <Users />,
		label: t('board.settings.sidebar.members'),
		value: 'members'
	},
	{
		icon: <NotepadText />,
		label: t('board.settings.sidebar.activity'),
		value: 'activity'
	}
]
