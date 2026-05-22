import { INotification } from '../model/types/INotification'

import { NotificationItem } from './NotificationItem'

export const NotificationsList = ({
	notifications
}: {
	notifications: INotification[]
}) => {
	return (
		<div className='flex flex-col gap-2 max-h-[360px] overflow-y-auto pr-1'>
			{notifications.map(notification => (
				<NotificationItem key={notification.id} {...notification} />
			))}
		</div>
	)
}
