'use client'

import { createAdminListQuery } from '../../../model/hooks/createAdminListQuery'
import { getAdminReports } from '../api/admin-reports.api'
import { AdminReportsFilters, ReportsResponse } from '../types/AdminReportTypes'

export const adminReportsKeys = {
	all: () => ['admin-reports'] as const,
	page: (filters: AdminReportsFilters) =>
		['admin-reports', filters.page, filters.status ?? 'all'] as const
}

export const useGetAdminReports = createAdminListQuery<
	ReportsResponse,
	AdminReportsFilters
>({
	queryKey: adminReportsKeys.page,
	queryFn: getAdminReports
})
