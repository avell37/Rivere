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
	adminUsers: (page: number, options?: {
		search?: string
		role?: string
		status?: string
		limit?: number
	}) => {
		const params = new URLSearchParams()
		params.set('page', String(page))
		params.set('limit', String(options?.limit ?? 10))
		if (options?.search) params.set('search', options.search)
		if (options?.role) params.set('role', options.role)
		if (options?.status) params.set('status', options.status)
		return ADMIN_URL.root(`${ADMIN_URL.admin()}/users?${params.toString()}`)
	}
}
