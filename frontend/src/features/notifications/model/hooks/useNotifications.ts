import { useEffect } from 'react'

import { useNotificationsStore } from '../store/useNotificationsStore'
import { getNotificationsSocket } from '../utils/notification.socket'

export const useNotifications = (userId?: string | null) => {
	const add = useNotificationsStore(state => state.add)

	useEffect(() => {
		if (!userId) return

		const socket = getNotificationsSocket(userId)

		socket.on('notification', notification => {
			add(notification)
		})

		return () => {
			socket.off('notification')
			socket.disconnect()
		}
	}, [userId])
}
