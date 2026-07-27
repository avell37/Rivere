import { Socket, io } from 'socket.io-client'

const DEV_BACKEND_ORIGIN = 'http://localhost:5000'

export const resolveSocketUrl = (url: string): string => {
	if (typeof window === 'undefined') {
		return url
	}

	const namespaceMatch = url.match(/\/api(\/[^/?#]+)/)
	if (!namespaceMatch) {
		return url
	}

	const namespace = namespaceMatch[1]
	const { hostname, origin } = window.location

	if (hostname === 'localhost' || hostname === '127.0.0.1') {
		return `${DEV_BACKEND_ORIGIN}/api${namespace}`
	}

	return `${origin}/api${namespace}`
}

export const createSocket = (
	url: string,
	options?: Parameters<typeof io>[1]
): Socket => {
	return io(resolveSocketUrl(url), {
		transports: ['websocket'],
		withCredentials: true,
		...options
	})
}
