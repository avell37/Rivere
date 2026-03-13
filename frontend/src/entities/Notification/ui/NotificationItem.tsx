'use client'
import { Bell } from 'lucide-react'
import { useLocale } from 'next-intl'

import { cn, formatDate } from '@/shared/utils'

import { NotificationItemProps } from '../model/types/NotificationProps'

export const NotificationItem = ({
	message,
	read,
	createdAt
}: NotificationItemProps) => {
	const locale = useLocale()

	return (
		<div
			className={cn(
				'flex gap-3 rounded-lg border p-4 transition-colors',
				read ? 'bg-muted/50' : 'bg-background hover:bg-muted'
			)}
		>
			<div
				className={cn(
					'flex h-9 w-9 items-center justify-center rounded-full',
					read ? 'bg-muted' : 'bg-primary/10'
				)}
			>
				<Bell className='h-4 w-4 text-primary' />
			</div>
			<div className='flex flex-col gap-1 flex-1'>
				<p
					className={cn(
						'text-sm',
						read ? 'text-muted-foreground' : 'font-medium'
					)}
				>
					{message}
				</p>
				<span className='text-xs text-muted-foreground'>
					{formatDate(new Date(createdAt), locale)}
				</span>
			</div>
		</div>
	)
}
