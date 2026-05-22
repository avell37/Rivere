import { IUser } from '@/entities/User'

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
