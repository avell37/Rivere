import { AlertTriangle, Link2, Shield, User } from 'lucide-react'

import { SettingsSidebarItem, SettingsTab } from '../types/SettingsProps'

export const getSettingsSidebarItems = (
	t: (key: string) => string
): SettingsSidebarItem[] => [
	{
		icon: <User className='size-5 shrink-0' />,
		label: t('sidebar.profile'),
		value: 'profile'
	},
	{
		icon: <Shield className='size-5 shrink-0' />,
		label: t('sidebar.security'),
		value: 'security'
	},
	{
		icon: <Link2 className='size-5 shrink-0' />,
		label: t('sidebar.connections'),
		value: 'connections'
	},
	{
		icon: <AlertTriangle className='size-5 shrink-0' />,
		label: t('sidebar.danger'),
		value: 'danger'
	}
]

export type { SettingsTab }
