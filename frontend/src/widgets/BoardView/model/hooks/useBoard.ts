'use client'
import {
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import { IBoard, fetchBoardById } from '@/entities/Board'
import { IColumn } from '@/entities/Column'

import { useDndStore } from '@/features/drag-and-drop'

export const useBoard = (boardId: string) => {
	const { columns, setColumns } = useDndStore()

	const { data: board, isLoading } = useQuery<IBoard, unknown>({
		queryKey: ['get board', boardId],
		queryFn: () => fetchBoardById(boardId),
		enabled: !!boardId
	})

	useEffect(() => {
		if (board?.columns) {
			setColumns([
				...board.columns.sort(
					(a: IColumn, b: IColumn) => a.position - b.position
				)
			])
		}
	}, [board, setColumns])

	const backgroundStyle: React.CSSProperties = {}

	if (board?.background) {
		const { url, color } = board.background

		if (url) {
			backgroundStyle.backgroundImage = `url(${url})`
			backgroundStyle.backgroundSize = 'cover'
			backgroundStyle.backgroundPosition = 'center'
			backgroundStyle.backgroundRepeat = 'no-repeat'
		} else if (color) {
			if (color.includes('gradient')) {
				backgroundStyle.backgroundImage = color
				backgroundStyle.backgroundSize = 'cover'
				backgroundStyle.backgroundPosition = 'center'
			} else {
				backgroundStyle.backgroundColor = color
			}
		}
	}

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
