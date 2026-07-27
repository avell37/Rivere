'use client'

import { Bell } from 'lucide-react'
import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'

import { Button } from '@/shared/ui/external'
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
		<Button
			type='button'
			variant='none'
			size='none'
			onClick={handleClick}
			disabled={!href && read}
			className={cn(
				'flex w-full items-start gap-3 whitespace-normal rounded-lg border p-4 text-left transition-colors h-auto',
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
			<div className='flex min-w-0 flex-1 flex-col gap-1'>
				<p
					className={cn(
						'text-sm break-words',
						read ? 'text-muted-foreground' : 'font-medium'
					)}
				>
					{notificationMessage}
				</p>
				<span className='text-xs text-muted-foreground break-words'>
					{formatDate(new Date(createdAt), locale)}
				</span>
			</div>
		</Button>
	)
}
