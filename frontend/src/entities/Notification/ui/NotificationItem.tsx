'use client'

import { Bell } from 'lucide-react'
import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'

import { cn, formatDate } from '@/shared/utils'

import { useNotificationMessage } from '../model/hooks/useNotificationMessage'
import { getNotificationHref } from '../model/lib/getNotificationHref'
import { iconConfig } from '../model/lib/notificationIconConfig'
import { NotificationItemProps } from '../model/types/NotificationProps'

export const NotificationItem = ({
	id,
	type,
	message,
	messageKey,
	messageParams,
	read,
	createdAt,
	entityId,
	onMarkRead
}: NotificationItemProps) => {
	const locale = useLocale()
	const router = useRouter()
	const notificationMessage = useNotificationMessage({
		message,
		messageKey,
		messageParams
	})
	const config = iconConfig[type] ?? {
		icon: Bell,
		bg: 'bg-primary/10',
		color: 'text-primary'
	}
	const Icon = config.icon
	const href = getNotificationHref({ type, entityId })

	const handleClick = () => {
		if (!read) {
			onMarkRead?.(id)
		}

		if (href) {
			router.push(href)
		}
	}

	return (
		<button
			type='button'
			onClick={handleClick}
			disabled={!href && read}
			className={cn(
				'flex w-full gap-3 rounded-lg border p-4 text-left transition-colors',
				read
					? 'bg-muted/60 border-border'
					: 'bg-card hover:bg-muted/80',
				href && 'cursor-pointer',
				!href && 'cursor-default'
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
					{notificationMessage}
				</p>
				<span className='text-xs text-muted-foreground'>
					{formatDate(new Date(createdAt), locale)}
				</span>
			</div>
		</button>
	)
}
