'use client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import {
	INotification,
	INotificationActionResponse,
	clearNotifications,
	getUserNotifications,
	markAllRead
} from '@/entities/Notification'
import { useUserStore } from '@/entities/User'

import { handleApiError } from '@/shared/utils'

export const useNotificationsActions = () => {
	const queryClient = useQueryClient()
	const t = useTranslations()
	const user = useUserStore(state => state.user)

	const { data: notifications = [] } = useQuery<INotification[], unknown>({
		queryKey: ['get user notifications', user?.id],
		queryFn: () => getUserNotifications()
	})

	const { mutate: handleMarkAllRead, isPending } = useMutation<
		INotificationActionResponse,
		unknown,
		void
	>({
		mutationKey: ['read all notifications'],
		mutationFn: () => markAllRead(),
		onSuccess: () => {
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
			handleMarkAllRead()
			queryClient.invalidateQueries({
				queryKey: ['get user notifications', user?.id]
			})
			toast.success(t('notifications.successCleared'))
		},
		onError: err => handleApiError(err, t)
	})

	return {
		notifications,
		isPending,
		isClearing,
		handleMarkAllRead,
		handleClearAll
	}
}
