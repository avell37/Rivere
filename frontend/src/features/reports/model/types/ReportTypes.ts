export type ReportTargetType = 'MESSAGE' | 'USER' | 'CARD'
export type ReportStatus = 'OPEN' | 'RESOLVED' | 'DISMISSED'
export type ReportResolutionAction = 'NONE' | 'BAN_USER' | 'DELETE_MESSAGE'

export interface CreateReportInput {
	targetType: ReportTargetType
	targetId: string
	reason: string
	details?: string
}

export interface IReportUser {
	id: string
	username: string
	email: string
	role?: string
}

export interface IReport {
	id: string
	targetType: ReportTargetType
	targetId: string
	reason: string
	details: string | null
	snapshot: Record<string, unknown> | null
	status: ReportStatus
	reporter: IReportUser
	reportedUser: IReportUser | null
	resolvedBy: Pick<IReportUser, 'id' | 'username'> | null
	resolvedAt: string | null
	resolutionNote: string | null
	resolutionAction: ReportResolutionAction | null
	createdAt: string
	updatedAt: string
}

export interface ReportsResponse {
	reports: IReport[]
	total: number
	page: number
	totalPages: number
}
