import { Socket } from 'socket.io-client'

import { SOCKET_URL } from '@/shared/libs'
import { createSocket } from '@/shared/utils'

let socket: Socket | null = null

export const getChatSocket = () => {
	if (!socket) {
		socket = createSocket(SOCKET_URL.chat)
	}
	return socket
}

export const disconnectChatSocket = () => {
	socket?.disconnect()
	socket = null
}
