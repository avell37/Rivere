export const APP_URL = process.env.NEXT_PUBLIC_APP_URL as string

export const PUBLIC_URL = {
	root: (url = '') => `${url ? url : ''}`,

	home: () => PUBLIC_URL.root('/'),
	login: () => PUBLIC_URL.root('/auth/login'),
	register: () => PUBLIC_URL.root('/auth/register'),
	verifyEmail: () => PUBLIC_URL.root('/auth/verify-email'),
	recoveryPassword: () => PUBLIC_URL.root('/auth/recovery-password'),
	banned: () => PUBLIC_URL.root('/banned'),
	privacy: () => PUBLIC_URL.root('/privacy')
}

export const PRIVATE_URL = {
	root: (url = '') => `${url ? url : ''}`,

	achievements: () => PRIVATE_URL.root('/achievements'),
	statistics: () => PRIVATE_URL.root('/statistics'),
	boards: () => PRIVATE_URL.root('/boards'),
	profile: () => PRIVATE_URL.root('/profile'),
	userSettings: () => PRIVATE_URL.root('/profile/settings')
}

export const ADMIN_URL = {
	root: (url = '') => `${url ? url : ''}`,

	admin: () => ADMIN_URL.root('/admin'),
	adminUsers: (page: number, limit = 10) =>
		ADMIN_URL.root(`${ADMIN_URL.admin()}/users?page=${page}&limit=${limit}`)
}
