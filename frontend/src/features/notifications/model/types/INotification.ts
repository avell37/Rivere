export interface INotification {
	id: string
	userId: string
	type: string
	message: string
	entityId?: string
	read: boolean
	createdAt: string
	updatedAt: string
}

export interface INotificationActionResponse {
	success: boolean
}
