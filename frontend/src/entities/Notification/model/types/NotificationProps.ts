import { MESSAGE_KEYS } from '../lib/notificationMessageKeys'

export interface NotificationItemProps {
	id: string
	type: string
	message?: string | null
	messageKey?: string | null
	messageParams?: Record<string, string | number> | null
	read: boolean
	createdAt: string
	entityId?: string
	onMarkRead?: (id: string) => void
}

export type NotificationMessageParams = Record<string, string | number>
export type NotificationMessageKey = (typeof MESSAGE_KEYS)[number]
