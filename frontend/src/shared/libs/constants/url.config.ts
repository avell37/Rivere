export const APP_URL = process.env.NEXT_PUBLIC_APP_URL as string

export const PUBLIC_URL = {
	root: (url = '') => `${url ? url : ''}`,

	home: () => PUBLIC_URL.root('/'),
	auth: () => PUBLIC_URL.root('/auth'),
	achievements: () => PUBLIC_URL.root('/achievements'),
	dashboard: () => PUBLIC_URL.root('/dashboard'),
	boards: () => PUBLIC_URL.root('/boards'),
	profile: () => PUBLIC_URL.root('/profile'),
	userSettings: () => PUBLIC_URL.root('/profile/settings')
}

export const PRIVATE_URL = {
	root: (url = '') => `${url ? url : ''}`,
	createAchievement: () => PRIVATE_URL.root('/creator/create-achievement'),
	createNotification: () => PRIVATE_URL.root('/creator/create-notification')
}
