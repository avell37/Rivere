'use client'
import { useLocale, useTranslations } from 'next-intl'

import { Spinner } from '@/shared/ui/external'

import { useActivityLog } from '../model/hooks/useActivityLog'

import { ActivityLogItem } from './ActivityLogItem'

interface ActivityLogListProps {
	boardId: string
}

export const ActivityLogList = ({ boardId }: ActivityLogListProps) => {
	const t = useTranslations('board.activityLog')
	const locale = useLocale()
	const { activityLog, isActivityLogPending } = useActivityLog(boardId)

	if (isActivityLogPending) {
		return <Spinner />
	}

	return (
		<section className='flex flex-col gap-4'>
			<h2 className='font-bold text-xl'>{t('title')}</h2>
			{activityLog.length === 0 ? (
				<p className='text-sm text-muted-foreground'>{t('empty')}</p>
			) : (
				<div className='flex flex-col'>
					{activityLog.map(log => (
						<ActivityLogItem
							key={log.id}
							log={log}
							locale={locale}
						/>
					))}
				</div>
			)}
		</section>
	)
}
