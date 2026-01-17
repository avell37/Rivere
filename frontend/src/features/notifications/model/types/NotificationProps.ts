import { INotification } from './INotification'

export interface NotificationItemProps {
	message: string
	read: boolean
	createdAt: string
}

export interface NotificationListProps {
	notifications: INotification[]
}
