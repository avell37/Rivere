import { Socket } from 'socket.io-client'

import { SERVER_URL } from '@/shared/libs/constants/api.config'
import { createSocket } from '@/shared/utils/createSocket'

const sockets = new Map<string, Socket>()

export const getNotificationsSocket = (userId: string) => {
	if (!sockets.has(userId)) {
		const socket = createSocket(`${SERVER_URL}/notifications`, {
			auth: { userId }
		})
		sockets.set(userId, socket)
	}
	return sockets.get(userId)!
}

export const disconnectNotificationsSocket = (userId: string) => {
	const socket = sockets.get(userId)
	socket?.disconnect()
	sockets.delete(userId)
}
