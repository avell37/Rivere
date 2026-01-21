import { Socket } from 'socket.io-client'

import { SERVER_URL } from '@/shared/libs'
import { createSocket } from '@/shared/utils'

const sockets = new Map<string, Socket>()

export const getBoardSocket = (userId: string, boardId: string) => {
	const key = `${userId}:${boardId}`

	if (!sockets.has(key)) {
		const socket = createSocket(`${SERVER_URL}/boards`, {
			auth: { userId }
		})
		sockets.set(key, socket)
	}
	return sockets.get(key)!
}

export const disconnectNotificationsSocket = (
	userId: string,
	boardId: string
) => {
	const key = `${userId}:${boardId}`
	const socket = sockets.get(key)

	socket?.disconnect()
	sockets.delete(key)
}
