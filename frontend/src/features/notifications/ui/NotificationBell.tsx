import { Bell } from 'lucide-react'

import { Button } from '@/shared/ui/external'

import { useNotificationsStore } from '../model/store/useNotificationsStore'

export const NotificationBell = () => {
	const notifications = useNotificationsStore(state => state.notifications)

	const hasUnread = notifications.some(not => !not.read)

	return (
		<div className='relative p-2 rounded hover:bg-muted transition'>
			<Bell />
			{hasUnread && (
				<span className='absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500' />
			)}
		</div>
	)
}
