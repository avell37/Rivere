import { Socket } from 'socket.io-client'

import { SOCKET_URL } from '@/shared/libs'
import { createSocket } from '@/shared/utils'

const sockets = new Map<string, Socket>()

export const getBoardSocket = (userId: string, boardId: string) => {
	const key = `${userId}:${boardId}`

	if (!sockets.has(key)) {
		const socket = createSocket(SOCKET_URL.boards)
		sockets.set(key, socket)
	}
	return sockets.get(key)!
}

export const disconnectBoardSocket = (userId: string, boardId: string) => {
	const key = `${userId}:${boardId}`
	const socket = sockets.get(key)

	socket?.disconnect()
	sockets.delete(key)
}

export const disconnectAllBoardSockets = () => {
	for (const socket of sockets.values()) {
		socket.disconnect()
	}

	sockets.clear()
}

export const disconnectNotificationsSocket = (
	userId: string,
	boardId: string
) => {
	disconnectBoardSocket(userId, boardId)
}
