'use client'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo } from 'react'

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

	const socket = useMemo(() => {
		if (!user?.id || !boardId) return null
		return getBoardSocket(user.id, boardId)
	}, [user?.id, boardId])

	useBoardEvents(socket, boardId)
	useColumnEvents(socket, boardId)
	useCardEvents(socket, boardId)

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
