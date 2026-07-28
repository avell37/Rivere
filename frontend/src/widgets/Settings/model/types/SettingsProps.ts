import { IUser } from '@/entities/User'

export type SettingsTab = 'profile' | 'security' | 'connections' | 'danger'

export interface SettingsSidebarItem {
	icon: React.ReactNode
	label: string
	value: SettingsTab
}

export interface UserSettingsAvatarProps {
	user: IUser
	fileInputRef: React.RefObject<HTMLInputElement | null>
	isPending: boolean
	handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	handleChangeAvatarClick: () => void
}

export interface SecurityProps {
	t: (key: string) => string
	user: IUser
}

export interface ConnectionsProps {
	t: (key: string) => string
	user: IUser
}
