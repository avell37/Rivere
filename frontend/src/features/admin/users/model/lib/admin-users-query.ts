import { ADMIN_URL } from '@/shared/libs'
import { parsePageParam } from '@/shared/utils'

import { AdminUsersFilters } from '@/features/admin/users/model/types/AdminUserTypes'

export const toAdminUsersUrl = (filters: AdminUsersFilters) =>
	ADMIN_URL.adminUsers({
		page: filters.page,
		search: filters.search,
		role: filters.role,
		status: filters.status
	})

export const parseAdminUsersFilters = (
	searchParams: URLSearchParams
): AdminUsersFilters => {
	const role = searchParams.get('role')
	const status = searchParams.get('status')

	return {
		page: parsePageParam(searchParams),
		search: searchParams.get('search') || undefined,
		role:
			role === 'USER' || role === 'ADMIN' || role === 'CREATOR'
				? role
				: 'all',
		status: status === 'banned' ? 'banned' : 'all'
	}
}
