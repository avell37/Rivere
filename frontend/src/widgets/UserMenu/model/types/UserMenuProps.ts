import { IUser } from '@/entities/User'

export interface MenuItem {
	id: string
	title: string
	url: string
	icon: React.ComponentType
}

export interface UserMenuTriggerProps {
	user: IUser
	isMainPage?: boolean
}
