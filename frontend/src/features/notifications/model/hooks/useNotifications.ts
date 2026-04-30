'use client'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

import { getNotificationsSocket } from '../utils/notification.socket'

export const useNotifications = (userId?: string | null) => {
	const queryClient = useQueryClient()

	useEffect(() => {
		if (!userId) return

		const socket = getNotificationsSocket(userId)

		socket.on('notification', () =>
			queryClient.invalidateQueries({
				queryKey: ['get user notifications', userId]
			})
		)

		return () => {
			socket.off('notification')
			socket.disconnect()
		}
	}, [userId, queryClient])
}
