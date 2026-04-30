'use client'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { getBoardSocket, useGetBoard } from '@/entities/Board'
import { useCardEvents } from '@/entities/Card'
import { useColumnEvents } from '@/entities/Column'
import { useUserStore } from '@/entities/User'

import { PUBLIC_URL } from '@/shared/libs'
import { handleApiError } from '@/shared/utils'

import { useBoardStore } from '../store/useBoardStore'

import { useBoardEvents } from './useBoardEvents'

export const useBoard = (boardId: string) => {
	const { columns, setColumns } = useBoardStore()
	const { user } = useUserStore()
	const router = useRouter()
	const t = useTranslations()

	const { board, isLoading, error } = useGetBoard(boardId)

	const socketRef = useRef<ReturnType<typeof getBoardSocket> | null>(null)

	useEffect(() => {
		if (!user?.id || !boardId) return

		const socket = getBoardSocket(user.id, boardId)
		socketRef.current = socket

		const onConnect = () => {
			socket.emit('board:join', { boardId })
		}

		if (socket.connected) {
			onConnect()
		} else {
			socket.on('connect', onConnect)
		}

		return () => {
			socket.emit('board:leave', { boardId })
			socket.off('connect', onConnect)
		}
	}, [user?.id, boardId])

	useBoardEvents(socketRef, boardId)
	useColumnEvents(socketRef, boardId)
	useCardEvents(socketRef, boardId)

	useEffect(() => {
		if (!board) return

		setColumns(board.columns)
	}, [board, setColumns])

	useEffect(() => {
		if (error) {
			handleApiError(error, t)
			if (error?.response?.status === 403) {
				router.push(PUBLIC_URL.boards())
			}
		}
	}, [error, t, router])

	return {
		board,
		columns,
		isLoading
	}
}
