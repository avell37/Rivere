'use client'
import { useLocale, useTranslations } from 'next-intl'

import { EmptyState, LoadMoreButton } from '@/shared/ui/custom'
import { Spinner } from '@/shared/ui/external'

import { useActivityLog } from '../model/hooks/useActivityLog'

import { ActivityLogItem } from './ActivityLogItem'

export const ActivityLogList = ({ boardId }: { boardId: string }) => {
	const t = useTranslations('board.activityLog')
	const locale = useLocale()
	const {
		activityLog,
		isActivityLogPending,
		hasMore,
		isFetchingNextPage,
		fetchNextPage
	} = useActivityLog(boardId)

	if (isActivityLogPending) {
		return <Spinner />
	}

	return (
		<section className='flex flex-col gap-4'>
			<h2 className='font-bold text-xl'>{t('title')}</h2>
			{activityLog.length === 0 ? (
				<EmptyState centered>{t('empty')}</EmptyState>
			) : (
				<>
					<div className='flex flex-col'>
						{activityLog.map(log => (
							<ActivityLogItem
								key={log.id}
								log={log}
								locale={locale}
							/>
						))}
					</div>
					{hasMore && (
						<LoadMoreButton
							isLoading={isFetchingNextPage}
							onClick={() => fetchNextPage()}
							loadMoreLabel={t('loadMore')}
							loadingLabel={t('loadingMore')}
							className='self-start'
						/>
					)}
				</>
			)}
		</section>
	)
}
