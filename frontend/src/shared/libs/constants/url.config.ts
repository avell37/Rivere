export const APP_URL = process.env.NEXT_PUBLIC_APP_URL as string

export const PUBLIC_URL = {
	root: (url = '') => `${url ? url : ''}`,

	home: () => PUBLIC_URL.root('/'),
	auth: () => PUBLIC_URL.root('/auth'),
	achievements: () => PUBLIC_URL.root('/achievements'),
	statistics: () => PUBLIC_URL.root('/statistics'),
	boards: () => PUBLIC_URL.root('/boards'),
	profile: () => PUBLIC_URL.root('/profile'),
	userSettings: () => PUBLIC_URL.root('/profile/settings')
}

export const PRIVATE_URL = {
	root: (url = '') => `${url ? url : ''}`,
	achievements: () => PRIVATE_URL.root('/creator/achievements'),
	notifications: () => PRIVATE_URL.root('/creator/notifications')
}
