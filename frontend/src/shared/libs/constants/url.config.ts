export const APP_URL = process.env.NEXT_PUBLIC_APP_URL as string

export const PUBLIC_URL = {
	root: (url = '') => `${url ? url : ''}`,

	home: () => PUBLIC_URL.root('/'),
	login: () => PUBLIC_URL.root('/auth/login'),
	register: () => PUBLIC_URL.root('/auth/register'),
	verifyEmail: () => PUBLIC_URL.root('/auth/verify-email'),
	recoveryPassword: () => PUBLIC_URL.root('/auth/recovery-password'),
	banned: () => PUBLIC_URL.root('/banned'),

	achievements: () => PUBLIC_URL.root('/achievements'),
	statistics: () => PUBLIC_URL.root('/statistics'),
	boards: () => PUBLIC_URL.root('/boards'),
	profile: () => PUBLIC_URL.root('/profile'),
	userSettings: () => PUBLIC_URL.root('/profile/settings')
}

export const PRIVATE_URL = {
	root: (url = '') => `${url ? url : ''}`,

	admin: () => PRIVATE_URL.root('/admin'),
	adminUsers: (page: number, limit = 10) =>
		PRIVATE_URL.root(
			`${PRIVATE_URL.admin()}/users?page=${page}&limit=${limit}`
		)
}
