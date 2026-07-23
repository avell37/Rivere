import { AdminReportsFilters, ReportStatus } from '../types/AdminReportTypes'

export const parseFilters = (
	searchParams: URLSearchParams
): AdminReportsFilters => {
	const status = searchParams.get('status')

	return {
		page: Number(searchParams.get('page')) || 1,
		status:
			status === 'OPEN' || status === 'RESOLVED' || status === 'DISMISSED'
				? (status as ReportStatus)
				: 'all'
	}
}
