import { authAxios } from '@/shared/api/interceptors'
import { API_URL } from '@/shared/libs'

import {
	AdminAuditFilters,
	AdminAuditResponse
} from '../types/AdminAuditTypes'

export const getAdminAuditLogs = async (
	filters: AdminAuditFilters
): Promise<AdminAuditResponse> => {
	const response = await authAxios.get(`${API_URL.admin()}audit-logs`, {
		params: {
			page: filters.page,
			limit: filters.limit ?? 20,
			...(filters.action && filters.action !== 'all'
				? { action: filters.action }
				: {})
		}
	})

	return response.data
}
