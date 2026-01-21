'use client'
import {
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo } from 'react'

import { IBoard, fetchBoardById, useGetBoard } from '@/entities/Board'
import { getBoardSocket } from '@/entities/Board/model/utils/board.socket'
import { useCardEvents } from '@/entities/Card/model/hooks/useCardEvents'
import { IColumn } from '@/entities/Column'
import { useColumnEvents } from '@/entities/Column/model/hooks/useColumnEvents'
import { useUserStore } from '@/entities/User'

import { useDndStore } from '@/features/drag-and-drop'

import { PUBLIC_URL } from '@/shared/libs'
import { handleApiError } from '@/shared/utils'

import { useBoardEvents } from './useBoardEvents'

export const useBoard = (boardId: string) => {
	const { columns, setColumns } = useDndStore()
	const { user } = useUserStore()
	const router = useRouter()
	const t = useTranslations()

	const { board, isLoading, error, backgroundStyle } = useGetBoard(boardId)

	const socket = useMemo(() => {
		if (!user?.id || !boardId) return null
		return getBoardSocket(user.id, boardId)
	}, [user?.id, boardId])

	useBoardEvents(socket, boardId)
	useColumnEvents(socket, boardId)
	useCardEvents(socket, boardId)

	useEffect(() => {
		if (error) {
			handleApiError(error, t)
			if (error?.response?.status === 403) {
				router.push(PUBLIC_URL.boards())
			}
		}
	}, [error, t, router])

	useEffect(() => {
		if (board?.columns) {
			setColumns([
				...board.columns.sort(
					(a: IColumn, b: IColumn) => a.position - b.position
				)
			])
		}
	}, [board, setColumns])

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: { distance: 5 }
		}),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates
		})
	)

	return {
		board,
		columns,
		isLoading,
		backgroundStyle,
		sensors
	}
}
