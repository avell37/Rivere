import {
	IReport,
	ReportStatus,
	ReportsResponse
} from '@/features/reports/model/types/ReportTypes'

export type { IReport, ReportStatus, ReportsResponse }

export interface AdminReportsFilters {
	page: number
	status?: ReportStatus | 'all'
}
