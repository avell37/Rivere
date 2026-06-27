'use client'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { IActivityLogResponse } from '../types/IActivityLog'
import { getBoardActivityLogApi } from '../api/activityLogApi'

export const activityLogKeys = {
	getAll: (boardId: string) => ['activity-log', boardId]
}

export const useActivityLog = (boardId: string) => {
	const {
		data,
		isPending: isActivityLogPending,
		isError
	} = useQuery<IActivityLogResponse, AxiosError>({
		queryKey: activityLogKeys.getAll(boardId),
		queryFn: () => getBoardActivityLogApi(boardId)
	})

	return {
		activityLog: data?.items ?? [],
		total: data?.total ?? 0,
		isActivityLogPending,
		isError
	}
}
