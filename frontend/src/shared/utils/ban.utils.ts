import { IAdminUser, IUser } from '@/entities/User'

export const isUserBanned = (user: IAdminUser | IUser): boolean => {
	if (!user.bannedUntil) return false
	return new Date(user.bannedUntil).getTime() > Date.now()
}

export const getBanEndTime = (user: IAdminUser | IUser): number | null => {
	if (!user.bannedUntil) return null
	return new Date(user.bannedUntil).getTime()
}
