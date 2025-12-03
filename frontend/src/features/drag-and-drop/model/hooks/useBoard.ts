import {
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { fetchBoardById } from '@/entities/Board/model/api/boardApi'
import { IColumn } from '@/entities/Column/model/types/IColumn'

import { useDndStore } from '../store/useDndStore'

export const useBoard = (id: string) => {
	const { columns, setColumns } = useDndStore()

	const { data: board, isLoading } = useQuery({
		queryKey: ['board', id],
		queryFn: () => fetchBoardById(id),
		enabled: !!id
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

	if (board?.background?.color)
		backgroundStyle.backgroundColor = board?.background?.color
	if (board?.background?.url) {
		backgroundStyle.backgroundImage = `url(${board?.background?.url})`
		backgroundStyle.backgroundSize = 'cover'
		backgroundStyle.backgroundPosition = 'center'
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
