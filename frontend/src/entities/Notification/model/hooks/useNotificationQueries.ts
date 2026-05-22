'use client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useTranslations } from 'next-intl'

import { ActionResponse } from '@/shared/types'
import { handleApiError } from '@/shared/utils'

import {
	clearNotificationsApi,
	getUserNotifications,
	markAllReadApi
} from '../api/notificationApi'
import { INotification } from '../types/INotification'

export const notificationKeys = {
	all: ['notifications'],
	markAllRead: ['notifications-mark-all-read'],
	clearNotifications: ['notifications-clear']
}

export const useGetNotifications = () => {
	const {
		data: notifications = [],
		isPending: notificationsPending,
		isError: notificationsError
	} = useQuery<INotification[], AxiosError>({
		queryKey: notificationKeys.all,
		queryFn: () => getUserNotifications()
	})

	return {
		notifications,
		notificationsPending,
		notificationsError
	}
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
