'use client'
import { Bell } from 'lucide-react'
import { useLocale } from 'next-intl'

import { cn, formatDate } from '@/shared/utils'

import { iconConfig } from '../model/lib/notificationIconConfig'
import { NotificationItemProps } from '../model/types/NotificationProps'

export const NotificationItem = ({
	type,
	message,
	read,
	createdAt
}: NotificationItemProps) => {
	const locale = useLocale()
	const config = iconConfig[type] ?? {
		icon: Bell,
		bg: 'bg-primary/10',
		color: 'text-primary'
	}
	const Icon = config.icon

	return (
		<div
			className={cn(
				'flex gap-3 rounded-lg border p-4 transition-colors',
				read ? 'bg-muted/60 border-border' : 'bg-card hover:bg-muted/80'
			)}
		>
			<div
				className={cn(
					'flex h-9 w-9 shrink-0 items-center justify-center rounded-full',
					read ? 'bg-muted' : config.bg
				)}
			>
				<Icon
					className={cn(
						'h-4 w-4',
						read ? 'text-muted-foreground' : config.color
					)}
				/>
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
