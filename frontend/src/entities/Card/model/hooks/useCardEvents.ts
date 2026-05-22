'use client'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Socket } from 'socket.io-client'

import { boardKeys } from '@/entities/Board'

export const useCardEvents = (
	socketRef: React.RefObject<Socket | null>,
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

		socket.on('card:created', invalidateBoard)
		socket.on('card:updated', invalidateBoard)
		socket.on('card:deleted', invalidateBoard)
		socket.on('card:moved', invalidateBoard)
		socket.on('cards:reordered', invalidateBoard)

		return () => {
			socket.off('card:created', invalidateBoard)
			socket.off('card:updated', invalidateBoard)
			socket.off('card:deleted', invalidateBoard)
			socket.off('card:moved', invalidateBoard)
			socket.off('cards:reordered', invalidateBoard)
		}
	}, [socketRef, boardId, queryClient])
}
