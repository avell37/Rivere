'use client'
import { Bell } from 'lucide-react'

import { useNotificationsActions } from '../model/hooks/useNotificationsActions'

export const NotificationBell = () => {
	const { notifications } = useNotificationsActions()
	const unreadCount = notifications.filter(not => !not.read).length

	return (
		<div className='relative p-2 rounded hover:bg-muted transition'>
			<Bell />
			{unreadCount > 0 && (
				<span
					className='absolute top-0 right-0 min-w-4 h-4 px-1 text-xs flex 
				items-center justify-center rounded-full bg-red-500 text-white'
				>
					{unreadCount}
				</span>
			)}
		</div>
	)
}
