export type ActivityAction =
	| 'CREATED'
	| 'UPDATED'
	| 'DELETED'
	| 'ARCHIVED'
	| 'RESTORED'
	| 'MOVED'
	| 'COMPLETED'
	| 'REOPENED'
	| 'MEMBER_JOINED'
	| 'MEMBER_LEFT'
	| 'MEMBER_ROLE_CHANGED'
	| 'BOARD_UPDATED'

export type ActivityEntity = 'BOARD' | 'COLUMN' | 'CARD' | 'MEMBER'

export interface IActivityLogUser {
	id: string
	nickname: string
	username: string
	avatar: string | null
}

export interface IActivityLog {
	id: string
	action: ActivityAction
	entityType: ActivityEntity
	entityId: string | null
	entityTitle: string | null
	meta: Record<string, unknown> | null
	boardId: string
	userId: string
	user: IActivityLogUser
	createdAt: string
}

export interface IActivityLogResponse {
	items: IActivityLog[]
	total: number
}

export const ACTIVITY_LOG_PAGE_SIZE = 20
