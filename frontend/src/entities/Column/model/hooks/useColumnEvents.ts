'use client'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Socket } from 'socket.io-client'

import { boardKeys } from '@/entities/Board'

export const useColumnEvents = (
	socketRef: React.MutableRefObject<Socket | null>,
	boardId: string
) => {
	const queryClient = useQueryClient()

	useEffect(() => {
		const socket = socketRef.current
		if (!socket) return

		const invalidateBoard = () => {
			queryClient.invalidateQueries({
				queryKey: boardKeys.single(boardId)
			})
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
	}, [socketRef, boardId, queryClient])
}
