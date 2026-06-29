import { useTranslations } from 'next-intl'

import { UserAvatar } from '@/entities/User'

import { formatDate, formatTime } from '@/shared/utils'

import { IActivityLog } from '../model/types/IActivityLog'

interface ActivityLogItemProps {
	log: IActivityLog
	locale: string
}

export const ActivityLogItem = ({ log, locale }: ActivityLogItemProps) => {
	const t = useTranslations('board.activityLog')

	const actionKey = log.action.toLowerCase() as Lowercase<typeof log.action>
	const entityKey = log.entityType.toLowerCase() as Lowercase<
		typeof log.entityType
	>

	const actionLabel = t(`actions.${actionKey}`, {
		entity: t(`entities.${entityKey}`),
		title: log.entityTitle ?? '',
		entityTitle: log.entityTitle ?? '',
		fromColumn: (log.meta as { fromColumn?: string })?.fromColumn ?? '',
		toColumn: (log.meta as { toColumn?: string })?.toColumn ?? '',
		newRole: (log.meta as { newRole?: string })?.newRole ?? ''
	})

	return (
		<div className='flex items-start gap-3 py-3 border-b last:border-none'>
			<UserAvatar
				avatarClassname='h-8 w-8 rounded-full shrink-0 mt-0.5'
				avatar={log.user.avatar}
				username={log.user.nickname}
			/>
			<div className='flex flex-col gap-0.5 min-w-0'>
				<p className='text-sm'>
					<span className='font-medium'>{log.user.nickname}</span>{' '}
					<span className='text-muted-foreground'>{actionLabel}</span>
				</p>
				<span className='text-[11px] text-muted-foreground'>
					{formatDate(log.createdAt, locale)} {t('at')}{' '}
					{formatTime(log.createdAt, locale)}
				</span>
			</div>
		</div>
	)
}
