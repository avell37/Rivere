import { Bell } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/shared/ui/external'

import { useNotificationsActions } from '../model/hooks/useNotificationsActions'
import { useNotificationsStore } from '../model/store/useNotificationsStore'

import { NotificationsList } from './NotificationsList'

export const Notifications = () => {
	const notifications = useNotificationsStore(state => state.notifications)
	const { handleClearAll, isClearing } = useNotificationsActions()
	const t = useTranslations('notifications')

	return (
		<div className='p-4'>
			<div className='flex justify-between items-center mb-3'>
				<h2 className='font-medium text-sm text-muted-foreground'>
					{t('heading')}
				</h2>
				{notifications.length > 0 && (
					<Button
						variant='none'
						size='none'
						className='cursor-pointer'
						disabled={isClearing}
						onClick={() => handleClearAll()}
					>
						{t('clearAllNotifications')}
					</Button>
				)}
			</div>
			{!notifications.length ? (
				<div className='flex flex-col items-center gap-2 py-8 text-muted-foreground'>
					<Bell className='h-6 w-6 opacity-40' />
					<p className='text-sm'>{t('noNotifications')}</p>
				</div>
			) : (
				<NotificationsList notifications={notifications} />
			)}
		</div>
	)
}
