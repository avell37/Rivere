import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import { toast } from 'sonner'

import { useUserStore } from '@/entities/User'

import { handleApiError } from '@/shared/utils'

import {
	clearNotifications,
	getUserNotifications,
	markAllRead
} from '../api/notificationApi'
import { useNotificationsStore } from '../store/useNotificationsStore'
import {
	INotification,
	INotificationActionResponse
} from '../types/INotification'

export const useNotificationsActions = () => {
	const queryClient = useQueryClient()
	const t = useTranslations()
	const setAll = useNotificationsStore(state => state.setAll)
	const markAllReadLocal = useNotificationsStore(
		state => state.markAllReadLocal
	)
	const clearLocal = useNotificationsStore(state => state.clearLocal)
	const user = useUserStore(state => state.user)

	const { data: notifications } = useQuery<INotification[], unknown>({
		queryKey: ['get user notifications', user?.id],
		queryFn: () => getUserNotifications()
	})

	useEffect(() => {
		if (notifications) setAll(notifications)
	}, [notifications, setAll])

	const { mutate: handleMarkAllRead, isPending } = useMutation<
		INotificationActionResponse,
		unknown,
		void
	>({
		mutationKey: ['read all notifications'],
		mutationFn: () => markAllRead(),
		onSuccess: () => {
			markAllReadLocal()
			queryClient.invalidateQueries({
				queryKey: ['get user notifications', user?.id]
			})
			toast.success(t('notifications.successReaded'))
		},
		onError: err => handleApiError(err, t)
	})

	const { mutate: handleClearAll, isPending: isClearing } = useMutation<
		INotificationActionResponse,
		unknown,
		void
	>({
		mutationKey: ['clear all notifications'],
		mutationFn: () => clearNotifications(),
		onSuccess: () => {
			clearLocal()
			queryClient.invalidateQueries({
				queryKey: ['get user notifications', user?.id]
			})
			toast.success(t('notifications.successCleared'))
		},
		onError: err => handleApiError(err, t)
	})

	return {
		isPending,
		isClearing,
		handleMarkAllRead,
		handleClearAll
	}
}
