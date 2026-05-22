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

		const onBoardDeleted = ({
			boardId: deletedBoardId,
			deletedBy
		}: {
			boardId: string
			deletedBy: string
		}) => {
			if (deletedBoardId !== boardId) return
			if (deletedBy === user?.id) return

			toast.error(t('boardDeleted'))
			router.push(PRIVATE_URL.boards())
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
	}, [socketRef, boardId, queryClient, router, user?.id, t])
}
