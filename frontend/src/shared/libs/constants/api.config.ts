export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL as string
export const S3_URL = process.env.NEXT_PUBLIC_S3_URL as string

export const getSocketBaseUrl = (
	env: NodeJS.ProcessEnv = process.env
): string => {
	const apiUrl = env.NEXT_PUBLIC_SERVER_URL ?? ''

	if (env.NEXT_PUBLIC_WS_URL) {
		return env.NEXT_PUBLIC_WS_URL.replace(/\/$/, '')
	}

	if (env.NODE_ENV === 'development' && apiUrl.includes('localhost:3000')) {
		return 'http://localhost:5000/api'
	}

	return apiUrl.replace(/\/$/, '')
}

const socketBaseUrl = getSocketBaseUrl()

export const SOCKET_URL = {
	chat: `${socketBaseUrl}/chat`,
	boards: `${socketBaseUrl}/boards`,
	notifications: `${socketBaseUrl}/notifications`,
	events: `${socketBaseUrl}/events`
} as const

export const API_URL = {
	root: (url = '') => `${url ? url : ''}`,

	achievements: (url = '') => API_URL.root(`/achievements/${url}`),
	auth: (url = '') => API_URL.root(`/account/${url}`),
	passwordRecovery: (url = '') => API_URL.root(`/password-recovery/${url}`),
	account: (url = '') => API_URL.root(`/account/${url}`),
	session: (url = '') => API_URL.root(`/session/${url}`),
	socialAuth: (provider: string) => `${SERVER_URL}/auth/social/${provider}`,
	boards: (url = '') => API_URL.root(`/boards/${url}`),
	boardInvites: (url = '') => API_URL.root(`/boardInvites/${url}`),
	members: (url = '') => API_URL.root(`/members/${url}`),
	columns: (url = '') => API_URL.root(`/columns/${url}`),
	cards: (url = '') => API_URL.root(`/cards/${url}`),
	files: (url = '') => API_URL.root(`/files/${url}`),
	notifications: (url = '') => API_URL.root(`/notifications/${url}`),
	verification: (url = '') => API_URL.root(`/verification/${url}`),
	statistics: (url = '') => API_URL.root(`/statistics/${url}`),

	admin: (url = '') => API_URL.root(`/admin/${url}`),
	reports: (url = '') => API_URL.root(`/reports/${url}`),
	activityLog: (url = '') => API_URL.root(`/activity-log/${url}`)
}
