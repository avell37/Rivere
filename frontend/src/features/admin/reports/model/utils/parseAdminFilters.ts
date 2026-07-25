import {
	parseEnumFilter,
	parsePageParam
} from '../../../model/lib/admin-query.utils'
import { AdminReportsFilters, ReportStatus } from '../types/AdminReportTypes'

const REPORT_STATUSES = ['OPEN', 'RESOLVED', 'DISMISSED'] as const

export const parseFilters = (
	searchParams: URLSearchParams
): AdminReportsFilters => ({
	page: parsePageParam(searchParams),
	status: parseEnumFilter<ReportStatus>(
		searchParams.get('status'),
		REPORT_STATUSES
	)
})
