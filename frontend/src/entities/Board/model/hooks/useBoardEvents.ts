'use client'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Socket } from 'socket.io-client'
import { toast } from 'sonner'

import { useUserStore } from '@/entities/User'

import { PUBLIC_URL } from '@/shared/libs'

import { boardKeys } from './useBoardQueries'

export const useBoardEvents = (socket: Socket | null, boardId: string) => {
	const router = useRouter()
	const queryClient = useQueryClient()
	const { user } = useUserStore()

	useEffect(() => {
		if (!socket) return

		socket.emit('board:join', { boardId })

		const onKicked = ({ boardId: kickedBoardId }: { boardId: string }) => {
			if (kickedBoardId !== boardId) return

			toast.error('Вы были кикнуты с доски')
			router.push(PUBLIC_URL.boards())
		}

		const onBoardDeleted = ({
			boardId: deletedBoardId,
			deletedBy
		}: {
			boardId: string
			deletedBy: string
		}) => {
			if (deletedBoardId !== boardId) return
			if (deletedBy === user?.id) return

			toast.error('Доска была удалена')
			router.push(PUBLIC_URL.boards())
		}

		const onBoardUpdated = () => {
			queryClient.invalidateQueries({
				queryKey: boardKeys.single(boardId)
			})
		}

		socket.on('board:kicked', onKicked)
		socket.on('board:deleted', onBoardDeleted)
		socket.on('board:edited', onBoardUpdated)

		return () => {
			socket.emit('board:leave', { boardId })

			socket.off('board:kicked', onKicked)
			socket.off('board:deleted', onBoardDeleted)
			socket.off('board:edited', onBoardUpdated)
		}
	}, [socket, boardId, queryClient, router])
}
