import { LogOut, Settings, User } from 'lucide-react'

import { PUBLIC_URL } from '@/shared/libs/constants/url.config'

export const userMenuFields = () => [
	{
		id: 1,
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
		id: 2,
		title: 'Настройки',
		url: PUBLIC_URL.userSettings(),
		icon: Settings
	},
	{
		id: 3,
		title: 'Выход',
		url: PUBLIC_URL.boards(),
		icon: LogOut
	}
]
