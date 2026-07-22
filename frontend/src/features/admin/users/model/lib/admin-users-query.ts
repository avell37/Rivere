import { AdminUsersFilters } from '@/features/admin/users/model/types/AdminUserTypes'

export const buildAdminUsersQuery = (filters: AdminUsersFilters) => {
	const params = new URLSearchParams()
	params.set('page', String(filters.page))

	if (filters.search?.trim()) {
		params.set('search', filters.search.trim())
	}

	if (filters.role && filters.role !== 'all') {
		params.set('role', filters.role)
	}

	if (filters.status && filters.status !== 'all') {
		params.set('status', filters.status)
	}

	return params.toString()
}

export const parseAdminUsersFilters = (
	searchParams: URLSearchParams
): AdminUsersFilters => {
	const role = searchParams.get('role')
	const status = searchParams.get('status')

	return {
		page: Number(searchParams.get('page')) || 1,
		search: searchParams.get('search') || undefined,
		role:
			role === 'USER' || role === 'ADMIN' || role === 'CREATOR'
				? role
				: 'all',
		status: status === 'banned' ? 'banned' : 'all'
	}
}
