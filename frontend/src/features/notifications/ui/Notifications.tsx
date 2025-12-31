import { Button } from '@/shared/ui/external'

import { useNotificationsActions } from '../model/hooks/useNotificationsActions'
import { useNotificationsStore } from '../model/store/useNotificationsStore'

import { NotificationsList } from './NotificationsList'

export const Notifications = () => {
	const notifications = useNotificationsStore(state => state.notifications)
	const { handleMarkAllRead, handleClearAll, isClearing, isPending } =
		useNotificationsActions()

	if (!notifications.length)
		return (
			<div className='p-4'>
				<div className='flex justify-between'>
					<h2 className='text-gray-400 text-sm'>Уведомления</h2>
				</div>
				<p className='text-center pt-6'>Нет новых уведомлений</p>
			</div>
		)

	return (
		<div className='p-4'>
			<div className='flex justify-between'>
				<h2 className='text-gray-400 text-sm'>Уведомления</h2>
				<Button
					variant='none'
					size='none'
					className='cursor-pointer'
					disabled={isClearing}
					onClick={() => handleClearAll()}
				>
					Очистить все
				</Button>
			</div>
			<NotificationsList notifications={notifications} />
		</div>
	)
}
