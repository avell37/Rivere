import { NotificationListProps } from '../model/types/NotificationProps'

import { NotificationItem } from './NotificationItem'

export const NotificationsList = ({ notifications }: NotificationListProps) => {
	return (
		<div className='flex flex-col gap-2 max-h-[360px] overflow-y-auto pr-1'>
			{notifications.map(notification => (
				<NotificationItem
					key={notification.entityId}
					{...notification}
				/>
			))}
		</div>
	)
}
