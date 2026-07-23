import { authAxios } from '@/shared/api/interceptors'
import { API_URL } from '@/shared/libs'

import {
	AdminReportsFilters,
	IReport,
	ReportsResponse
} from '../types/AdminReportTypes'
import { ResolveReportPayload } from '../validation/resolve-report.z.validation'

export const getAdminReports = async (
	filters: AdminReportsFilters
): Promise<ReportsResponse> => {
	const response = await authAxios.get(`${API_URL.admin()}reports`, {
		params: {
			page: filters.page,
			limit: 10,
			...(filters.status && filters.status !== 'all'
				? { status: filters.status }
				: {})
		}
	})
	return response.data
}

export const resolveAdminReport = async (
	reportId: string,
	data: ResolveReportPayload
): Promise<IReport> => {
	const response = await authAxios.patch(
		`${API_URL.admin()}reports/${reportId}`,
		data
	)
	return response.data
}
