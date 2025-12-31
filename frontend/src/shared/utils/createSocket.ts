import { Socket, io } from 'socket.io-client'

export const createSocket = (
	url: string,
	options?: Parameters<typeof io>[1]
): Socket => {
	return io(url, {
		transports: ['websocket'],
		withCredentials: true,
		...options
	})
}
