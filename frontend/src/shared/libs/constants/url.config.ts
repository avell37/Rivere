import { buildQueryString } from '@/shared/utils/query.utils'

export const APP_URL = process.env.NEXT_PUBLIC_APP_URL as string

export const PUBLIC_URL = {
	root: (url = '') => `${url ? url : ''}`,

	home: () => PUBLIC_URL.root('/'),
	login: () => PUBLIC_URL.root('/auth/login'),
	register: () => PUBLIC_URL.root('/auth/register'),
	verifyEmail: () => PUBLIC_URL.root('/auth/verify-email'),
	recoveryPassword: () => PUBLIC_URL.root('/auth/recovery-password'),
	banned: () => PUBLIC_URL.root('/banned'),
	privacy: () => PUBLIC_URL.root('/privacy'),
	terms: () => PUBLIC_URL.root('/terms')
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
	adminUsers: (options: {
		page: number
		limit?: number
		search?: string
		role?: string
		status?: string
	}) => {
		const query = buildQueryString({
			page: options.page,
			limit: options.limit ?? 10,
			search: options.search?.trim(),
			role: options.role,
			status: options.status
		})

		return ADMIN_URL.root(`${ADMIN_URL.admin()}/users?${query}`)
	},
	adminReports: (page = 1, status?: string) => {
		const query = buildQueryString({
			page,
			status
		})

		return ADMIN_URL.root(`${ADMIN_URL.admin()}/reports?${query}`)
	},
	adminAudit: (page = 1, action?: string) => {
		const query = buildQueryString({
			page,
			action
		})

		return ADMIN_URL.root(`${ADMIN_URL.admin()}/audit?${query}`)
	}
}
