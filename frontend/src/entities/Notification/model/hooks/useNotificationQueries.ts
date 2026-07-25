'use client'
import {
	useInfiniteQuery,
	useMutation,
	useQueryClient
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useTranslations } from 'next-intl'

import { ActionResponse } from '@/shared/types'
import { getOffsetNextPageParam, handleApiError } from '@/shared/utils'

import {
	clearNotificationsApi,
	getUserNotifications,
	markAllReadApi,
	markReadApi
} from '../api/notificationApi'
import { NOTIFICATIONS_PAGE_SIZE } from '../types/INotification'

export const notificationKeys = {
	all: ['notifications'],
	markRead: (id: string) => ['notifications-mark-read', id],
	markAllRead: ['notifications-mark-all-read'],
	clearNotifications: ['notifications-clear']
}

export const useGetNotifications = () => {
	const {
		data,
		isPending: notificationsPending,
		isError: notificationsError,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage
	} = useInfiniteQuery({
		queryKey: notificationKeys.all,
		queryFn: ({ pageParam = 0 }) =>
			getUserNotifications(NOTIFICATIONS_PAGE_SIZE, pageParam),
		initialPageParam: 0,
		getNextPageParam: getOffsetNextPageParam,
	})

	const notifications = data?.pages.flatMap(page => page.items) ?? []
	const unreadCount = data?.pages[0]?.unreadCount ?? 0

	return {
		notifications,
		unreadCount,
		notificationsPending,
		notificationsError,
		hasMore: Boolean(hasNextPage),
		isFetchingNextPage,
		fetchNextPage
	}
}

export const useMarkNotificationRead = () => {
	const queryClient = useQueryClient()
	const t = useTranslations()

	const { mutate: markRead } = useMutation<
		ActionResponse,
		AxiosError,
		string
	>({
		mutationKey: notificationKeys.markRead(''),
		mutationFn: markReadApi,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: notificationKeys.all
			})
		},
		onError: err => handleApiError(err, t)
	})

	return { markRead }
}

export const useMarkAllRead = () => {
	const queryClient = useQueryClient()
	const t = useTranslations()

	const {
		mutate: markAllRead,
		isPending: markAllReadPending,
		isError: markAllReadError
	} = useMutation<ActionResponse, AxiosError, void>({
		mutationKey: notificationKeys.markAllRead,
		mutationFn: markAllReadApi,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: notificationKeys.all
			})
		},
		onError: err => handleApiError(err, t)
	})

	return {
		markAllRead,
		markAllReadPending,
		markAllReadError
	}
}

export const useClearNotifications = () => {
	const queryClient = useQueryClient()
	const t = useTranslations()

	const {
		mutate: clearAll,
		isPending: clearAllPending,
		isError: clearAllError
	} = useMutation<ActionResponse, AxiosError, void>({
		mutationKey: notificationKeys.clearNotifications,
		mutationFn: clearNotificationsApi,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: notificationKeys.all
			})
		},
		onError: err => handleApiError(err, t)
	})

	return {
		clearAll,
		clearAllPending,
		clearAllError
	}
}
