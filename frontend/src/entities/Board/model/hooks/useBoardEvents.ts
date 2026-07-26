'use client'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Socket } from 'socket.io-client'
import { toast } from 'sonner'

import { useUserStore } from '@/entities/User'

import { PRIVATE_URL } from '@/shared/libs'

import { boardKeys } from './useBoardQueries'

export const useBoardEvents = (
	socketRef: React.RefObject<Socket | null>,
	boardId: string
) => {
	const t = useTranslations('events.board')
	const router = useRouter()
	const queryClient = useQueryClient()
	const { user } = useUserStore()

	useEffect(() => {
		const socket = socketRef.current
		if (!socket) return

		socket.emit('board:join', { boardId })

		const onKicked = ({ boardId: kickedBoardId }: { boardId: string }) => {
			if (kickedBoardId !== boardId) return

			toast.error(t('kicked'))
			router.push(PRIVATE_URL.boards())
		}

		const onBoardArchived = (payload: {
			boardId: string
			archivedBy?: string
			deletedBy?: string
		}) => {
			if (payload.boardId !== boardId) return
			const actorId = payload.archivedBy ?? payload.deletedBy
			if (actorId === user?.id) return

			toast.error(t('boardArchived'))
			router.push(PRIVATE_URL.boards())
		}

		const onBoardUpdated = () => {
			queryClient.invalidateQueries({
				queryKey: boardKeys.single(boardId)
			})
		}

		socket.on('board:kicked', onKicked)
		socket.on('board:archived', onBoardArchived)
		socket.on('board:deleted', onBoardArchived)
		socket.on('board:edited', onBoardUpdated)

		return () => {
			socket.emit('board:leave', { boardId })

			socket.off('board:kicked', onKicked)
			socket.off('board:archived', onBoardArchived)
			socket.off('board:deleted', onBoardArchived)
			socket.off('board:edited', onBoardUpdated)
		}
	}, [socketRef, boardId, queryClient, router, user?.id, t])
}
