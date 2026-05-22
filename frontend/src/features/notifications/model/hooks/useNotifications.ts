'use client'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import { toast } from 'sonner'

import {
	notificationKeys,
	useClearNotifications,
	useGetNotifications,
	useMarkAllRead
} from '@/entities/Notification'

import { getNotificationsSocket } from '../utils/notification.socket'

export const useNotifications = (userId?: string | null) => {
	const t = useTranslations()
	const queryClient = useQueryClient()
	const { notifications } = useGetNotifications()
	const { markAllRead, markAllReadPending } = useMarkAllRead()
	const { clearAll, clearAllPending } = useClearNotifications()

	useEffect(() => {
		if (!userId) return

		const socket = getNotificationsSocket(userId)

		socket.on('notification', () =>
			queryClient.invalidateQueries({
				queryKey: notificationKeys.all
			})
		)

		return () => {
			socket.off('notification')
			socket.disconnect()
		}
	}, [userId, queryClient])

	const handleMarkAllRead = () =>
		markAllRead(undefined, {
			onSuccess: () => {
				toast.success(t('notifications.successReaded'))
			}
		})

	const handleClearAll = () =>
		clearAll(undefined, {
			onSuccess: () => {
				toast.success(t('notifications.successCleared'))
			}
		})

	return {
		notifications,
		handleMarkAllRead,
		markAllReadPending,
		handleClearAll,
		clearAllPending
	}
}
