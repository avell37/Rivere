import { INotification } from '../model/types/INotification'

import { NotificationItem } from './NotificationItem'

export const NotificationsList = ({
	notifications,
	onMarkRead
}: {
	notifications: INotification[]
	onMarkRead?: (id: string) => void
}) => {
	return (
		<div className='flex flex-col gap-2 max-h-[360px] overflow-y-auto pr-1'>
			{notifications.map(notification => (
				<NotificationItem
					key={notification.id}
					{...notification}
					onMarkRead={onMarkRead}
				/>
			))}
		</div>
	)
}
