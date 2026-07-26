'use client'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Socket } from 'socket.io-client'

import { boardKeys } from '@/entities/Board'

import { columnKeys } from '../hooks/useColumnQueries'

export const useColumnEvents = (
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

		const invalidateArchive = () => {
			invalidateBoard()
			queryClient.invalidateQueries({
				queryKey: columnKeys.archived(boardId)
			})
		}

		socket.on('column:created', invalidateBoard)
		socket.on('column:updated', invalidateBoard)
		socket.on('column:archived', invalidateArchive)
		socket.on('column:deleted', invalidateBoard)
		socket.on('column:restored', invalidateArchive)
		socket.on('column:permanent-deleted', invalidateArchive)
		socket.on('column:reordered', invalidateBoard)

		return () => {
			socket.off('column:created', invalidateBoard)
			socket.off('column:updated', invalidateBoard)
			socket.off('column:archived', invalidateArchive)
			socket.off('column:deleted', invalidateBoard)
			socket.off('column:restored', invalidateArchive)
			socket.off('column:permanent-deleted', invalidateArchive)
			socket.off('column:reordered', invalidateBoard)
		}
	}, [socketRef, boardId, queryClient])
}
