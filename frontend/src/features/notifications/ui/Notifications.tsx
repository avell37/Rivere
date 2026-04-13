'use client'
import { Bell, Check, Trash } from 'lucide-react'
import { useTranslations } from 'next-intl'

import {
	NotificationsList,
	useNotificationsActions
} from '@/entities/Notification'

import { Button } from '@/shared/ui/external'

export const Notifications = () => {
	const { notifications, handleMarkAllRead, handleClearAll, isClearing } =
		useNotificationsActions()
	const t = useTranslations('notifications')

	return (
		<div className='p-4'>
			<div className='flex justify-between items-center mb-3'>
				<h2 className='font-medium text-sm text-muted-foreground'>
					{t('heading')}
				</h2>
				{notifications.length > 0 && (
					<div className='flex gap-2'>
						<Button
							variant='none'
							size='none'
							className='cursor-pointer'
							disabled={isClearing}
							onClick={() => handleMarkAllRead()}
						>
							<Check />
						</Button>
						<Button
							variant='none'
							size='none'
							className='cursor-pointer'
							disabled={isClearing}
							onClick={() => handleClearAll()}
						>
							<Trash />
						</Button>
					</div>
				)}
			</div>
			{!notifications?.length ? (
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
