'use client'

import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import {
	getAdminReports
} from '../api/admin-reports.api'
import {
	AdminReportsFilters,
	ReportsResponse
} from '../types/AdminReportTypes'

export const adminReportsKeys = {
	all: () => ['admin-reports'],
	page: (filters: AdminReportsFilters) => [
		'admin-reports',
		filters.page,
		filters.status ?? 'all'
	]
}

export const useGetAdminReports = (filters: AdminReportsFilters) => {
	return useQuery<ReportsResponse, AxiosError>({
		queryKey: adminReportsKeys.page(filters),
		queryFn: () => getAdminReports(filters),
		placeholderData: prev => prev
	})
}
