import { Socket } from 'socket.io-client'

import { SOCKET_URL } from '@/shared/libs'
import { createSocket } from '@/shared/utils'

const sockets = new Map<string, Socket>()

export const getNotificationsSocket = (userId: string) => {
	if (!sockets.has(userId)) {
		const socket = createSocket(SOCKET_URL.notifications)
		sockets.set(userId, socket)
	}
	return sockets.get(userId)!
}

export const disconnectNotificationsSocket = (userId: string) => {
	const socket = sockets.get(userId)
	socket?.disconnect()
	sockets.delete(userId)
}
