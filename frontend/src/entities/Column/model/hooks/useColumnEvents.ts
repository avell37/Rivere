'use client'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Socket } from 'socket.io-client'

export const useColumnEvents = (socket: Socket | null, boardId: string) => {
	const queryClient = useQueryClient()

	useEffect(() => {
		if (!socket) return

		const invalidateBoard = () => {
			queryClient.invalidateQueries({ queryKey: ['get board', boardId] })
		}

		socket.on('column:created', invalidateBoard)
		socket.on('column:updated', invalidateBoard)
		socket.on('column:deleted', invalidateBoard)
		socket.on('column:reordered', invalidateBoard)

		return () => {
			socket.off('column:created', invalidateBoard)
			socket.off('column:updated', invalidateBoard)
			socket.off('column:deleted', invalidateBoard)
			socket.off('column:reordered', invalidateBoard)
		}
	}, [socket, boardId, queryClient])
}
