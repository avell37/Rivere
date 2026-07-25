import { PaginatedResponse } from '@/shared/types'

export type AdminAuditAction =
	| 'BAN_USER'
	| 'UNBAN_USER'
	| 'ROLE_CHANGE'
	| 'REPORT_RESOLVED'
	| 'REPORT_DISMISSED'
	| 'REPORT_BAN_USER'
	| 'REPORT_DELETE_MESSAGE'
	| 'REPORT_DELETE_CARD'

export interface IAdminAuditAdmin {
	id: string
	username: string
	nickname: string
}

export interface IAdminAuditLog {
	id: string
	action: AdminAuditAction
	targetType: string | null
	targetId: string | null
	metadata: Record<string, unknown> | null
	adminId: string
	admin: IAdminAuditAdmin
	createdAt: string
}

export interface AdminAuditFilters {
	page: number
	action?: AdminAuditAction | 'all'
	limit?: number
}

export type AdminAuditResponse = PaginatedResponse<IAdminAuditLog, 'items'>
