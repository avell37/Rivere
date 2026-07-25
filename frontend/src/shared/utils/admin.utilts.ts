import { AdminAuditAction } from '@/features/admin'

export const AUDIT_ACTIONS: Array<AdminAuditAction | 'all'> = [
	'all',
	'BAN_USER',
	'UNBAN_USER',
	'ROLE_CHANGE',
	'REPORT_RESOLVED',
	'REPORT_DISMISSED',
	'REPORT_BAN_USER',
	'REPORT_DELETE_MESSAGE',
	'REPORT_DELETE_CARD'
]
