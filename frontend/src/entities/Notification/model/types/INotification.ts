export interface INotification {
	id: string
	userId: string
	type: string
	message?: string | null
	messageKey?: string | null
	messageParams?: Record<string, string | number> | null
	entityId?: string
	read: boolean
	createdAt: string
}