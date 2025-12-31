import { Socket } from 'socket.io-client'

import { SERVER_URL } from '@/shared/libs/constants/api.config'
import { createSocket } from '@/shared/utils/createSocket'

let socket: Socket | null = null

export const getChatSocket = () => {
	if (!socket) {
		socket = createSocket(`${SERVER_URL}/chat`)
	}
	return socket
}

export const disconnectChatSocket = () => {
	socket?.disconnect()
	socket = null
}
