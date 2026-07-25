'use client'

import { createAdminListQuery } from '../../../model/hooks/createAdminListQuery'
import { getAdminAuditLogs } from '../api/admin-audit.api'
import { AdminAuditFilters, AdminAuditResponse } from '../types/AdminAuditTypes'

export const adminAuditKeys = {
	page: (filters: AdminAuditFilters) =>
		['admin-audit', filters.page, filters.action ?? 'all'] as const
}

export const useGetAdminAuditLogs = createAdminListQuery<
	AdminAuditResponse,
	AdminAuditFilters
>({
	queryKey: adminAuditKeys.page,
	queryFn: getAdminAuditLogs
})
