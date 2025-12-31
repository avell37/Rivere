import { Notification } from '../model/store/useNotificationsStore'

import { NotificationItem } from './NotificationItem'

interface NotificationListProps {
	notifications: Notification[]
}

export const NotificationsList = ({ notifications }: NotificationListProps) => {
	return (
		<div className='relative flex flex-col gap-4 z-100 p-2 max-h-[400px] overflow-y-auto'>
			{notifications.map(notification => (
				<NotificationItem key={notification.id} {...notification} />
			))}
		</div>
	)
}
