import { LogOut, Settings, User } from 'lucide-react'

import { logout } from '@/entities/User/model/api/userApi'

import { PUBLIC_URL } from '@/shared/libs/constants/url.config'

export const userMenuFields = () => [
	{
		id: 'profile',
		title: 'Профиль',
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
		title: 'Настройки',
		url: PUBLIC_URL.userSettings(),
		icon: Settings
	},
	{
		id: 'logout',
		title: 'Выход',
		url: PUBLIC_URL.boards(),
		icon: LogOut
	}
]
