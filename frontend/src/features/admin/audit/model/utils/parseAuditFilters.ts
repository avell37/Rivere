import { parsePageParam } from '../../../model/lib/admin-query.utils'
import { AdminAuditFilters } from '../types/AdminAuditTypes'

export const parseAuditFilters = (
	searchParams: URLSearchParams
): AdminAuditFilters => {
	const action = searchParams.get('action')

	return {
		page: parsePageParam(searchParams),
		action:
			action && action !== 'all'
				? (action as AdminAuditFilters['action'])
				: 'all'
	}
}
