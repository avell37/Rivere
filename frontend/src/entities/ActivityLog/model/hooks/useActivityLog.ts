'use client'
import { useInfiniteQuery } from '@tanstack/react-query'

import { getOffsetNextPageParam } from '@/shared/utils'

import { getBoardActivityLogApi } from '../api/activityLogApi'
import { ACTIVITY_LOG_PAGE_SIZE } from '../types/IActivityLog'

export const activityLogKeys = {
	getAll: (boardId: string) => ['activity-log', boardId]
}

export const useActivityLog = (boardId: string) => {
	const {
		data,
		isPending: isActivityLogPending,
		isError,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage
	} = useInfiniteQuery({
		queryKey: activityLogKeys.getAll(boardId),
		queryFn: ({ pageParam = 0 }) =>
			getBoardActivityLogApi(boardId, ACTIVITY_LOG_PAGE_SIZE, pageParam),
		initialPageParam: 0,
		getNextPageParam: getOffsetNextPageParam,
	})

	const activityLog = data?.pages.flatMap(page => page.items) ?? []
	const total = data?.pages[0]?.total ?? 0

	return {
		activityLog,
		total,
		isActivityLogPending,
		isError,
		hasMore: Boolean(hasNextPage),
		isFetchingNextPage,
		fetchNextPage
	}
}
